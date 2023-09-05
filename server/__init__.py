from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def get_root():
    return "Hello world!"

def startServer():
    uvicorn.run(app)