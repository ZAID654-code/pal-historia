"""Day 5, branch A: GYM won (over DEODORANT). Template v4, ~60 s."""
TOTAL = None
LEAD, TAIL, UNIT = 0.05, 0.9, 0.72

S = [
    ("hook", "KEVIN HAS BEEN | UNDER THIS BAR | FOR [y:ELEVEN MINUTES]", 0.25, "."),
    ("hook", "THERE IS | [r:NO WEIGHT] | ON IT", 0.35, "."),
    ("hook", "AND YOU | [b:VOTED FOR THIS]", 0.9, "."),
    ("hook", "THE STAFF | HAVE BEEN WATCHING | [y:THE WHOLE TIME]", 0.5, "."),
    ("hook", "NOBODY | [r:HELPS]", 0.9, "."),
    ("desk", "THE SIGN UP FORM | ASKS FOR | HIS JOB", 0.4, "."),
    ("desk", "UNDER OCCUPATION | HE WRITES | [g:GOBLIN]", 0.9, "."),
    ("tread", "ON SPEED [y:ONE]", 0, ","),
    ("tread", "THE TREADMILL | [r:THROWS HIM OFF]", 0.8, "."),
    ("smell", "THEN HE STARTS | [o:SWEATING]", 0.5, "."),
    ("smell", "THE SMELL | [r:CLEARS THE GYM]", 0.6, "."),
    ("smell", "EVEN THE MIRRORS | [g:FOG UP]", 1.0, "."),
    ("big", "THEN THE | [r:BIGGEST MAN] | IN THE BUILDING | WALKS OVER", 0.5, "."),
    ("big", "KEVIN PREPARES | TO [r:DIE]", 0.7, "."),
    ("big", "THE MAN | HANDS HIM | A [b:TOWEL]", 0.5, "."),
    ("big", "FIRST DAY | IS THE HARDEST | [y:KING]", 1.0, "."),
    ("spray", "KEVIN | WIPES HIS FACE", 0, ","),
    ("spray", "AND THE TOWEL | [r:FILES A COMPLAINT]", 0.9, "."),
    ("push", "NOW | [y:ONE PUSH UP]", 0.5, "."),
    ("push", "[g:DOWN] | AND [g:UP] | AND [g:DOWN]", 0, ","),
    ("push", "AND [g:UP]", 0.9, "."),
    ("reveal", "THE WHOLE GYM | [y:CLAPS]", 0.5, "."),
    ("reveal", "[g:SEVENTEEN PERCENT] | FIXED", 1.0, "."),
    ("phone", "THEN [p:EMILY] | TEXTS", 0.4, "."),
    ("phone", "HER COUSIN | WORKS HERE", 0.5, "."),
    ("phone", "THERE IS | A [r:VIDEO]", 0.4, "."),
    ("phone", "IT HAS | [r:MUSIC] NOW", 0.6, "."),
    ("phone", "KEVIN REPLIES | [r:DELETE IT]", 0.5, "."),
    ("phone", "SHE SAYS | [p:NO]", 1.0, "."),
    ("cliff", "IN THE GYM MIRROR | KEVIN SEES | HIS [r:HAIR]", 0.5, "."),
    ("cliff", "IT SEES HIM | [r:BACK]", 0.5, "."),
    ("cliff", "AND THE SMELL | [r:IS STILL HERE]", 0.8, "."),
    ("cliff", "[y:DEODORANT] | OR [b:HAIRCUT]", 0.5, "?"),
    ("cliff", "YOU DECIDE | DAY SIX", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    ev = [(0.0, "crack", 0.9), (0.02, "boing", 0.6), (c(1, 1), "boing", 0.5), (L[2]["start"], "ding", 0.45),
          (c(3, 2), "ding", 0.4), (c(4, 1), "boing", 0.5), (c(8, 1), "crack", 0.6), (c(8, 1) + 0.1, "boing", 0.55),
          (c(9, 1), "splat", 0.4), (c(10, 1), "sad", 0.35), (c(11, 1), "pop", 0.4), (c(12, 1), "crack", 0.5),
          (L[13]["start"], "sad", 0.3), (c(14, 2), "ding", 0.5), (c(14, 2) + 0.05, "crack", 0.5), (c(15, 2), "chime", 0.45),
          (L[16]["start"], "splat", 0.5), (c(17, 1), "sad", 0.4),
          (c(18, 1), "ding", 0.4), (c(19, 0), "coin0", 0.6), (c(19, 1), "coin1", 0.6), (c(19, 2), "coin2", 0.6),
          (L[20]["start"], "coin3", 0.65), (L[20]["start"] + 0.1, "crack", 0.7), (L[22]["start"], "chime", 0.7),
          (L[22]["start"] + 0.12, "coin4", 0.5), (L[23]["start"] + 0.3, "ding", 0.5), (L[25]["start"], "ding", 0.5),
          (c(29, 2), "boing", 0.45), (c(30, 1), "crack", 0.5), (c(31, 1), "splat", 0.4), (L[32]["start"], "pop", 0.5), (c(32, 1), "pop", 0.5),
          (L[33]["start"], "chime", 0.5)]
    ev += [(c(6, 2), "ding", 0.45), (L[27]["start"], "send", 0.6), (c(28, 1), "ding", 0.5)]
    for k in range(8):  # clapping
        ev.append((L[21]["start"] + k * 0.15, "pop", 0.32))
    return ev
