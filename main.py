import eel
import time
import random

@eel.expose
def analyze(time):
    return random.randint(0,100)

eel.init("web")
eel.start("loop-test.html") #first page