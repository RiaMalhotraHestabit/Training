const fs = require("fs");
const { LoremIpsum } = require("lorem-ipsum");

const lorem = new LoremIpsum();
const targetWords = 200000;

let text = "";
let count = 0;

while (count < targetWords) {
  const chunk = lorem.generateWords(5000);
  text += chunk + " ";
  count += 5000;
}

fs.mkdirSync("data", { recursive: true });
fs.writeFileSync("data/corpus.txt", text);

console.log("✅ 200,000 word corpus generated!");
