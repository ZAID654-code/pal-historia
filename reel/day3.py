"""Day 3: SHOWER won. Template v2: motion on frame 1, no results card, early vote badge, ~40 s."""
TOTAL = None
LEAD, TAIL, UNIT = 0.08, 1.2, 0.45

S = [
    ("hook", "THE WATER | IS RUNNING | [r:BROWN]", 0.5, "."),
    ("hook", "KEVIN HAS BEEN | IN THE SHOWER | FOR [y:NINE SECONDS]", 0.9, "."),
    ("hook", "YOU VOTED | [b:SHOWER]", 0, ","),
    ("hook", "SO THIS | IS ON [y:YOU]", 1.2, "."),
    ("before", "TEN MINUTES AGO | THE SHOWER | [r:COUGHED]", 0.6, "."),
    ("before", "LAST USED | DURING THE | WORLD CUP", 0.6, "."),
    ("before", "THE SOAP | IS STILL IN | THE [g:WRAPPER]", 1.2, "."),
    ("wash", "HE STEPS IN", 0, ","),
    ("wash", "AND THE FLIES | [r:PACK THEIR BAGS]", 0.7, "."),
    ("wash", "THE DRAIN | TAKES ONE LOOK", 0, ","),
    ("wash", "AND [r:GIVES UP]", 0.9, "."),
    ("wash", "THE PLUMBER | CALLS | [y:ANOTHER PLUMBER]", 1.2, "."),
    ("reveal", "FORTY MINUTES LATER | KEVIN IS | A [y:DIFFERENT COLOUR]", 0.7, "."),
    ("reveal", "NO FLIES", 0, ","),
    ("reveal", "NO SMELL", 0, "."),
    ("reveal", "[g:NINE PERCENT]", 1.2, "."),
    ("bed", "THEN HE | WALKS TO | HIS BED", 0.6, "."),
    ("bed", "THE [y:SHEETS] | ARE [r:WAITING]", 1.2, "."),
    ("vote", "[y:SHEETS] | OR [b:DEODORANT]", 0.5, "?"),
    ("vote", "ONE WORD | DECIDES | [y:DAY FOUR]", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(0.05, "splat", 0.45), (c(1, 2), "pop", 0.5), (L[2]["start"], "ding", 0.5),
            (c(4, 2), "crack", 0.6), (L[6]["start"], "ding", 0.4), (L[8]["start"], "boing", 0.45),
            (L[10]["start"], "sad", 0.35), (L[11]["start"], "pop", 0.5), (c(11, 2), "pop", 0.5),
            (L[12]["start"], "chime", 0.6), (L[13]["start"], "pop", 0.4), (L[14]["start"], "pop", 0.4),
            (L[15]["start"], "ding", 0.5), (L[17]["start"], "sad", 0.35), (L[18]["start"], "pop", 0.5),
            (c(18, 1), "pop", 0.5), (L[19]["start"], "chime", 0.5)]
