import server
import client

def start(mode: str, ngrokToken: str):
    if (mode == "development"):
        client.startDevServer()
    else:
        # Let the API server handle serving the client
        client.buildClient()

    server.start()

    if (ngrokToken != None):
        server.tunnel(ngrokToken)