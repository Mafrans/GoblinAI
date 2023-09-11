from multiprocessing import Process
import server
import client

def start(mode: str):
    if (mode == "development"):
        client.startDevServer()
    else:
        # Let the API server handle serving the client
        client.buildClient()

    server.start()