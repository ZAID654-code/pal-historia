"""Day 2: TEETH won the vote (5 to 3). Modern arc: hook at 70, peak, release, peak..."""
TOTAL = None  # auto: speech + pauses

S = [
    # hook, dropped mid-story
    ("dentist1", "THE DENTIST | HAS PUT ON | A [r:SECOND MASK]", 0.8, "."),
    ("dentist1", "KEVIN HASN'T | EVEN OPENED | HIS MOUTH YET", 1.6, "."),
    # peak 1
    ("card", "[y:YOU] DID THIS", 0.7, "."),
    ("card", "YOU VOTED | [y:TEETH]", 0, "."),
    ("card", "FIVE TO THREE", 0.9, "."),
    ("card", "THE [b:SHEETS] LOST", 0, "."),
    ("card", "THE SHEETS | WILL REMEMBER", 1.8, "."),
    # release
    ("bath", "ONE HOUR | EARLIER", 0.9, "."),
    ("bath", "KEVIN FINDS | HIS [b:TOOTHBRUSH]", 0.8, "."),
    ("bath", "IT HAS BEEN | IN THIS CUP | SINCE | TWENTY NINETEEN", 0.8, "."),
    ("bath", "SOMETHING IS | [g:GROWING] ON IT", 0, "."),
    ("bath", "IT HAS | A NAME NOW", 1, "."),
    ("bath", "SO HE GOES TO | A [y:PROFESSIONAL]", 1.8, "."),
    # peak 2
    ("dentist2", "KEVIN OPENS | HIS MOUTH", 0.8, "."),
    ("dentist2", "THE DENTIST | LOOKS INSIDE", 0.8, "."),
    ("dentist2", "AND THE LIGHT | [r:GOES OUT]", 0, "."),
    ("dentist2", "BY ITSELF", 1.6, "."),
    ("xray", "THE X-RAY | FINDS A | [o:POPCORN KERNEL]", 0.8, "."),
    ("xray", "FROM A MOVIE | THAT CAME OUT IN | TWENTY TWENTY TWO", 1.8, "."),
    # release
    ("dentist3", "FORTY MINUTES", 0, "."),
    ("dentist3", "TWO DRILLS", 0, "."),
    ("dentist3", "ONE [r:PRIEST]", 1.2, "."),
    ("reveal", "AND THEN", 1.0, "..."),
    ("reveal", "[y:WHITE]", 0.6, "."),
    ("reveal", "ACTUAL [y:WHITE]", 1, "."),
    ("reveal", "KEVIN SMILES | AND A PIGEON | OUTSIDE | FALLS OFF | THE WIRE", 1, "."),
    ("reveal", "[g:FOUR PERCENT]", 0.7, "."),
    ("reveal", "AND EVERY FIX | STAYS [g:FOR GOOD]", 1.8, "."),
    # peak 3, re-hook
    ("phone", "THEN [p:EMILY] | TEXTS", 0.9, "."),
    ("phone", "HER MUM | IS THE | [p:RECEPTIONIST]", 0.8, "."),
    ("phone", "HER MUM | HEARD | [r:EVERYTHING]", 1.8, "."),
    ("bed", "KEVIN GOES HOME | WITH A | [y:PERFECT SMILE]", 0.8, "."),
    ("bed", "AND LIES DOWN | ON THE [b:SHEETS]", 0.8, "."),
    ("bed", "THE SHEETS | YOU DIDN'T PICK", 1.8, "."),
    # vote
    ("vote", "SO", 0, "."),
    ("vote", "DAY THREE", 0.8, "."),
    ("vote", "DOES HE WASH | THE [y:SHEETS]", 0, ","),
    ("vote", "OR FINALLY | TAKE A [b:SHOWER]", 1, "?"),
    ("vote", "ONE OF YOU | ALREADY ASKED | FOR THE SHOWER", 0.8, "."),
    ("vote", "[y:COMMENT] | ONE WORD", 0.8, "."),
    ("vote", "DAY THREE STARTS | WITH YOUR [y:CHOICE]", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    ev = [(c(0, 2), "boing", 0.5), (L[3]["start"], "pop", 0.5), (L[4]["start"], "ding", 0.45),
          (L[5]["start"], "sad", 0.35), (L[11]["start"], "boing", 0.5), (c(15, 1), "crack", 0.8),
          (c(17, 2), "ding", 0.45), (L[20]["start"], "crack", 0.5), (L[20]["start"] + 0.25, "crack", 0.5),
          (L[21]["start"], "chime", 0.35), (L[23]["start"], "chime", 0.6), (c(25, 3), "boing", 0.5),
          (L[26]["start"], "ding", 0.5), (L[28]["start"] + 0.4, "ding", 0.5), (L[30]["start"], "ding", 0.5),
          (L[32]["start"] + 0.3, "splat", 0.5), (L[33]["start"], "sad", 0.35),
          (L[36]["start"], "pop", 0.5), (L[37]["start"], "pop", 0.5), (L[39]["start"], "chime", 0.5)]
    return ev
