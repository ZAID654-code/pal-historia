"""Day 4: predicted winner SHEETS (over DEODORANT). Edit VOTE in day4.js to the real split."""
TOTAL = None

S = [
    ("hook", "THE SHEETS | ARE [r:FIGHTING BACK]", 0.8, "."),
    ("hook", "KEVIN IS | [r:LOSING]", 1.6, "."),
    ("card", "[y:YOU] DID THIS", 0.7, "."),
    ("card", "YOU FINALLY | VOTED [y:SHEETS]", 0, "."),
    ("card", "THIRD TIME | LUCKY", 0.9, "."),
    ("card", "[b:DEODORANT] LOST", 0, "."),
    ("card", "KEVIN WILL | REGRET THAT", 1.8, "."),
    ("early", "TWENTY MINUTES | EARLIER", 0.9, "."),
    ("room", "KEVIN PULLS | THE SHEET", 0.8, "."),
    ("room", "THE SHEET | [r:DOESN'T MOVE]", 0.8, "."),
    ("room", "IT HAS | BONDED WITH | THE MATTRESS", 1, "."),
    ("room", "UNDERNEATH | HE FINDS A | [o:PIZZA SLICE]", 0, ","),
    ("room", "A REMOTE", 0, ","),
    ("room", "AND A | [g:SECOND SHEET]", 1.8, "."),
    ("laundro", "AT THE | LAUNDROMAT", 0, ","),
    ("laundro", "THE MACHINE | READS THE LABEL", 0.8, "."),
    ("laundro", "AND [r:LOCKS] | ITS OWN DOOR", 1.6, "."),
    ("laundro", "AN OLD LADY | TAKES ONE LOOK", 0, ","),
    ("laundro", "AND HANDS HIM | [y:HER DETERGENT]", 0.8, "."),
    ("laundro", "ALL OF IT", 1.8, "."),
    ("later", "THREE WASHES | LATER", 1, "."),
    ("reveal", "THE SHEETS | ARE [y:WHITE]", 0.8, "."),
    ("reveal", "THEY WERE | NEVER | SUPPOSED TO BE | YELLOW", 1, "."),
    ("reveal", "[g:THIRTEEN PERCENT]", 1.8, "."),
    ("phone", "THEN [p:EMILY] | TEXTS", 0.9, "."),
    ("phone", "THE WEDDING | HAS A | [p:DANCE FLOOR]", 0.8, "."),
    ("phone", "AND SHE IS | SAVING HIM | A [r:SLOW ONE]", 1.8, "."),
    ("pant", "KEVIN GETS | OUT OF BREATH | [r:READING THAT]", 1.8, "."),
    ("vote", "DAY FIVE", 0.8, "."),
    ("vote", "DOES HE HIT | THE [y:GYM]", 0, ","),
    ("vote", "OR GET A | [b:HAIRCUT]", 1, "?"),
    ("vote", "[y:COMMENT] | ONE WORD", 0.8, "."),
    ("vote", "DAY FIVE STARTS | WITH YOUR [y:CHOICE]", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(L[0]["start"], "boing", 0.5), (L[1]["start"], "sad", 0.35), (L[3]["start"], "pop", 0.5),
            (L[5]["start"], "sad", 0.3), (L[9]["start"], "boing", 0.5), (c(11, 2), "pop", 0.5),
            (L[12]["start"], "pop", 0.5), (c(13, 1), "boing", 0.5), (c(16, 0), "crack", 0.6),
            (c(18, 1), "ding", 0.45), (L[19]["start"], "pop", 0.5), (L[19]["start"] + 0.15, "pop", 0.5),
            (L[21]["start"], "chime", 0.6), (L[23]["start"], "ding", 0.5), (L[24]["start"] + 0.4, "ding", 0.5),
            (L[26]["start"], "ding", 0.5), (L[27]["start"], "sad", 0.35), (L[29]["start"], "pop", 0.5),
            (L[30]["start"], "pop", 0.5), (L[31]["start"], "chime", 0.5)]
