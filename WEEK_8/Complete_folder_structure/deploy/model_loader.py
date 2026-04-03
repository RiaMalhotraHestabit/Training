from llama_cpp import Llama
from .config import MODEL_PATH

llm = None

def load_model():
    global llm

    if llm is None:
        llm = Llama(
            model_path=MODEL_PATH,
            n_ctx=2048,
            n_threads=8
        )

    return llm