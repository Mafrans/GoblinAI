from multiprocessing import Process
import server
import client
import ngrok

def start(mode: str, ngrokToken: str):
    if (mode == "development"):
        client.startDevServer()
    else:
        # Let the API server handle serving the client
        client.buildClient()

    server.start()

    if (ngrokToken != ""):
        server.tunnel(ngrokToken)