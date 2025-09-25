#!/usr/bin/env node
// Assemble an exam from shards listed in a per-exam manifest.json.
// Usage:
//   node tools/compile_exam.mjs <examDesignDir> [--out <outputPath>] [--no-validate]
// Example:
//   node tools/compile_exam.mjs designing_tests/exam-sample

import { promises as fs } from 'node:fs';
import path from 'node:path';

async function maybeLoadAjv() {
  try {
    // Use Ajv 2020 to support draft 2020-12 schemas
    const Ajv2020Mod = await import('ajv/dist/2020.js');
    const Ajv = Ajv2020Mod.default || Ajv2020Mod;
    const addFormatsMod = await import('ajv-formats');
    const addFormats = addFormatsMod.default || addFormatsMod;
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    const examSchemaPath = path.resolve('schema/exam.schema.json');
    const schemaRaw = await fs.readFile(examSchemaPath, 'utf8');
    const schema = JSON.parse(schemaRaw);
    const validate = ajv.compile(schema);
    return validate;
  } catch (e) {
    console.warn('Validation skipped:', e?.message || e);
    return null; // Ajv or schema not available — skip validation
  }
}

function parseArgs(argv) {
  const args = { dir: null, out: null, validate: true };
  const parts = argv.slice(2);
  while (parts.length) {
    const a = parts.shift();
    if (!args.dir && a && !a.startsWith('-')) { args.dir = a; continue; }
    if (a === '--out') { args.out = parts.shift() || null; continue; }
    if (a === '--no-validate') { args.validate = false; continue; }
    if (a === '--help' || a === '-h') {
      console.log('Usage: node tools/compile_exam.mjs <dir> [--out <file>] [--no-validate]');
      process.exit(0);
    }
  }
  if (!args.dir) throw new Error('Missing exam design directory argument.');
  return args;
}

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, 'utf8'));
}

function ensureQuestionBasics(q) {
  const required = ['id', 'type', 'text'];
  const missing = required.filter((k) => !(k in q));
  if (missing.length) {
    throw new Error(`Question missing fields [${missing.join(', ')}]: ${q.id ?? '<no-id>'}`);
  }
}

async function main() {
  const { dir, out, validate } = parseArgs(process.argv);
  const absDir = path.resolve(dir);
  const manifestPath = path.join(absDir, 'manifest.json');
  const manifest = await readJson(manifestPath);

  const exam = {
    id: manifest.id,
    title: manifest.title,
    timeLimit: manifest.timeLimit,
    sections: []
  };

  for (const section of manifest.sections) {
    const combined = [];
    for (const rel of section.files) {
      const shardPath = path.join(absDir, rel);
      const shard = await readJson(shardPath);
      if (!Array.isArray(shard)) {
        throw new Error(`Shard is not an array: ${rel}`);
      }
      for (const q of shard) {
        ensureQuestionBasics(q);
        combined.push(q);
      }
    }
    exam.sections.push({ name: section.name, questions: combined });
  }

  const outPath = path.resolve(out || path.join(absDir, 'compiled.exam.json'));
  await fs.writeFile(outPath, JSON.stringify(exam, null, 2), 'utf8');
  console.log(`Wrote compiled exam: ${outPath}`);

  if (validate) {
    const ajvValidate = await maybeLoadAjv();
    if (ajvValidate) {
      const ok = ajvValidate(exam);
      if (ok) {
        console.log('Schema validation: OK');
      } else {
        console.error('Schema validation: FAILED');
        for (const err of ajvValidate.errors || []) {
          console.error(` - ${err.instancePath} ${err.message}`);
        }
        process.exitCode = 2;
      }
    } else {
      console.warn('Validation skipped (Ajv or schema not installed).');
    }
  }
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
