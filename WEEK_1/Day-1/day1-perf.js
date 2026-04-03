const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'data/large-file.bin');

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getMemoryUsage() {
  const mem = process.memoryUsage();
  return {
    rss: formatMB(mem.rss),
    heapUsed: formatMB(mem.heapUsed)
  };
}

// BUFFER METHOD
async function readWithBuffer() {
  const startMem = getMemoryUsage();
  const start = process.hrtime.bigint();

  await fs.promises.readFile(FILE_PATH);

  const end = process.hrtime.bigint();
  const endMem = getMemoryUsage();

  return {
    method: 'buffer',
    timeMs: Number(end - start) / 1e6,
    memoryBefore: startMem,
    memoryAfter: endMem
  };
}

// STREAM METHOD
async function readWithStream() {
  const startMem = getMemoryUsage();
  const start = process.hrtime.bigint();

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(FILE_PATH);

    stream.on('data', () => {});
    stream.on('end', () => {
      const end = process.hrtime.bigint();
      const endMem = getMemoryUsage();

      resolve({
        method: 'stream',
        timeMs: Number(end - start) / 1e6,
        memoryBefore: startMem,
        memoryAfter: endMem
      });
    });

    stream.on('error', reject);
  });
}

(async () => {
  const bufferResult = await readWithBuffer();
  const streamResult = await readWithStream();

  const results = {
    file: FILE_PATH,
    fileSizeMB: formatMB(fs.statSync(FILE_PATH).size),
    results: [bufferResult, streamResult]
  };

  console.log(results);

  fs.writeFileSync(
    path.join(__dirname, 'logs/day1-perf.json'),
    JSON.stringify(results, null, 2)
  );
})();
