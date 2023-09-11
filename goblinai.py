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

    # Tunnel after starting the server to ensure the 
    # start message is correct
    if (ngrokToken != ""):
        server.tunnel(ngrokToken)