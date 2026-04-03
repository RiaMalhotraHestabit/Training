import os
import json
import random
import numpy as np
from tqdm import tqdm
from datasets import load_dataset
from transformers import AutoTokenizer

OUTPUT_DIR = "data"
TRAIN_PATH = os.path.join(OUTPUT_DIR, "train.jsonl")
VAL_PATH = os.path.join(OUTPUT_DIR, "val.jsonl")
MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
TRAIN_SPLIT = 0.8
RANDOM_SEED = 42
random.seed(RANDOM_SEED)

print("Loading Financial PhraseBank...")
dataset = load_dataset("financial_phrasebank","sentences_allagree",split="train")

print("Creating instruction samples...")
instruction_data = []
for item in tqdm(dataset):
    text = item["sentence"]
    label = item["label"]
    sentiment_map = {0: "negative", 1: "neutral", 2: "positive"}
    sentiment = sentiment_map[label]
    instruction_data.append({
        "instruction": "Classify the sentiment of the following financial statement.",
        "input": text,
        "output": sentiment
    })
    instruction_data.append({
        "instruction": "Classify the sentiment and explain your reasoning.",
        "input": text,
        "output": f"The sentiment is {sentiment} because the tone of the statement indicates this."
    })
    instruction_data.append({
        "instruction": "Extract the key financial insight from the statement.",
        "input": text,
        "output": f"The key insight is that the overall outlook is {sentiment}."
    })

print(f"Total samples created: {len(instruction_data)}")
print("\n", "="*20)
print("Analyzing token lengths...")

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
lengths = []
for sample in instruction_data:
    combined_text = (sample["instruction"] + "\n" + sample["input"] + "\n" + sample["output"])
    tokens = tokenizer(combined_text, truncation=False)
    lengths.append(len(tokens["input_ids"]))

lengths = np.array(lengths)
print("Token Statistics:")
print("Min length:", lengths.min())
print("Max length:", lengths.max())
print("Mean length:", lengths.mean())
print("95th percentile:", np.percentile(lengths, 95))
print("\n", "="*20)
threshold = np.percentile(lengths, 95)
cleaned_data = [
    sample for sample, length in zip(instruction_data, lengths)
    if length <= threshold
]

print("Original samples:", len(instruction_data))
print("Cleaned samples:", len(cleaned_data))
print("Removed samples:", len(instruction_data) - len(cleaned_data))

random.shuffle(cleaned_data)
split_index = int(len(cleaned_data) * TRAIN_SPLIT)
train_data = cleaned_data[:split_index]
val_data = cleaned_data[split_index:]

os.makedirs(OUTPUT_DIR, exist_ok=True)
def save_jsonl(path, data):
    with open(path, "w") as f:
        for item in data:
            f.write(json.dumps(item) + "\n")

save_jsonl(TRAIN_PATH, train_data)
save_jsonl(VAL_PATH, val_data)
print("Dataset creation complete!")
print(f"Train samples: {len(train_data)}")
print(f"Validation samples: {len(val_data)}")