from multiprocessing import Process
from os import path
import subprocess

def npmRun(script: str):
    subprocess.run(["npm", "--prefix", path.dirname(__file__), "run", script])

def startDevServer():
    Process(target=lambda:npmRun("dev")).start()

def buildClient():
    npmRun("build")