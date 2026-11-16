"""Day 3: SHOWER won. Template v2: motion on frame 1, no results card, early vote badge, ~60 s."""
TOTAL = None
LEAD, TAIL, UNIT = 0.08, 1.4, 0.58

S = [
    ("hook", "THE WATER | IS RUNNING | [r:BROWN]", 0.5, "."),
    ("hook", "KEVIN HAS BEEN | IN THE SHOWER | FOR [y:NINE SECONDS]", 0.9, "."),
    ("hook", "YOU VOTED | [b:SHOWER]", 0, ","),
    ("hook", "SO THIS | IS ON [y:YOU]", 1.2, "."),
    ("before", "TEN MINUTES AGO | THE SHOWER | [r:COUGHED]", 0.6, "."),
    ("before", "LAST USED | DURING THE | WORLD CUP", 0.6, "."),
    ("before", "THE SOAP | IS STILL IN | THE [g:WRAPPER]", 0.6, "."),
    ("before", "THE SHAMPOO | EXPIRED | BEFORE THE SOAP", 1.2, "."),
    ("wash", "HE STEPS IN", 0, ","),
    ("wash", "AND THE FLIES | [r:PACK THEIR BAGS]", 0.7, "."),
    ("wash", "THE DRAIN | TAKES ONE LOOK", 0, ","),
    ("wash", "AND [r:GIVES UP]", 0.9, "."),
    ("wash", "THE PLUMBER | CALLS | [y:ANOTHER PLUMBER]", 0.7, "."),
    ("wash", "THE SECOND PLUMBER | CALLS | [r:HIS MUM]", 1.2, "."),
    ("wash", "BEHIND HIS EAR | KEVIN FINDS | A [o:PIZZA CRUST]", 0.6, "."),
    ("wash", "IT IS | [r:STILL WARM]", 0.7, "."),
    ("wash", "HE ALSO FINDS | A [o:GUITAR PICK]", 0.6, "."),
    ("wash", "KEVIN DOES NOT | PLAY GUITAR", 1.2, "."),
    ("reveal", "FORTY MINUTES LATER | KEVIN IS | A [y:DIFFERENT COLOUR]", 0.7, "."),
    ("reveal", "NO FLIES", 0, ","),
    ("reveal", "NO SMELL", 0, "."),
    ("reveal", "[g:NINE PERCENT]", 1.0, "."),
    ("mirror", "EVEN THE MIRROR | [b:DOESN'T CRACK]", 0.6, "."),
    ("mirror", "IT [g:WINKS]", 1.2, "."),
    ("phone", "THEN [p:EMILY] | TEXTS", 0.7, "."),
    ("phone", "SHE WANTS | A [p:PHOTO]", 0.6, "."),
    ("phone", "HIS LAST PHOTO | IS FROM | TWENTY NINETEEN", 0.7, "."),
    ("phone", "SO HE SENDS | HIS [y:ELBOW]", 0.9, "."),
    ("phone", "SHE REPLIES | [p:NICE ELBOW]", 1.2, "."),
    ("bed", "SO CLEAN KEVIN | WALKS TO | HIS BED", 0.6, "."),
    ("bed", "AND THE [y:SHEETS] | ARE [r:WAITING]", 1.2, "."),
    ("vote", "[y:SHEETS] | OR [b:DEODORANT]", 0.5, "?"),
    ("vote", "ONE WORD | DECIDES | [y:DAY FOUR]", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(0.05, "splat", 0.45), (c(1, 2), "pop", 0.5), (L[2]["start"], "ding", 0.5),
            (c(4, 2), "crack", 0.6), (L[6]["start"], "ding", 0.4), (c(7, 1), "sad", 0.3),
            (L[9]["start"], "boing", 0.45), (L[11]["start"], "sad", 0.35), (L[12]["start"], "pop", 0.5),
            (c(12, 2), "pop", 0.5), (c(13, 2), "boing", 0.45), (c(14, 2), "pop", 0.5), (L[15]["start"], "ding", 0.4),
            (c(16, 1), "pop", 0.5), (L[17]["start"], "sad", 0.3),
            (L[18]["start"], "chime", 0.6), (L[19]["start"], "pop", 0.4), (L[20]["start"], "pop", 0.4),
            (L[21]["start"], "ding", 0.5), (c(22, 1), "pop", 0.5), (L[23]["start"], "chime", 0.5),
            (L[24]["start"] + 0.3, "ding", 0.5), (L[25]["start"], "ding", 0.5), (c(27, 1), "send", 0.6),
            (c(28, 1), "ding", 0.5), (L[30]["start"], "sad", 0.35), (L[31]["start"], "pop", 0.5),
            (c(31, 1), "pop", 0.5), (L[32]["start"], "chime", 0.5)]
