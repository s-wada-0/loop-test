import eel
import time
import random

list = [[600, 150], [550, 200], [500, 250], [450, 300], [650, 200], [700, 250], [750, 300], [575, 275], [550, 350], [525, 425], [625, 275], [650, 350], [675, 425] ]

@eel.expose
def analyze(time):
    score = random.randint(0,100)
    for i in range(13):
        for j in range(2):
            list[i][j] += random.randint(-3, 3)


    val = {"score": score, "landmark": list}
    return val

eel.init("web")
eel.start("loop-test.html") #first page