import time
import torch
import pandas as pd
from transformers import AutoModelForCausalLM, AutoTokenizer, TextStreamer
from peft import PeftModel
from llama_cpp import Llama

BASE_MODEL = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
LORA_PATH = "../adapters"
GGUF_PATH = "../quantized/model.gguf"

PROMPTS = [
    "Explain why the sky is blue.",
    "What is machine learning?",
    "Write a short poem about artificial intelligence.",
    "Explain the importance of data in AI."
]


def get_vram():
    if torch.cuda.is_available():
        return torch.cuda.memory_allocated() / 1024**2
    return 0


def load_base_model():
    tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

    model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        torch_dtype=torch.float16,
        device_map="auto"
    )

    return model, tokenizer


def load_lora_model():
    base_model, tokenizer = load_base_model()

    model = PeftModel.from_pretrained(
        base_model,
        LORA_PATH
    )

    return model, tokenizer


def load_gguf():
    return Llama(
        model_path=GGUF_PATH,
        n_ctx=2048,
        n_threads=4
    )


def generate(model, tokenizer, prompt):

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    start = time.time()

    output = model.generate(
        **inputs,
        max_new_tokens=100
    )

    latency = time.time() - start

    text = tokenizer.decode(output[0], skip_special_tokens=True)

    tokens = len(tokenizer.encode(text))

    tokens_per_sec = tokens / latency

    return latency, tokens_per_sec


def generate_gguf(llm, prompt):

    start = time.time()

    output = llm(prompt, max_tokens=100)

    latency = time.time() - start

    text = output["choices"][0]["text"]

    tokens = len(text.split())

    tokens_per_sec = tokens / latency

    return latency, tokens_per_sec


def benchmark_base():

    model, tokenizer = load_base_model()

    latencies = []
    speeds = []

    for prompt in PROMPTS:

        latency, tps = generate(model, tokenizer, prompt)

        latencies.append(latency)
        speeds.append(tps)

    return sum(latencies)/len(latencies), sum(speeds)/len(speeds), get_vram()


def benchmark_lora():

    model, tokenizer = load_lora_model()

    latencies = []
    speeds = []

    for prompt in PROMPTS:

        latency, tps = generate(model, tokenizer, prompt)

        latencies.append(latency)
        speeds.append(tps)

    return sum(latencies)/len(latencies), sum(speeds)/len(speeds), get_vram()


def benchmark_gguf():

    llm = load_gguf()

    latencies = []
    speeds = []

    for prompt in PROMPTS:

        latency, tps = generate_gguf(llm, prompt)

        latencies.append(latency)
        speeds.append(tps)

    return sum(latencies)/len(latencies), sum(speeds)/len(speeds), 0


def main():

    results = []

    print("Testing Base Model")
    latency, tps, vram = benchmark_base()

    results.append({
        "model": "base_model",
        "latency": latency,
        "tokens_per_sec": tps,
        "vram_mb": vram
    })


    print("Testing LoRA Model")
    latency, tps, vram = benchmark_lora()

    results.append({
        "model": "lora_model",
        "latency": latency,
        "tokens_per_sec": tps,
        "vram_mb": vram
    })


    print("Testing GGUF Model")
    latency, tps, vram = benchmark_gguf()

    results.append({
        "model": "gguf_model",
        "latency": latency,
        "tokens_per_sec": tps,
        "vram_mb": vram
    })


    df = pd.DataFrame(results)

    df.to_csv("../benchmarks/results.csv", index=False)

    print("\nBenchmark completed")
    print(df)


if __name__ == "__main__":
    main()