#!/usr/bin/env node

const fs = require('fs');

// --------------------
// 1. Read CLI arguments
// --------------------
const args = process.argv.slice(2);

const file = args[args.indexOf('--file') + 1];
const topN = Number(args[args.indexOf('--top') + 1] || 10);
const minLen = Number(args[args.indexOf('--minLen') + 1] || 3);

// --------------------
// 2. Read file content
// --------------------
const text = fs.readFileSync(file, 'utf8');

// --------------------
// 3. Clean and split words
// --------------------
const words = (text
  .toLowerCase()
  .match(/\b[a-z]+\b/g) || [])
  .filter(w => w.length >= minLen);

// --------------------
// 4. Process one chunk
// --------------------
function processChunk(chunk) {
  const freq = {};
  for (const word of chunk) {
    freq[word] = (freq[word] || 0) + 1;
  }
  return freq;
}

// --------------------
// 5. Merge chunk results
// --------------------
function mergeFreq(a, b) {
  for (const key in b) {
    a[key] = (a[key] || 0) + b[key];
  }
  return a;
}

// --------------------
// 6. Run with concurrency
// --------------------
async function run(concurrency) {
  const chunkSize = Math.ceil(words.length / concurrency);
  const chunks = [];

  for (let i = 0; i < concurrency; i++) {
    chunks.push(
      words.slice(i * chunkSize, (i + 1) * chunkSize)
    );
  }

  const start = Date.now();

  const results = await Promise.all(
    chunks.map(chunk => Promise.resolve(processChunk(chunk)))
  );

  const freq = results.reduce(mergeFreq, {});

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);

  const uniqueList = Object.keys(freq);

  let longestWord = "";
  let shortestWord = "";

  if (uniqueList.length > 0) {
    longestWord = uniqueList.reduce((a, b) =>
      b.length > a.length ? b : a
    );

    shortestWord = uniqueList.reduce((a, b) =>
      b.length < a.length ? b : a
    );
  }


  const stats = {
    totalWords: words.length,
    uniqueWords: Object.keys(freq).length,
    uniqueWordsList: Object.keys(freq),
    longestWord,
    shortestWord,
    topWords: sorted.slice(0, topN)
  };

  const durationMs = Date.now() - start;

  return { stats, durationMs };
}

// --------------------
// 7. Benchmark concurrency levels
// --------------------
(async () => {
  const fsExtra = require('fs');
  fsExtra.mkdirSync('logs', { recursive: true });
  fsExtra.mkdirSync('output', { recursive: true });

  const perf = {};

  for (const level of [1, 4, 8]) {
    const result = await run(level);
    perf[level] = result.durationMs;

    if (level === 8) {
      fsExtra.writeFileSync(
        'output/stats.json',
        JSON.stringify(result.stats, null, 2)
      );
    }
  }

  fsExtra.writeFileSync(
    'logs/perf-summary.json',
    JSON.stringify(perf, null, 2)
  );

  console.log('Performance results:', perf);
})();
