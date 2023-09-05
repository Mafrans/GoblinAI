from os import path
import subprocess

def startClient():
    subprocess.run(["npm", "--prefix", path.dirname(__file__), "start"])