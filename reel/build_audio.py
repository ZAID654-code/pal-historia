#!/usr/bin/env python3
"""Builds narration, music + sfx and timeline.json for the reel.

Line format: caption chunks split by "|", highlighted words as [c:WORD]
(c = y yellow, g green, p pink, b blue, r red, o orange).
"""
import json, os, re, subprocess, sys, wave
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "build")
os.makedirs(OUT, exist_ok=True)
SR = 44100
TOTAL = 97.87  # same length as the reference reel

# (scene, caption text, pause units after, joiner)
# pause 0 = keeps flowing into the next line inside the same spoken sentence.
S = [
    ("room", "[y:THIRTY DAYS]", 0, "."),
    ("room", "THAT'S HOW LONG | KEVIN HAS UNTIL | HIS BEST FRIEND'S | [y:WEDDING]", 1.3, "."),
    ("room", "LOOK AT HIM", 0, "."),
    ("room", "KEVIN IS IN | FULL [g:GOBLIN] MODE", 0.9, "."),
    ("room", "CONTROLLER | IN HAND", 0, "."),
    ("room", "[o:PIZZA GREASE] | UP TO THE WRIST", 0.9, "."),
    ("room", "EVEN HIS PLANTS | [g:DIED] | FROM THE SMELL", 2, "."),
    ("phone1", "THEN [p:EMILY] | TEXTS HIM", 0.9, "."),
    ("phone1", "NOT AN [p:EMILY]", 0, "."),
    ("phone1", "THE [p:EMILY]", 0, "."),
    ("phone1", "[p:BRIDESMAID EMILY]", 1, "."),
    ("phone1", "AND THIS MAN | READS IT WITH A | [o:GREASY THUMBPRINT] | ON THE SCREEN", 2, "."),
    ("room2", "[y:THIRTY DAYS] TO | FIX [y:EVERYTHING]", 0.8, "."),
    ("room2", "WHERE DO WE | EVEN START", 2, "?"),
    ("mirror", "FIRST STOP", 0, "."),
    ("mirror", "THE BATHROOM | [b:MIRROR]", 1, "."),
    ("mirror", "THE [b:TEETH]", 0.7, "."),
    ("mirror", "THE [b:SKIN]", 0.7, "."),
    ("mirror", "THE [b:BEARD] | GROWING IN | THREE DIRECTIONS", 1, "."),
    ("mirror", "EVEN THE MIRROR | [b:CRACKS]", 0, ","),
    ("mirror", "OUT OF | [r:SELF DEFENCE]", 2, "."),
    ("closet", "NEXT", 0, ","),
    ("closet", "THE CLOSET", 0.9, "."),
    ("closet", "ONE [g:SUIT]", 0, ","),
    ("closet", "FROM | TWENTY FOURTEEN", 1, "."),
    ("closet", "THE BUTTON | TAKES ONE LOOK | AT HIS BELLY", 0, ","),
    ("closet", "AND [r:RESIGNS]", 2, "."),
    ("street", "SO HE GOES | OUTSIDE", 0.9, "."),
    ("street", "THE SUN | SEES HIM", 0, ","),
    ("street", "AND HIDES | BEHIND A CLOUD", 1, "."),
    ("street", "A PIGEON | LANDS ON HIM", 0, ","),
    ("street", "THINKS HE'S | A STATUE", 0, ","),
    ("street", "AND LEAVES | A REVIEW", 0.8, "."),
    ("street", "[r:ONE STAR]", 2, "."),
    ("barber", "AT THE | BARBER SHOP", 0, ","),
    ("barber", "KEVIN ASKS FOR | A [b:FRESH FADE]", 1, "."),
    ("barber", "THE BARBER | LOOKS AT | THE HAIR", 0.7, "."),
    ("barber", "LOOKS AT | THE SCISSORS", 0.7, "."),
    ("barber", "AND CALLS FOR | [y:BACKUP]", 2, "."),
    ("window", "ON THE WAY HOME | HE SEES HIMSELF IN | A [b:SHOP WINDOW]", 1, "."),
    ("window", "AND FOR THE | FIRST TIME | HE DOESN'T | LOOK AWAY", 0.9, "."),
    ("window", "THE [b:REFLECTION] DOES", 2, "."),
    ("phone2", "BACK HOME", 0, ","),
    ("phone2", "KEVIN TYPES | A REPLY TO | [p:EMILY]", 0.7, "."),
    ("phone2", "A WHOLE | PARAGRAPH", 0.7, "."),
    ("phone2", "DELETES IT", 0.6, "."),
    ("phone2", "TYPES AGAIN", 0.6, "."),
    ("phone2", "AND SENDS", 1.3, "..."),
    ("phone2", "A [b:THUMBS UP]", 1.6, "."),
    ("phone2", "[y:THIRTY DAYS]", 0, ","),
    ("phone2", "AND THAT'S HIS | [r:OPENING MOVE]", 2, "."),
    ("vote", "SO HERE'S WHERE | YOU COME IN", 0.9, "."),
    ("vote", "DOES HE HIT | THE [y:GYM]", 0, ","),
    ("vote", "OR BOOK A | [b:HAIRCUT]", 1, "?"),
    ("vote", "ONE OF THEM | CHANGES HIS LIFE", 1, "."),
    ("vote", "[y:COMMENT] | ONE WORD", 0, "."),
    ("vote", "[y:VOTE] NOW", 0.9, "."),
    ("vote", "DAY TWO STARTS | WITH YOUR [y:CHOICE]", 0, "."),
]


def plain(t):
    return re.sub(r"\[\w:([^\]]+)\]", r"\1", t).replace("|", " ")


VOICE, SPEED = os.environ.get("VOICE", "am_michael"), float(os.environ.get("SPEED", "1.1"))
_k = _w = None
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())


def tts(i, say):
    """Kokoro neural voice; returns (samples, [(word, start, end)]) with Whisper word timings."""
    global _k, _w
    import difflib
    import soundfile as sf
    from kokoro_onnx import Kokoro
    from faster_whisper import WhisperModel
    if _k is None:
        d = os.path.join(OUT, "kokoro")
        _k = Kokoro(os.path.join(d, "kokoro-v1.0.onnx"), os.path.join(d, "voices-v1.0.bin"))
        _w = WhisperModel(os.path.join(OUT, "whisper"), device="cpu", compute_type="int8")
    raw = os.path.join(OUT, f"u{i:02d}_raw.wav")
    cut = os.path.join(OUT, f"u{i:02d}.wav")
    a, sr = _k.create(say, voice=VOICE, speed=SPEED, lang="en-us")
    sf.write(raw, a, sr)
    subprocess.run(["sox", raw, "-r", str(SR), "-c", "1", "-b", "16", cut,
                    "silence", "1", "0.01", "0.4%", "reverse",
                    "silence", "1", "0.01", "0.4%", "reverse"], check=True)
    subprocess.run(["sox", cut, "-r", "16000", cut + ".16k.wav"], check=True)
    with wave.open(cut) as w:
        a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    with wave.open(cut + ".16k.wav") as w:
        a16 = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    segs, _ = _w.transcribe(a16, word_timestamps=True, initial_prompt=say)
    heard = [(norm(x.word), x.start, x.end) for sg in segs for x in sg.words if norm(x.word)]
    words = [norm(x) for x in say.split() if norm(x)]
    d = len(a) / SR
    times = [None] * len(words)
    sm = difflib.SequenceMatcher(None, words, [h[0] for h in heard], autojunk=False)
    for bl in sm.get_matching_blocks():
        for k in range(bl.size):
            times[bl.a + k] = heard[bl.b + k][1:]
    miss = sum(x is None for x in times)
    for k in range(len(words)):  # interpolate anything Whisper heard differently
        if times[k] is None:
            lo = next((times[j][1] for j in range(k - 1, -1, -1) if times[j]), 0.0)
            hi = next((times[j][0] for j in range(k + 1, len(words)) if times[j]), d)
            n = 1 + next((j - k for j in range(k + 1, len(words)) if times[j]), len(words) - k)
            times[k] = (lo + (hi - lo) / n * 0, lo + (hi - lo) / n)
    if miss:
        print(f"  utterance {i}: {miss} word(s) interpolated: {say}")
    times[0] = (0.0, times[0][1])
    return a, [(min(s, d), min(e, d)) for s, e in times]


def env(n, a=0.005, r=0.1):
    e = np.ones(n)
    na, nr = int(a * SR), min(int(r * SR), n)
    e[:na] = np.linspace(0, 1, na)
    e[-nr:] *= np.linspace(1, 0, nr)
    return e


def tone(f, d, kind="sine"):
    t = np.arange(int(d * SR)) / SR
    ph = 2 * np.pi * f * t
    if kind == "tri":
        return 2 / np.pi * np.arcsin(np.sin(ph))
    if kind == "sq":
        return np.tanh(3 * np.sin(ph))
    return np.sin(ph)


def pluck(f, d=0.5):
    t = np.arange(int(d * SR)) / SR
    return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(4 * np.pi * f * t)) * np.exp(-t * 7)


def sfx(name):
    rng = np.random.default_rng(3)
    if name == "pop":
        t = np.arange(int(0.09 * SR)) / SR
        return np.sin(2 * np.pi * (300 + 900 * np.exp(-t * 40)) * t) * np.exp(-t * 35)
    if name == "ding":
        return 0.7 * (pluck(1318, 0.5) + pluck(1760, 0.5))
    if name == "send":
        t = np.arange(int(0.18 * SR)) / SR
        return np.sin(2 * np.pi * (500 + 2500 * t) * t) * env(len(t), 0.01, 0.1) * 0.6
    if name == "crack":
        n = int(0.35 * SR)
        x = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 14)
        return np.diff(x, prepend=0) * 0.9
    if name == "boing":
        t = np.arange(int(0.45 * SR)) / SR
        return np.sin(2 * np.pi * (180 + 260 * np.abs(np.sin(t * 28))) * t) * np.exp(-t * 6)
    if name == "splat":
        n = int(0.16 * SR)
        x = rng.standard_normal(n)
        x = np.convolve(x, np.ones(60) / 60, "same") * 6
        return x * np.exp(-np.arange(n) / SR * 25)
    if name == "sad":
        return np.concatenate([tone(f, 0.16, "tri") * env(int(0.16 * SR)) for f in (392, 370, 349, 330)]) * 0.6
    if name == "tick":
        t = np.arange(int(0.03 * SR)) / SR
        return np.sin(2 * np.pi * 1900 * t) * np.exp(-t * 120) * 0.5
    if name == "chime":
        out = np.zeros(int(1.2 * SR))
        for k, f in enumerate((784, 988, 1175, 1568)):
            p = pluck(f, 0.9)
            o = int(k * 0.09 * SR)
            out[o:o + len(p)] += p
        return out * 0.6
    raise KeyError(name)


def music(n):
    """Light bouncy loop: bass + plucks + soft hat, 104 bpm."""
    beat = 60 / 104
    out = np.zeros(n)
    prog = [(130.81, [523.25, 659.25, 783.99]), (110.0, [440.0, 523.25, 659.25]),
            (87.31, [349.23, 440.0, 523.25]), (98.0, [392.0, 493.88, 587.33])]
    rng = np.random.default_rng(1)
    hat = rng.standard_normal(int(0.04 * SR)) * np.exp(-np.arange(int(0.04 * SR)) / SR * 90)
    hat = np.diff(hat, prepend=0)
    b = 0
    while b * beat * SR < n:
        root, ch = prog[(b // 4) % 4]
        o = int(b * beat * SR)

        def add(sig, off, g):
            s = o + int(off * SR)
            e = min(n, s + len(sig))
            if s < n:
                out[s:e] += sig[:e - s] * g

        if b % 2 == 0:
            add(tone(root / 2, beat * 0.9, "tri") * env(int(beat * 0.9 * SR), 0.01, 0.15), 0, 0.55)
        else:
            add(tone(root / 2 * 1.5, beat * 0.5, "tri") * env(int(beat * 0.5 * SR), 0.01, 0.1), 0, 0.35)
        add(pluck(ch[b % 3], 0.4), beat / 2, 0.30)
        if b % 4 == 3:
            add(pluck(ch[2] * 2, 0.3), beat * 0.75, 0.18)
        add(hat, 0, 0.10)
        add(hat, beat / 2, 0.16)
        b += 1
    return out


def main():
    # group lines into spoken utterances (full sentences)
    utts, cur = [], []
    for i, l in enumerate(S):
        cur.append(i)
        if l[2] > 0 or i == len(S) - 1:
            utts.append(cur)
            cur = []
    sent = lambda t: t[0].upper() + t[1:]
    fix = lambda t: t.lower().replace("kevin", "Kevin").replace("emily", "Emily")
    built = []
    for u, ids in enumerate(utts):
        say, cap = "", True
        for i in ids:
            t = fix(plain(S[i][1])).strip()
            t = re.sub(r"\s+", " ", t)
            say += (sent(t) if cap else t) + S[i][3] + " "
            cap = S[i][3] in (".", "?", "...")
        built.append(tts(u, say.strip()))
    speech = sum(len(c) for c, _ in built) / SR
    units = sum(s[2] for s in S)
    lead, tail = 0.3, 1.4
    unit = (TOTAL - lead - tail - speech) / units
    print(f"speech {speech:.1f}s, pause unit {unit:.3f}s")
    if unit < 0.15:
        sys.exit("script too long for target duration")

    n = int(TOTAL * SR)
    voice = np.zeros(n)
    lines, t = [], lead
    for ids, (c, wt) in zip(utts, built):
        o = int(t * SR)
        voice[o:o + len(c)] += c[:n - o]
        k = 0
        for i in ids:
            cs = []
            for x in [x.strip() for x in S[i][1].split("|")]:
                nw = len([w for w in plain(x).split() if norm(w)])
                cs.append({"text": x, "start": round(t + wt[k][0], 3)})
                k += nw
            lines.append({"i": i, "scene": S[i][0], "start": cs[0]["start"],
                          "end": round(t + wt[k - 1][1], 3), "chunks": cs})
        t += len(c) / SR + S[ids[-1]][2] * unit

    scenes = []
    for l in lines:
        if not scenes or scenes[-1]["name"] != l["scene"]:
            if scenes:
                scenes[-1]["end"] = round(l["start"] - 0.25, 3)
            scenes.append({"name": l["scene"], "start": 0 if not scenes else round(l["start"] - 0.25, 3)})
    scenes[-1]["end"] = TOTAL

    L = {i: l for i, l in enumerate(lines)}
    ev = [(sc["start"], "pop", 0.5) for sc in scenes[1:]]
    ev += [(L[7]["start"] + 0.5, "ding", 0.5), (L[11]["chunks"][2]["start"], "splat", 0.6),
           (L[19]["chunks"][1]["start"], "crack", 0.8), (L[26]["start"] + 0.15, "boing", 0.6),
           (L[29]["start"], "sad", 0.35), (L[33]["start"], "splat", 0.6),
           (L[38]["chunks"][1]["start"], "ding", 0.4), (L[41]["start"] + 0.5, "boing", 0.4),
           (L[48]["start"] - 0.25, "send", 0.6), (L[48]["end"] + 0.55, "ding", 0.5),
           (L[52]["start"], "pop", 0.5), (L[53]["start"], "pop", 0.5), (L[56]["start"], "chime", 0.5)]
    for k in range(14):  # typing ticks
        ev.append((L[44]["start"] + k * 0.07, "tick", 0.35))
    for k in range(6):
        ev.append((L[46]["start"] + k * 0.09, "tick", 0.35))
    fx = np.zeros(n)
    for when, name, g in ev:
        s = sfx(name)
        o = int(when * SR)
        if 0 <= o < n:
            fx[o:o + len(s)] += s[:n - o] * g

    def wav(path, x):
        with wave.open(path, "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
            w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())

    def rd(path):
        with wave.open(path) as w:
            return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768

    vr, vp = os.path.join(OUT, "voice_raw.wav"), os.path.join(OUT, "voice.wav")
    wav(vr, voice / (np.abs(voice).max() + 1e-9) * 0.8)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", vr, "-af",
                    "highpass=f=75,equalizer=f=250:t=q:w=1:g=-2,equalizer=f=3400:t=q:w=1.2:g=3.5,"
                    "acompressor=threshold=-22dB:ratio=3.5:attack=4:release=90:makeup=5,alimiter=limit=0.9",
                    "-ar", str(SR), vp], check=True)
    v = rd(vp)[:n]
    v = np.pad(v, (0, n - len(v)))
    # duck the music whenever the voice is speaking
    win = int(0.05 * SR)
    lvl = np.convolve(np.abs(v), np.ones(win) / win, "same")
    duck = 1 - 0.6 * np.clip(lvl / 0.05, 0, 1)
    duck = np.convolve(duck, np.ones(int(0.15 * SR)) / int(0.15 * SR), "same")
    m = music(n) * 0.075 * duck
    m[-int(1.5 * SR):] *= np.linspace(1, 0, int(1.5 * SR))
    pre = os.path.join(OUT, "premix.wav")
    wav(pre, v * 0.85 + m + fx * 0.4)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", pre, "-af", "loudnorm=I=-14:TP=-1:LRA=9",
                    "-ar", str(SR), os.path.join(OUT, "audio.wav")], check=True)
    json.dump({"total": TOTAL, "lines": lines, "scenes": scenes},
              open(os.path.join(OUT, "timeline.json"), "w"), indent=1)
    for sc in scenes:
        print(f'{sc["name"]:8s} {sc["start"]:6.2f} - {sc["end"]:6.2f}')


if __name__ == "__main__":
    main()
