from multiprocessing import Process
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import ngrok
import uvicorn

port = 8000
app = FastAPI()

@app.get("/api")
def get_root():
    return "Hello world!"

def start():
    clientPath = Path(__file__).parents[1].joinpath("client/dist")

    if (clientPath.exists()):
        app.mount("/", StaticFiles(directory=clientPath.absolute(), html=True))

    Process(target=lambda:uvicorn.run(app, port=port, log_level="error")).start()

    print(f"GoblinAI running on https://localhost:8000")

def tunnel(token: str):
    tunnel = ngrok.connect(port, authtoken=token)
    
    print(f"GoblinAI running on {tunnel.url()}")