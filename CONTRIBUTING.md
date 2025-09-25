# Contributing Guide

This repo focuses on building and iterating a local, exam‑only practice app. The most common contributions are: adding/editing exam content in shards, compiling/validating exams, and refining the app spec/architecture.

## Prerequisites
- Node via nvm: from repo root, run `nvm install && nvm use` (see `docs/development_setup.md`).
- Install dependencies for validation tooling:
  ```sh
  npm install
  ```
  If your environment sets production installs (e.g., `NODE_ENV=production` or `npm config set production true`), Ajv is now listed under `dependencies`, so it will still install. If you ever move it back to dev deps, use `npm install --include=dev`.

## Authoring Exam Content (Option 1 + 4)
We author in small shards and compile to a single exam JSON.

- Location: `designing_tests/<exam-name>/`
  - `manifest.json`: exam metadata + ordered list of shard files per section.
  - `sections/*.json`: shards; each file is an ARRAY of question objects.
  - `compiled.exam.json`: generated output (do not hand-edit).

Official exam structure to keep in mind while authoring:
- Sections: `Language Arts & Writing` (55 questions) and `Mathematics` (45 questions).
- Time limit: 2 hours (120 minutes) with suggested pacing of ~65 minutes for Language Arts & Writing and ~55 minutes for Mathematics.
- Scoring: 1 point per question; no deductions for incorrect or blank answers.
- Difficulty mix: target 30% easy, 40% medium, 30% hard. Track distribution as you add shards and rebalance if one section drifts.

### Shard Conventions
- Size: keep each shard to 8–12 questions (and <150 KB) so pagination maps cleanly to app pages while keeping passages intact.
- Balance: ensure the compiled exam maintains the 55/45 question split across the two sections.
- IDs: deterministic, readable (e.g., `law_07`, `math_12`). IDs must be unique within the exam.
- Fields: include `difficulty` (`easy|medium|hard`) and section-appropriate `tags` for analytics.
- Tagging: Language Arts items should use `reading-comprehension`, `vocabulary`, `grammar`, `logical-reasoning` as applicable; Mathematics items should use algebra-focused tags such as `linear-equations`, `inequalities`, `proportions`, `word-problems`, `data-interpretation`.
- Types: `multiple_choice`, `open_ended`, `diagram_based`, `true_false`, `matching`.
- Types mix: keep ~80–90% multiple-choice for auto-grading, with remaining questions spread across supported formats. Use diagrams/tables in roughly 10% of questions and include `diagramUrl` or embed data structures.
- Explanations: concise. If long, consider separate shards later (future enhancement).

Scoring reminders:
- Keep correct answers mapped 1:1 with the scoring model (1 point each, no penalty for incorrect responses).
- Avoid designing logic that deducts or scales points; any advanced weighting should be discussed before implementation.
- Ensure distractors encourage strategic guessing without ambiguity; note common misconceptions in `explanation` fields where helpful.

### AI Generation Prompts (Schema‑first)
- Provide a narrow prompt per shard (one section/page at a time).
- Include a tiny example + the required keys; instruct the AI to output ONLY a JSON array of questions.
- Validate locally; do not paste giant compiled JSON into chat.

### Compile and Validate
- Compile a design folder into a single exam JSON:
  ```sh
  npm run build:exam        # compiles designing_tests/exam-sample
  ```
- Validate compiled JSON against the schema:
  ```sh
  npm run validate:compiled # validates exam-sample/compiled.exam.json
  ```
- Validate any exam file explicitly:
  ```sh
  npm run validate:exam     # validates designing_tests/example.exam.json
  ```

## Spec and Architecture
- Project spec: `projectspec.md` (exam‑only focus, reporting on missed questions).
- Architecture: `docs/ARCHITECTURE.md` (high‑level component and data flows).
- Next steps: `NEXT_STEPS.md` — short checklist to guide work.

## Code Style & PRs
- Keep changes scoped and atomic. Prefer adding shards over editing compiled files.
- Include a short note describing what changed and why.
- If you add fields or change structure, update the JSON Schemas in `schema/` and run validation.

## Common Tasks
- Add a new section shard: create `designing_tests/<exam>/sections/<section>.page-N.json` and list it in `manifest.json`.
- Add a new exam design: copy `designing_tests/exam-sample` as a starting point and adjust.
- Refine reporting: ensure questions have `difficulty`, `tags`, and `explanation`.

## Troubleshooting
- Validation errors: run `npm run validate:compiled` to see exact schema error paths.
- Missing Ajv: run `npm install` to install dependencies.
- Node version mismatch: run `nvm use` in this repo before commands.
- "Validation skipped: no schema with key or ref 'https://json-schema.org/draft/2020-12/schema'": this means the validator used an older JSON Schema draft. We ship tools configured for Ajv 2020 (draft 2020‑12); ensure you run the provided scripts. If you write custom tools, import Ajv via `ajv/dist/2020.js`.
- "Cannot find module 'ajv/dist/2020'": Node ESM import needs the `.js` extension. Use `import('ajv/dist/2020.js')` (already fixed in our tools).
