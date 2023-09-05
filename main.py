from transformers import pipeline;

generator: pipeline = None;

def setModel(model: str):
    generator = pipeline(model=model)