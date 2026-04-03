#!/usr/bin/env node

const os = require('os');
const { execSync } = require('child_process');

function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}h ${mins}m ${secs}s`;
}

let nodePath = 'Unknown';
try {
  nodePath = execSync('which node').toString().trim();
} catch (e) {}

console.log(`OS: ${os.type()} ${os.release()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`CPU Cores: ${os.cpus().length}`);
console.log(`Total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`);
console.log(`System Uptime: ${formatUptime(os.uptime())}`);
console.log(`Current Logged User: ${os.userInfo().username}`);
console.log(`Node Path: ${nodePath}`);


