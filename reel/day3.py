"""Day 3: SHOWER. Premise in second 1, then a steady run of gags with reward beats
(grime meter, +1% ticks, steam reveal, achievement). ~50 s. Long 60 s cut: day3long."""
TOTAL = None
LEAD, TAIL, UNIT = 0.05, 1.2, 0.6

S = [
    ("hook", "THIS MAN | HAS NOT SHOWERED | SINCE [r:TWENTY NINETEEN]", 0.5, "."),
    ("hook", "YOU VOTED | TO [b:FIX THAT]", 0.8, "."),
    ("hook", "NINE SECONDS IN | THE WATER | IS [r:BROWN]", 1.2, "."),
    ("wash", "THE FLIES | [r:PACK THEIR BAGS]", 0.8, "."),
    ("wash", "THE DRAIN | TAKES ONE LOOK", 0, ","),
    ("wash", "AND [r:GIVES UP]", 0.9, "."),
    ("wash", "THE PLUMBER | CALLS | [y:ANOTHER PLUMBER]", 0.7, "."),
    ("wash", "THE SECOND PLUMBER | CALLS | [r:HIS MUM]", 1.2, "."),
    ("wash", "BEHIND HIS EAR | KEVIN FINDS | A [o:PIZZA CRUST]", 0.6, "."),
    ("wash", "IT IS | [r:STILL WARM]", 1.2, "."),
    ("scrub", "THEN THE SOAP | FINALLY | [g:COMES OUT] | OF THE WRAPPER", 0.8, "."),
    ("scrub", "AND THE GRIME | STARTS | [y:COMING OFF]", 0.6, "."),
    ("scrub", "[g:LAYER] | BY [g:LAYER] | BY [g:LAYER]", 1.2, "."),
    ("reveal", "FORTY MINUTES LATER", 0.6, "."),
    ("reveal", "KEVIN IS | A [y:DIFFERENT COLOUR]", 0.8, "."),
    ("reveal", "[g:NINE PERCENT] | FIXED", 1.0, "."),
    ("phone", "EMILY WANTS | A [p:PHOTO]", 0.6, "."),
    ("phone", "HE SENDS | HIS [y:ELBOW]", 0.7, "."),
    ("phone", "SHE REPLIES | [p:NICE ELBOW]", 1.2, "."),
    ("bed", "BUT HIS [y:SHEETS] | ARE STILL | [r:WAITING]", 1.0, "."),
    ("vote", "[y:SHEETS] | OR [b:DEODORANT]", 0.5, "?"),
    ("vote", "YOU [y:DECIDE] | DAY FOUR", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(0.0, "crack", 0.7), (c(0, 2), "boing", 0.4), (L[1]["start"], "ding", 0.5), (c(2, 2), "splat", 0.5),
            (L[3]["start"], "boing", 0.45), (L[5]["start"], "sad", 0.35), (L[6]["start"], "pop", 0.5),
            (c(6, 2), "pop", 0.5), (c(7, 2), "boing", 0.45), (c(8, 2), "pop", 0.5), (L[9]["start"], "ding", 0.4),
            (c(10, 2), "coin0", 0.6), (c(11, 2), "coin1", 0.6), (c(12, 0), "coin2", 0.6), (c(12, 1), "coin3", 0.6),
            (c(12, 2), "coin4", 0.65), (L[13]["start"], "send", 0.4), (L[14]["start"], "chime", 0.6),
            (L[15]["start"], "chime", 0.7), (L[15]["start"] + 0.12, "coin5", 0.5), (L[16]["start"], "ding", 0.5),
            (c(17, 1), "send", 0.6), (c(18, 1), "ding", 0.5), (c(19, 2), "sad", 0.35),
            (L[20]["start"], "pop", 0.5), (c(20, 1), "pop", 0.5), (L[21]["start"], "chime", 0.5)]
