// Copies ONLY the static English Hub web files into www/ for Capacitor, Electron, and Web ZIP packaging.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'www');

const WEB_ENTRIES = [
  'index.html',
  'manifest.json',
  'sw.js',
  'icon.svg',
  'css',
  'fonts',
  'icons',
  'js',
];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

let count = 0;
function copyEntry(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      if (item === '.DS_Store') continue;
      copyEntry(path.join(src, item), path.join(dst, item));
    }
  } else {
    fs.copyFileSync(src, dst);
    count += 1;
  }
}

for (const entry of WEB_ENTRIES) {
  const src = path.join(root, entry);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required web asset: ${entry}`);
  }
  copyEntry(src, path.join(out, entry));
}

if (!fs.existsSync(path.join(out, 'index.html'))) {
  throw new Error('Staging failed: www/index.html missing');
}
console.log(`Staged ${count} web files into www/`);
