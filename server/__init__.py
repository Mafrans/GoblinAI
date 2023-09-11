from multiprocessing import Process
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import uvicorn

app = FastAPI()

@app.get("/api")
def get_root():
    return "Hello world!"

def start():
    clientPath = Path(__file__).parents[1].joinpath("client/dist")
    print(clientPath)
    if (clientPath.exists()):
        app.mount("/", StaticFiles(directory=clientPath.absolute(), html=True))

    Process(target=lambda:uvicorn.run(app)).start()
    