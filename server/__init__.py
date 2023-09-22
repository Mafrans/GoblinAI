from multiprocessing import Process
from faker import Faker
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from server.api.routes.stories import stories
import ngrok
import uvicorn

port = 8000
app = FastAPI()
faker = Faker()

corsMethods = ["GET", "POST", "DELETE"]
corsHeaders = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"http://localhost:5173"],
    allow_methods=corsMethods,
    allow_headers=corsHeaders,
)

app.include_router(stories)


def start(mode: str):
    clientPath = Path(__file__).parents[1].joinpath("client/dist")

    if clientPath.exists():
        app.mount("/", StaticFiles(directory=clientPath.absolute(), html=True))

    Process(
        target=lambda: uvicorn.run(
            "server:app",
            port=port,
            log_level="error",
            reload=(mode == "development"),
        )
    ).start()

    print(f"GoblinAI running on http://localhost:8000")


def tunnel(token: str):
    tunnel = ngrok.connect(port, authtoken=token)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[tunnel.url()],
        cors_methods=corsMethods,
        cors_headers=corsHeaders,
    )

    print(f"GoblinAI running on {tunnel.url()}")
