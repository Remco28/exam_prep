# Architecture Overview — STEM Magnet Exam Prep App

This is a local, exam‑only practice app. Exams are authored as small JSON shards, compiled into a single exam JSON, and rendered in a Vue UI. No backend or external APIs are required.

## System Components

### Core
- **Vue App (SPA)** — Renders practice exams, timing/scoring, review reports, and analytics.
- **Content (JSON)** — Exams compiled to a single file per exam; attempts/results saved locally.
- **Tools** (`tools/`) — CLI utilities to compile shards and validate JSON against schemas.

### Supporting
- **Schemas** (`schema/`) — JSON Schemas for Exam and Attempt files (Ajv‑compatible).
- **Schemas** (`schema/`) — JSON Schemas for Exam and Attempt files (draft 2020‑12; validated with Ajv 2020).
- **Authoring Workspace** (`designing_tests/`) — Per‑exam folders with shard files and a manifest.
- No server/DB required; optionally package with Electron in the future.

### Process Architecture
```
[Vue SPA] ── loads ──> [Exam JSON]
    │                         
    ├──── saves/exports ──> [Attempt JSON]
    │
[Compile CLI] ── from shards ──> [Exam JSON]
```

## Data Flow Examples

### Take & Submit an Exam
```
User → ExamViewer → timing + responses → score → Attempt JSON (local)
```

### Review & Remediate
```
Attempt JSON → ReviewReport → list wrong/flagged → retake wrong‑only (optional)
```

### Authoring (Shards → Compiled Exam)
```
Write shards (per section/page) → list in manifest.json →
tools/compile_exam.mjs → compiled.exam.json → validate → load in app
```

## Key Abstractions
- **Exam**: `id`, `title`, `timeLimit`, `sections[]`, each with `questions[]`.
- **Question**: `id`, `type` (multiple_choice, open_ended, diagram_based, true_false, matching), `text`, optional `options`, `correctAnswer`, `explanation`, `difficulty`, `tags`.
- **Attempt**: `responses[]` with chosen vs. correct, timing, difficulty, tags; computed summaries by section/tag/difficulty.

## Configuration
- Node version via `.nvmrc` (LTS). No runtime secrets.
- Validation uses `schema/*.json` via Ajv (installed as dev dependency).

## Integration Points
- **Local Files**: Exams and attempts are local JSON; no network.
- **Validation**: Ajv (via `npm install`) validates files against schemas.

## Runtime & Operations Notes
- Runs locally with a dev server; no backend.
- Large exams: author and edit as shards; compile when needed. Optionally lazy‑load by section if size grows.
- Performance: keep pages 5–10 questions each; load entire exam JSON into memory in MVP.

## Development Guidelines
- Author in shards under `designing_tests/<exam>/sections/*.json`.
- Maintain a `manifest.json` listing shard files by section; compile with `tools/compile_exam.mjs`.
- Validate with `tools/validate_exam.mjs` and schemas in `schema/`.
- Ensure questions include `difficulty`, `tags`, and concise `explanation` to power reporting.

## Related Docs
- Spec: `projectspec.md`
- Next steps: `NEXT_STEPS.md`
- Authoring: `designing_tests/README.md`
- Schemas: `schema/exam.schema.json`, `schema/attempt.schema.json`
- Contributing: `CONTRIBUTING.md`
