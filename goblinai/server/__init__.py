from multiprocessing import Process
from faker import Faker
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from goblinai.server.SPAStaticFiles import SPAStaticFiles
from goblinai.server.api.routes.settings import settings
from goblinai.server.api.routes.stories import stories
from goblinai.server.api.routes.content import content
import ngrok
import uvicorn

port = 8000
app = FastAPI()
faker = Faker()

corsMethods = ["GET", "POST", "DELETE", "PATCH"]
corsHeaders = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        f"http://localhost:{port}",
        f"http://127.0.0.1:{port}",
    ],
    allow_methods=corsMethods,
    allow_headers=corsHeaders,
)

app.include_router(stories)
app.include_router(content)
app.include_router(settings)


def start(mode: str):
    clientPath = Path(__file__).parents[1].joinpath("client/dist")

    if clientPath.exists():
        app.mount(
            "/",
            SPAStaticFiles(directory=clientPath.absolute(), html=True),
            name="client",
        )

    Process(
        target=lambda: uvicorn.run(
            "goblinai.server:app",
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
