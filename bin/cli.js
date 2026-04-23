#!/usr/bin/env node
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, '..');
const TEMPLATE = join(PKG_ROOT, 'templates', 'DESIGN.md');

const EXAMPLES = {
  'atmospheric-glass': 'https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/atmospheric-glass/DESIGN.md',
  'paws-and-paths':    'https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/paws-and-paths/DESIGN.md',
  'totality-festival': 'https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/totality-festival/DESIGN.md',
};

const HELP = `design-md-init — scaffold a DESIGN.md file

Usage:
  design-md-init [source] [--out <path>] [--force]

Sources:
  (none) | blank        use the bundled starter template
  atmospheric-glass     download the Atmospheric Glass example
  paws-and-paths        download the Paws & Paths example
  totality-festival     download the Totality Festival example

Options:
  --out <path>          output path (default: ./DESIGN.md)
  --force, -f           overwrite without prompting
  --help, -h            show this help

Examples:
  npx -y github:eveiljuice/claude-plugin-design-md
  npx -y github:eveiljuice/claude-plugin-design-md atmospheric-glass
  npx -y github:eveiljuice/claude-plugin-design-md paws-and-paths --out design/DESIGN.md

After the file exists, lint it against the spec:
  npx @google/design.md lint DESIGN.md
`;

function parseArgs(argv) {
  const out = { source: 'blank', outPath: 'DESIGN.md', force: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') { out.help = true; continue; }
    if (a === '--force' || a === '-f') { out.force = true; continue; }
    if (a === '--out') {
      const v = argv[++i];
      if (!v) throw new Error('--out requires a path');
      out.outPath = v;
      continue;
    }
    if (a.startsWith('-')) throw new Error(`Unknown option: ${a}`);
    out.source = a;
  }
  return out;
}

async function confirmOverwrite(path) {
  const rl = createInterface({ input, output });
  try {
    const answer = await rl.question(`${path} already exists. Overwrite? [y/N] `);
    return answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === 'yes';
  } finally {
    rl.close();
  }
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    process.stderr.write(`${err.message}\n\n${HELP}`);
    process.exit(2);
  }

  if (opts.help) {
    process.stdout.write(HELP);
    return;
  }

  const source = opts.source === '' ? 'blank' : opts.source;
  if (source !== 'blank' && !(source in EXAMPLES)) {
    process.stderr.write(`Unknown source: ${source}\nValid: blank, ${Object.keys(EXAMPLES).join(', ')}\n`);
    process.exit(2);
  }

  const outPath = resolve(process.cwd(), opts.outPath);
  if (existsSync(outPath) && !opts.force) {
    const ok = await confirmOverwrite(opts.outPath);
    if (!ok) {
      process.stdout.write('Aborted.\n');
      process.exit(1);
    }
  }

  let content;
  if (source === 'blank') {
    content = readFileSync(TEMPLATE, 'utf8');
  } else {
    const url = EXAMPLES[source];
    process.stdout.write(`Fetching ${url}\n`);
    const res = await fetch(url);
    if (!res.ok) {
      process.stderr.write(`Fetch failed: ${res.status} ${res.statusText}\n`);
      process.exit(1);
    }
    content = await res.text();
  }

  writeFileSync(outPath, content);
  process.stdout.write(`Wrote ${outPath}\n`);
  process.stdout.write(`Source: ${source === 'blank' ? 'bundled template' : source}\n`);
  process.stdout.write(`Next:   npx @google/design.md lint ${opts.outPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`Error: ${err?.message ?? err}\n`);
  process.exit(1);
});
