from multiprocessing import Process
from server import startServer
from client import startClient

def start():
    server = Process(target=startClient)
    client = Process(target=startServer)
    server.start()
    client.start()