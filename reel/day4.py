"""Day 4: SHEETS (assumed winner over DEODORANT). Template v3, ~60 s."""
TOTAL = None
LEAD, TAIL, UNIT = 0.05, 1.3, 0.72

S = [
    ("hook", "THESE SHEETS | HAVE NOT BEEN WASHED | SINCE [r:TWENTY NINETEEN]", 0.5, "."),
    ("hook", "YOU VOTED | TO [b:FIX THAT]", 0.8, "."),
    ("hook", "THE SHEETS | ARE [r:FIGHTING BACK]", 1.2, "."),
    ("room", "KEVIN PULLS", 0, "."),
    ("room", "THE SHEET | [r:DOESN'T MOVE]", 0.8, "."),
    ("room", "IT HAS | BONDED WITH | THE MATTRESS", 0.9, "."),
    ("room", "UNDERNEATH | HE FINDS | A [o:PIZZA SLICE]", 0, ","),
    ("room", "A REMOTE", 0, ","),
    ("room", "AND A | [g:SECOND SHEET]", 0.7, "."),
    ("room", "UNDER THAT | A [r:THIRD SHEET]", 0.5, "."),
    ("room", "THEY HAVE BEEN | [g:BREEDING]", 1.2, "."),
    ("street", "HE CARRIES THEM | OUTSIDE", 0.5, "."),
    ("street", "THE [y:PIGEON] | CROSSES THE ROAD", 1.0, "."),
    ("laundro", "AT THE LAUNDROMAT | THE MACHINE | READS THE LABEL", 0, ","),
    ("laundro", "AND [r:LOCKS] | ITS OWN DOOR", 0.8, "."),
    ("laundro", "THE NEXT ONE | [r:UNPLUGS] ITSELF", 1.0, "."),
    ("laundro", "AN OLD LADY | HANDS HIM | [y:HER DETERGENT]", 0.6, "."),
    ("laundro", "ALL OF IT", 1.2, "."),
    ("spin", "THE MACHINE | FINALLY | [g:GIVES IN]", 0.8, "."),
    ("spin", "AND THE YELLOW | STARTS | [y:COMING OUT]", 0.6, "."),
    ("spin", "[g:WASH] | AFTER [g:WASH] | AFTER [g:WASH]", 1.2, "."),
    ("reveal", "THREE WASHES LATER", 0.6, "."),
    ("reveal", "THE SHEETS | ARE [y:WHITE]", 0.6, "."),
    ("reveal", "THEY WERE | NEVER | SUPPOSED TO BE | YELLOW", 0.8, "."),
    ("reveal", "[g:THIRTEEN PERCENT] | FIXED", 1.0, "."),
    ("stairs", "HE CARRIES THEM | UP ONE FLIGHT | OF STAIRS", 0.6, "."),
    ("stairs", "AND NEEDS | A BREAK", 0.5, "."),
    ("stairs", "[r:TWICE]", 1.0, "."),
    ("bed", "THE BED | IS [g:CLEAN]", 0.6, "."),
    ("bed", "THE [r:HOODIE] | IS NOT", 1.0, "."),
    ("bed", "[y:DEODORANT] | OR [b:GYM]", 0.5, "?"),
    ("bed", "YOU [y:DECIDE] | DAY FIVE", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(0.0, "crack", 0.7), (c(0, 2), "boing", 0.4), (L[1]["start"], "ding", 0.5), (L[2]["start"], "boing", 0.55),
            (L[4]["start"], "boing", 0.45), (c(5, 1), "pop", 0.5), (c(6, 2), "pop", 0.5), (L[7]["start"], "pop", 0.5),
            (c(8, 1), "boing", 0.5), (c(9, 1), "boing", 0.55), (c(10, 1), "pop", 0.5), (c(10, 1) + 0.12, "pop", 0.5),
            (c(10, 1) + 0.24, "pop", 0.5), (c(12, 1), "sad", 0.3),
            (c(14, 0), "crack", 0.6), (c(15, 1), "boing", 0.5), (c(16, 2), "ding", 0.45),
            (L[17]["start"], "pop", 0.5), (L[17]["start"] + 0.12, "pop", 0.5), (L[17]["start"] + 0.24, "pop", 0.5),
            (c(18, 2), "ding", 0.4), (c(19, 2), "coin0", 0.6), (c(20, 0), "coin1", 0.6), (c(20, 1), "coin2", 0.6),
            (c(20, 2), "coin3", 0.65), (L[21]["start"], "send", 0.4), (L[22]["start"], "chime", 0.6),
            (L[24]["start"], "chime", 0.7), (L[24]["start"] + 0.12, "coin4", 0.5), (L[26]["start"], "sad", 0.3),
            (L[27]["start"], "boing", 0.5), (L[28]["start"], "chime", 0.45), (L[29]["start"], "sad", 0.35),
            (L[30]["start"], "pop", 0.5), (c(30, 1), "pop", 0.5), (L[31]["start"], "chime", 0.5)]
