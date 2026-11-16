"""Day 3: predicted winner SHOWER (over SHEETS). Narration avoids vote numbers; edit VOTE in day3.js."""
TOTAL = None

S = [
    ("hook", "THE WATER | IS RUNNING | [r:BROWN]", 0.8, "."),
    ("hook", "KEVIN HAS BEEN | IN THE SHOWER | FOR [y:NINE SECONDS]", 1.6, "."),
    ("card", "[y:YOU] DID THIS", 0.7, "."),
    ("card", "YOU VOTED | [b:SHOWER]", 0, "."),
    ("card", "IT WASN'T | EVEN CLOSE", 0.9, "."),
    ("card", "THE [y:SHEETS] | LOST AGAIN", 0, "."),
    ("card", "THEY ARE | KEEPING COUNT", 1.8, "."),
    ("early", "TEN MINUTES | EARLIER", 0.9, "."),
    ("before", "KEVIN TURNS | THE TAP", 0.8, "."),
    ("before", "THE SHOWER | [r:COUGHS]", 0.8, "."),
    ("before", "IT HAS NOT | BEEN USED | SINCE THE | LAST WORLD CUP", 1, "."),
    ("before", "THE SOAP | IS STILL IN | THE [g:WRAPPER]", 1.8, "."),
    ("wash", "HE STEPS IN", 0.8, "."),
    ("wash", "THE FLIES | [r:PACK THEIR BAGS]", 1, "."),
    ("wash", "THE DRAIN | TAKES ONE LOOK", 0, ","),
    ("wash", "AND [r:GIVES UP]", 1.6, "."),
    ("wash", "A PLUMBER | IS CALLED", 0, "."),
    ("wash", "THE PLUMBER | CALLS | [y:ANOTHER PLUMBER]", 1.8, "."),
    ("later", "FORTY MINUTES | LATER", 1, "."),
    ("reveal", "KEVIN | STEPS OUT", 0.6, "."),
    ("reveal", "HE IS | A [y:DIFFERENT COLOUR]", 1, "."),
    ("reveal", "NO FLIES", 0, "."),
    ("reveal", "NO SMELL", 0, "."),
    ("reveal", "[g:NINE PERCENT]", 1.8, "."),
    ("phone", "THEN [p:EMILY] | TEXTS", 0.9, "."),
    ("phone", "SHE WANTS | A [p:PHOTO]", 0.8, "."),
    ("phone", "KEVIN HAS | NOT TAKEN | A PHOTO | SINCE TWENTY NINETEEN", 1.8, "."),
    ("bed", "CLEAN KEVIN | WALKS TO | HIS BED", 0.8, "."),
    ("bed", "THE [y:SHEETS] | ARE [r:WAITING]", 1.8, "."),
    ("vote", "DAY FOUR", 0.8, "."),
    ("vote", "DOES HE FINALLY | WASH THE [y:SHEETS]", 0, ","),
    ("vote", "OR BUY | [b:DEODORANT]", 1, "?"),
    ("vote", "[y:COMMENT] | ONE WORD", 0.8, "."),
    ("vote", "DAY FOUR STARTS | WITH YOUR [y:CHOICE]", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(c(0, 2), "splat", 0.5), (L[3]["start"], "pop", 0.5), (L[5]["start"], "sad", 0.35),
            (L[9]["start"], "crack", 0.6), (L[11]["start"], "ding", 0.4), (L[13]["start"], "boing", 0.45),
            (L[15]["start"], "sad", 0.35), (L[16]["start"], "pop", 0.5), (c(17, 2), "pop", 0.5),
            (L[19]["start"], "chime", 0.6), (L[21]["start"], "pop", 0.4), (L[22]["start"], "pop", 0.4),
            (L[23]["start"], "ding", 0.5), (L[24]["start"] + 0.4, "ding", 0.5), (L[25]["start"], "ding", 0.5),
            (L[28]["start"], "sad", 0.35), (L[30]["start"], "pop", 0.5), (L[31]["start"], "pop", 0.5),
            (L[32]["start"], "chime", 0.5)]
