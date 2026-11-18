"""Day 5, branch B: DEODORANT won (over GYM). Template v4, ~60 s."""
TOTAL = None
LEAD, TAIL, UNIT = 0.05, 0.9, 0.85

S = [
    ("shop", "THE SHOP ASSISTANT | IS HOLDING THE CAN | WITH [r:TONGS]", 0.25, "."),
    ("shop", "SHE WILL NOT | [r:COME CLOSER]", 0.35, "."),
    ("shop", "AND YOU | [b:VOTED FOR THIS]", 0.9, "."),
    ("shop", "KEVIN ASKS | FOR THE | [y:STRONGEST ONE]", 0.5, "."),
    ("shop", "SHE COMES BACK | WITH ONE | [r:FOR HORSES]", 0.9, "."),
    ("shop", "THE FIRST CAN | TAKES ONE SNIFF", 0, ","),
    ("shop", "AND [r:DEFLATES]", 0.8, "."),
    ("shop", "THE SHOP DOG | [r:LEAVES THE SHOP]", 0.6, "."),
    ("shop", "THE TESTER STRIP | TURNS [o:BROWN]", 0.9, "."),
    ("spray", "HE SPRAYS | THE HORSE ONE | ON HIS [y:HOODIE]", 0.5, "."),
    ("spray", "THE HOODIE | [r:COUGHS IT BACK]", 0.9, "."),
    ("lady", "THEN THE LADY | FROM THE [p:LAUNDROMAT] | WALKS IN", 0.5, "."),
    ("lady", "SHE SAYS | [y:ARMPITS DEAR]", 0.9, "."),
    ("reward", "[g:LEFT ARM]", 0, ","),
    ("reward", "[g:RIGHT ARM]", 0, ","),
    ("reward", "LEFT ARM | [g:AGAIN]", 0, ","),
    ("reward", "AND [g:DONE]", 0.9, "."),
    ("reveal", "FOR THE FIRST TIME | SINCE [r:TWENTY NINETEEN]", 0, ","),
    ("reveal", "KEVIN SMELLS | LIKE A [y:PERSON]", 0.6, "."),
    ("reveal", "[g:SEVENTEEN PERCENT] | FIXED", 1.0, "."),
    ("dog", "THE DOG | [g:COMES BACK]", 0.4, "."),
    ("dog", "AND [p:HUGS HIM]", 1.0, "."),
    ("phone", "THEN [p:EMILY] | TEXTS", 0.4, "."),
    ("phone", "HER AUNT SAYS | HE SMELLS | [p:DIFFERENT]", 0.5, "."),
    ("phone", "SHE WAS | ON HIS BUS", 0.6, "."),
    ("phone", "KEVIN REPLIES | [y:WHICH AUNT]", 0.4, "."),
    ("phone", "SHE SAYS | [p:ALL OF THEM]", 1.0, "."),
    ("cliff", "ON THE WAY HOME | HE PASSES | THE [r:GYM]", 0.5, "."),
    ("cliff", "IN THE WINDOW | HIS HAIR | [r:LOOKS BACK]", 0.8, "."),
    ("cliff", "[y:GYM] | OR [b:HAIRCUT]", 0.5, "?"),
    ("cliff", "YOU DECIDE | DAY SIX", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(0.0, "crack", 0.9), (0.02, "boing", 0.6), (c(1, 1), "sad", 0.35), (c(2, 1), "ding", 0.45),
            (c(4, 2), "boing", 0.55), (L[6]["start"], "sad", 0.4), (L[6]["start"] + 0.1, "crack", 0.5), (c(7, 1), "boing", 0.5),
            (c(8, 1), "splat", 0.5), (c(9, 2), "splat", 0.45), (c(10, 1), "crack", 0.6), (c(11, 1), "ding", 0.4),
            (c(12, 1), "chime", 0.45), (c(12, 1) + 0.05, "crack", 0.5),
            (L[13]["start"], "coin0", 0.6), (L[14]["start"], "coin1", 0.6), (L[15]["start"], "coin2", 0.6),
            (L[16]["start"], "coin3", 0.65), (L[16]["start"] + 0.1, "crack", 0.7), (c(18, 1), "chime", 0.6),
            (L[19]["start"], "chime", 0.7), (L[19]["start"] + 0.12, "coin4", 0.5), (c(20, 1), "boing", 0.5),
            (L[21]["start"], "ding", 0.45), (L[22]["start"] + 0.3, "ding", 0.5), (c(23, 2), "ding", 0.5),
            (c(25, 1), "send", 0.6), (c(26, 1), "ding", 0.5), (c(27, 2), "pop", 0.45), (c(28, 2), "crack", 0.5),
            (L[29]["start"], "pop", 0.5), (c(29, 1), "pop", 0.5), (L[30]["start"], "chime", 0.5)]
