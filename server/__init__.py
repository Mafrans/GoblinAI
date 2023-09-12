from multiprocessing import Process
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import ngrok
import uvicorn

port = 8000
app = FastAPI()

corsMethods = ["get"]
corsHeaders = ["*"]

app.add_middleware(CORSMiddleware,
    allow_origins=[f"http://localhost:5173"],
    allow_methods=corsMethods,
    allow_headers=corsHeaders,
)

@app.get("/api")
def get_root():
    return {
        "text": "Hello world!"
    }

def start():
    clientPath = Path(__file__).parents[1].joinpath("client/dist")

    if (clientPath.exists()):
        app.mount("/", StaticFiles(directory=clientPath.absolute(), html=True))

    Process(target=lambda:uvicorn.run(app, port=port, log_level="error")).start()

    print(f"GoblinAI running on http://localhost:8000")

def tunnel(token: str):
    tunnel = ngrok.connect(port, authtoken=token)

    app.add_middleware(CORSMiddleware,
        allow_origins=[tunnel.url()],
        cors_methods=corsMethods,
        cors_headers=corsHeaders
    )
    
    print(f"GoblinAI running on {tunnel.url()}")