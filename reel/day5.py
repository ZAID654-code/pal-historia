"""Day 5: predicted winner GYM (over HAIRCUT). Edit VOTE in day5.js to the real split."""
TOTAL = None

S = [
    ("hook", "KEVIN HAS BEEN | UNDER THIS BAR | FOR [y:ELEVEN MINUTES]", 0.8, "."),
    ("hook", "THERE IS | [r:NO WEIGHT] | ON IT", 1.6, "."),
    ("card", "[y:YOU] DID THIS", 0.7, "."),
    ("card", "YOU VOTED | [y:GYM]", 0.9, "."),
    ("card", "THE [b:HAIRCUT] | CAN WAIT", 0, "."),
    ("card", "THE HAIR | DISAGREES", 1.8, "."),
    ("early", "THIRTY MINUTES | EARLIER", 0.9, "."),
    ("desk", "FREE TRIAL", 0.8, "."),
    ("desk", "UNDER OCCUPATION | KEVIN WRITES | [g:GOBLIN]", 1.6, "."),
    ("tread", "ONE TREADMILL", 0, "."),
    ("tread", "SPEED [y:ONE]", 0.8, "."),
    ("tread", "KEVIN LASTS | NINETY SECONDS", 0.8, "."),
    ("tread", "A PERSONAL | [y:BEST]", 1.8, "."),
    ("big", "THEN THE | [r:BIGGEST MAN] | IN THE BUILDING | WALKS OVER", 0.9, "."),
    ("big", "KEVIN PREPARES | TO [r:DIE]", 1.2, "."),
    ("big", "THE MAN | HANDS HIM | A [b:TOWEL]", 0.8, "."),
    ("big", "FIRST DAY | IS THE HARDEST | [y:KING]", 1.8, "."),
    ("push", "ONE PUSH UP", 0.7, "."),
    ("push", "AN ACTUAL ONE", 1, "."),
    ("push", "THE WHOLE GYM | [y:CLAPS]", 0.8, "."),
    ("push", "[g:EIGHTEEN PERCENT]", 1.8, "."),
    ("phone", "THEN [p:EMILY] | TEXTS", 0.9, "."),
    ("phone", "HER COUSIN | WORKS HERE", 0.8, "."),
    ("phone", "THERE IS | A [r:VIDEO]", 1.8, "."),
    ("vote", "DAY SIX", 0.8, "."),
    ("vote", "[y:HAIRCUT]", 0, ","),
    ("vote", "OR [b:BEARD]", 1, "?"),
    ("vote", "ONE OF THEM | HAS TO GO", 0.8, "."),
    ("vote", "[y:COMMENT] | ONE WORD", 0.8, "."),
    ("vote", "DAY SIX STARTS | WITH YOUR [y:CHOICE]", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    ev = [(c(1, 1), "sad", 0.35), (L[3]["start"], "pop", 0.5), (L[5]["start"], "boing", 0.4),
          (c(8, 2), "ding", 0.45), (L[10]["start"], "pop", 0.4), (L[11]["end"], "boing", 0.55),
          (L[12]["start"], "ding", 0.4), (c(13, 1), "crack", 0.5), (L[14]["start"], "sad", 0.35),
          (c(15, 2), "pop", 0.5), (c(16, 2), "chime", 0.5), (L[17]["start"], "boing", 0.4),
          (L[20]["start"], "ding", 0.5), (L[21]["start"] + 0.4, "ding", 0.5), (L[23]["start"], "ding", 0.5),
          (L[25]["start"], "pop", 0.5), (L[26]["start"], "pop", 0.5), (L[28]["start"], "chime", 0.5)]
    for k in range(8):  # clapping
        ev.append((L[19]["start"] + k * 0.16, "pop", 0.35))
    return ev
