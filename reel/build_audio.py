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

# (scene, text, pause after in "units", optional say-override)
S = [
    ("room", "[y:THIRTY DAYS]", 1.2),
    ("room", "KEVIN HAS UNTIL | HIS BEST FRIEND'S | [y:WEDDING]", 1.5),
    ("room", "LOOK AT HIM", 1),
    ("room", "[g:GOBLIN] MODE", 1),
    ("room", "CONTROLLER | IN HAND", 0.8),
    ("room", "[o:PIZZA GREASE] | TO THE WRIST", 1),
    ("room", "HIS PLANTS | [g:DIED] | FROM THE SMELL", 2),
    ("phone1", "THEN [p:EMILY] TEXTS | HIM", 1),
    ("phone1", "NOT AN [p:EMILY]", 0.8),
    ("phone1", "THE [p:EMILY]", 0.8),
    ("phone1", "[p:BRIDESMAID EMILY]", 1.2),
    ("phone1", "AND THIS MAN | LEAVES A | [o:GREASY THUMBPRINT] | ON THE SCREEN", 2),
    ("room2", "[y:THIRTY DAYS] TO | FIX [y:EVERYTHING]", 1),
    ("room2", "WHERE DO WE | START", 2),
    ("mirror", "FIRST STOP", 0.8),
    ("mirror", "THE [b:MIRROR]", 1.2),
    ("mirror", "THE [b:TEETH]", 0.9),
    ("mirror", "THE [b:SKIN]", 0.9),
    ("mirror", "THE [b:BEARD] | GROWING IN | THREE DIRECTIONS", 1.2),
    ("mirror", "THE MIRROR | [b:CRACKS]", 0.8),
    ("mirror", "OUT OF | [r:SELF DEFENCE]", 2),
    ("closet", "NEXT", 0.8),
    ("closet", "THE CLOSET", 1),
    ("closet", "ONE [g:SUIT]", 0.8),
    ("closet", "FROM | TWENTY FOURTEEN", 1.2, "from twenty fourteen"),
    ("closet", "THE BUTTON | TAKES ONE LOOK | AT HIS BELLY", 0.7),
    ("closet", "AND [r:RESIGNS]", 2),
    ("street", "SO HE GOES | OUTSIDE", 1),
    ("street", "THE SUN | SEES HIM", 0.6),
    ("street", "AND HIDES | BEHIND A CLOUD", 1.2),
    ("street", "A PIGEON | LANDS ON HIM", 0.8),
    ("street", "THINKS HE'S | A STATUE", 0.8),
    ("street", "AND LEAVES | A REVIEW", 0.8),
    ("street", "[r:ONE STAR]", 2),
    ("barber", "AT THE | BARBER SHOP", 0.6),
    ("barber", "KEVIN ASKS FOR | A [b:FRESH FADE]", 1.2),
    ("barber", "THE BARBER | LOOKS AT | THE HAIR", 0.8),
    ("barber", "LOOKS AT | THE SCISSORS", 0.8),
    ("barber", "AND CALLS FOR | [y:BACKUP]", 2),
    ("window", "ON THE WAY HOME | HE SEES HIMSELF IN | A [b:SHOP WINDOW]", 1.2),
    ("window", "FIRST TIME | HE DOESN'T LOOK | AWAY", 1),
    ("window", "THE [b:REFLECTION] DOES", 2),
    ("phone2", "BACK HOME", 0.8),
    ("phone2", "HE REPLIES TO | [p:EMILY]", 1),
    ("phone2", "TYPES A | PARAGRAPH", 0.8),
    ("phone2", "DELETES IT", 0.8),
    ("phone2", "TYPES AGAIN", 0.8),
    ("phone2", "AND SENDS", 1.4),
    ("phone2", "A [b:THUMBS UP]", 1.6),
    ("phone2", "[y:THIRTY DAYS]", 0.8),
    ("phone2", "STRONG | [r:OPENING MOVE]", 2),
    ("vote", "SO HERE'S WHERE | YOU COME IN", 1),
    ("vote", "DOES HE HIT | THE [y:GYM]", 0.8),
    ("vote", "OR BOOK A | [b:HAIRCUT]", 1.2),
    ("vote", "ONE OF THEM | CHANGES HIS LIFE", 1.2),
    ("vote", "[y:COMMENT] | ONE WORD", 0.8),
    ("vote", "[y:VOTE] NOW", 1),
    ("vote", "DAY TWO STARTS | WITH YOUR [y:CHOICE]", 0),
]


def plain(t):
    return re.sub(r"\[\w:([^\]]+)\]", r"\1", t).replace("|", " ")


VOICE, SPEED = "am_michael", 1.0
QUESTIONS = {13, 52, 53}
_k = None


def tts(i, text):
    """Kokoro neural voice (model files in build/kokoro, from huggingface.co/fastrtc/kokoro-onnx)."""
    global _k
    import soundfile as sf
    from kokoro_onnx import Kokoro
    if _k is None:
        d = os.path.join(OUT, "kokoro")
        _k = Kokoro(os.path.join(d, "kokoro-v1.0.onnx"), os.path.join(d, "voices-v1.0.bin"))
    raw = os.path.join(OUT, f"s{i:02d}_raw.wav")
    cut = os.path.join(OUT, f"s{i:02d}.wav")
    say = text.lower().capitalize().replace("kevin", "Kevin").replace("emily", "Emily")
    say += "?" if i in QUESTIONS else "."
    a, sr = _k.create(say, voice=VOICE, speed=SPEED, lang="en-us")
    sf.write(raw, a, sr)
    subprocess.run(["sox", raw, "-r", str(SR), "-c", "1", "-b", "16", cut,
                    "silence", "1", "0.01", "0.4%", "reverse",
                    "silence", "1", "0.01", "0.4%", "reverse"], check=True)
    with wave.open(cut) as w:
        a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    return a


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
    clips = [tts(i, s[3] if len(s) > 3 else plain(s[1])) for i, s in enumerate(S)]
    speech = sum(len(c) for c in clips) / SR
    units = sum(s[2] for s in S)
    lead, tail = 0.35, 1.6
    unit = (TOTAL - lead - tail - speech) / units
    print(f"speech {speech:.1f}s, pause unit {unit:.3f}s")
    if unit < 0.12:
        sys.exit("script too long for target duration")

    n = int(TOTAL * SR)
    voice = np.zeros(n)
    lines, t = [], lead
    for i, (s, c) in enumerate(zip(S, clips)):
        d = len(c) / SR
        o = int(t * SR)
        voice[o:o + len(c)] += c[:n - o]
        chunks = [x.strip() for x in s[1].split("|")]
        w = [len(plain(x)) + 2 for x in chunks]
        acc, cs = 0, []
        for x, wi in zip(chunks, w):
            cs.append({"text": x, "start": round(t + d * acc / sum(w), 3)})
            acc += wi
        lines.append({"i": i, "scene": s[0], "start": round(t, 3), "end": round(t + d, 3), "chunks": cs})
        t += d + s[2] * unit

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

    v = voice / (np.abs(voice).max() + 1e-9) * 0.9
    m = music(n) * 0.085
    m[-int(1.5 * SR):] *= np.linspace(1, 0, int(1.5 * SR))
    mix = np.clip(v + m + fx * 0.5, -1, 1)
    with wave.open(os.path.join(OUT, "audio.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((mix * 32767).astype(np.int16).tobytes())
    json.dump({"total": TOTAL, "lines": lines, "scenes": scenes},
              open(os.path.join(OUT, "timeline.json"), "w"), indent=1)
    for sc in scenes:
        print(f'{sc["name"]:8s} {sc["start"]:6.2f} - {sc["end"]:6.2f}')


if __name__ == "__main__":
    main()
