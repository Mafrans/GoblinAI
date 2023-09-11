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

    if (ngrokToken):
        ngrokTunnel(8080, ngrokToken)

    server.start()

def ngrokTunnel(port: int, token: str):
    ngrok.connect(port, authtoken=token)