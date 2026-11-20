"""Day 5 opening variant B (trial-reel test). MUSA ARRIVES. Nobody voted on Day 4, so Musa (a looksmaxxer) picks rule one: deodorant. ~58 s."""
TOTAL = None
LEAD, TAIL, UNIT = 0.05, 0.9, 0.9

S = [
    ("mog", "MUSA SMELLED KEVIN | FROM THE [r:CAR PARK]", 0.2, "."),
    ("mog", "HE HAS | TWENTY SIX DAYS | TO TEACH KEVIN | HOW TO [y:MOG]", 0.35, "."),
    ("mog", "HIS FIRST RATING", 0, ","),
    ("mog", "[r:ONE] | OUT OF TEN", 0.8, "."),
    ("mog", "NOBODY VOTED | YESTERDAY", 0, ","),
    ("mog", "SO MUSA | [y:PICKS]", 0.5, "."),
    ("mog", "RULE ONE | YOU CAN'T MOG | IF THEY [r:SMELL YOU FIRST]", 1.0, "."),
    ("shop", "THE SHOP ASSISTANT | HOLDS THE CAN | WITH [r:TONGS]", 0.5, "."),
    ("shop", "KEVIN ASKS | FOR THE | [y:STRONGEST ONE]", 0.5, "."),
    ("shop", "SHE COMES BACK | WITH ONE | [r:FOR HORSES]", 0.9, "."),
    ("shop", "THE FIRST CAN | TAKES ONE SNIFF", 0, ","),
    ("shop", "AND [r:DEFLATES]", 0.8, "."),
    ("shop", "THE SHOP DOG | [r:LEAVES]", 0.9, "."),
    ("spray", "HE SPRAYS | THE HORSE ONE | ON HIS [y:HOODIE]", 0.5, "."),
    ("spray", "THE HOODIE | [r:COUGHS IT BACK]", 0.9, "."),
    ("musa", "MUSA | DOES NOT BLINK", 0.4, "."),
    ("musa", "HE SAYS | [y:ARMPITS BRO]", 0.9, "."),
    ("reward", "[g:LEFT ARM]", 0, ","),
    ("reward", "[g:RIGHT ARM]", 0, ","),
    ("reward", "LEFT ARM | [g:AGAIN]", 0, ","),
    ("reward", "AND [g:DONE]", 0.9, "."),
    ("reveal", "FOR THE FIRST TIME | SINCE [r:TWENTY NINETEEN]", 0, ","),
    ("reveal", "KEVIN SMELLS | LIKE A [y:PERSON]", 0.8, "."),
    ("rate", "MUSA'S | NEW RATING", 0, ","),
    ("rate", "[g:TWO] | OUT OF TEN", 0.6, "."),
    ("rate", "HE SAYS | [y:WE MOVE]", 1.0, "."),
    ("cliff", "RULE TWO | IS THE [b:JAWLINE]", 0.5, "."),
    ("cliff", "KEVIN | CANNOT FIND HIS", 0.9, "."),
    ("cliff", "RATE HIM | ONE TO TEN | IN THE COMMENTS", 0.4, "."),
    ("cliff", "[y:HAIRCUT] | OR [b:BEARD] | DECIDES RULE TWO", 0, "."),
]


def events(L):
    c = lambda i, k: L[i]["chunks"][k]["start"]
    return [(0.0, "crack", 0.8), (0.02, "chime", 0.5), (c(1, 3), "ding", 0.45), (c(3, 0), "crack", 0.7),
            (c(3, 0) + 0.05, "sad", 0.4), (c(5, 1), "pop", 0.5), (c(6, 2), "boing", 0.5),
            (c(7, 2), "boing", 0.45), (c(9, 2), "boing", 0.55), (L[11]["start"], "sad", 0.4),
            (L[11]["start"] + 0.1, "crack", 0.5), (c(12, 1), "boing", 0.5), (c(13, 2), "splat", 0.45),
            (c(14, 1), "crack", 0.6), (c(15, 1), "ding", 0.4), (c(16, 1), "chime", 0.45), (c(16, 1) + 0.05, "crack", 0.5),
            (L[17]["start"], "coin0", 0.6), (L[18]["start"], "coin1", 0.6), (L[19]["start"], "coin2", 0.6),
            (L[20]["start"], "coin3", 0.65), (L[20]["start"] + 0.1, "crack", 0.7), (c(22, 1), "chime", 0.6),
            (c(24, 0), "chime", 0.7), (c(24, 0) + 0.12, "coin4", 0.5), (c(25, 1), "ding", 0.5),
            (c(26, 1), "pop", 0.45), (c(27, 1), "sad", 0.4), (L[28]["start"], "pop", 0.5),
            (L[29]["start"], "pop", 0.5), (c(29, 1), "pop", 0.5), (c(29, 2), "chime", 0.5)]
