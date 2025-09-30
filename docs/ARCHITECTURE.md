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

## Frontend Implementation Details

### Tech Stack
- **Framework**: Vue 3 with Vite build tool
- **Language**: JavaScript (no TypeScript)
- **UI Library**: Bootstrap 5 for components and styling
- **State Management**: Pinia for exam state, attempt tracking, and history
- **Routing**: Vue Router for navigation between views
- **Storage**: Browser localStorage for attempt results and history

### UI/UX Decisions
- **Exam Presentation**: Paginated view (8-12 questions per page) with Next/Previous navigation
- **Navigation Features**:
  - Back navigation allowed (students can revise answers)
  - Question flagging for review
  - Sidebar question navigator for jumping directly to any question
- **Reading Passages**: Remain visible while answering related questions (sticky or side-by-side layout)
- **Timer**: Countdown from 120:00 with toggle to show/hide; auto-submit when time expires
- **Question Types**: Multiple choice and true/false only for MVP (no open-ended questions)

### MVP Scope
- **Phase 1 Focus**: Take exam, view score with section breakdown
- **Deferred Features**: Detailed review reports, analytics/progress tracking, question history
- **Storage**: localStorage only (no file export in MVP)

### Component Structure
- `App.vue` — Root component with router-view
- `ExamViewer.vue` — Main exam interface with pagination, timer, question navigator
- `QuestionRenderer.vue` — Dynamic component for rendering question types
- `ScoreReport.vue` — Post-exam score display with section breakdown
- `QuestionNavigator.vue` — Sidebar for jumping to questions and viewing flags

## Related Docs
- Spec: `projectspec.md`
- Implementation plan: `docs/IMPLEMENTATION_PLAN.md`
- Next steps: `NEXT_STEPS.md`
- Exam parameters: `docs/exam_parameters.md`
- Authoring: `designing_tests/README.md`
- Schemas: `schema/exam.schema.json`, `schema/attempt.schema.json`
- Contributing: `CONTRIBUTING.md`
