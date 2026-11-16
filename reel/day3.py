"""Day 3: SHOWER. Cut built to pass the first test batch: cold-viewer premise in second 1,
no setup scenes, a gag every 3 s, vote badge from the middle, ~35 s. Long cut: day3long."""
TOTAL = None
LEAD, TAIL, UNIT = 0.05, 0.9, 0.5

S = [
    ("hook", "THIS MAN | HAS NOT SHOWERED | SINCE [r:TWENTY NINETEEN]", 0.4, "."),
    ("hook", "YOU VOTED | TO [b:FIX THAT]", 0.6, "."),
    ("hook", "NINE SECONDS IN | THE WATER | IS [r:BROWN]", 1.0, "."),
    ("wash", "THE FLIES | [r:PACK THEIR BAGS]", 0.6, "."),
    ("wash", "THE DRAIN | TAKES ONE LOOK", 0, ","),
    ("wash", "AND [r:GIVES UP]", 0.7, "."),
    ("wash", "THE PLUMBER | CALLS | [y:ANOTHER PLUMBER]", 0.6, "."),
    ("wash", "THE SECOND PLUMBER | CALLS | [r:HIS MUM]", 1.0, "."),
    ("wash", "BEHIND HIS EAR | KEVIN FINDS | A [o:PIZZA CRUST]", 0.5, "."),
    ("wash", "IT IS | [r:STILL WARM]", 1.0, "."),
    ("reveal", "FORTY MINUTES LATER | HE IS | A [y:DIFFERENT COLOUR]", 0.6, "."),
    ("reveal", "[g:NINE PERCENT] | FIXED", 0.9, "."),
    ("phone", "EMILY WANTS | A [p:PHOTO]", 0.5, "."),
    ("phone", "HE SENDS | HIS [y:ELBOW]", 0.6, "."),
    ("phone", "SHE REPLIES | [p:NICE ELBOW]", 1.0, "."),
    ("bed", "BUT HIS [y:SHEETS] | ARE STILL | [r:WAITING]", 0.9, "."),
    ("vote", "[y:SHEETS] | OR [b:DEODORANT]", 0.4, "?"),
    ("vote", "YOU [y:DECIDE] | DAY FOUR", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(0.0, "crack", 0.7), (c(0, 2), "boing", 0.4), (L[1]["start"], "ding", 0.5), (c(2, 2), "splat", 0.5),
            (L[3]["start"], "boing", 0.45), (L[5]["start"], "sad", 0.35), (L[6]["start"], "pop", 0.5),
            (c(6, 2), "pop", 0.5), (c(7, 2), "boing", 0.45), (c(8, 2), "pop", 0.5), (L[9]["start"], "ding", 0.4),
            (L[10]["start"], "chime", 0.6), (L[11]["start"], "ding", 0.5), (L[12]["start"], "ding", 0.5),
            (c(13, 1), "send", 0.6), (c(14, 1), "ding", 0.5), (c(15, 2), "sad", 0.35),
            (L[16]["start"], "pop", 0.5), (c(16, 1), "pop", 0.5), (L[17]["start"], "chime", 0.5)]
