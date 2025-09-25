#!/usr/bin/env node
// Validate one or more compiled exam JSON files against schema/exam.schema.json
// Usage: node tools/validate_exam.mjs <file1> [file2 ...]

import { promises as fs } from 'node:fs';
import path from 'node:path';

async function loadAjv() {
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
}

async function validateFile(validate, file) {
  const data = JSON.parse(await fs.readFile(file, 'utf8'));
  const ok = validate(data);
  if (ok) {
    console.log(`${file}: OK`);
  } else {
    console.error(`${file}: FAILED`);
    for (const err of validate.errors || []) {
      console.error(` - ${err.instancePath} ${err.message}`);
    }
    process.exitCode = 2;
  }
}

async function main() {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error('Usage: node tools/validate_exam.mjs <file1> [file2 ...]');
    process.exit(1);
  }
  let validate;
  try {
    validate = await loadAjv();
  } catch (e) {
    console.error('Validator init failed:', e?.message || e);
    console.error('If this is a missing dependency, run: npm install');
    process.exit(1);
  }
  for (const f of files) {
    await validateFile(validate, path.resolve(f));
  }
}

main().catch((e) => { console.error(e.stack || e); process.exit(1); });
