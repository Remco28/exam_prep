# Next Steps for STEM Magnet Exam Prep App

## Immediate Tasks
- [x] Review `projectspec.md` end-to-end and note deltas.
- [x] Adjust spec to de-scope lesson plans; focus on practice exams only.
- [x] Clarify that any tutorials will cover test-taking strategy, not subject matter.
- [x] Add reporting spec for missed questions and aggregates.
- [ ] Draft "Exam Parameters" doc (time limits, sections, difficulty mix, scoring).

## Future Enhancements
- [ ] Author a concise "Exam Parameters" document for test creators (time limits, sections, counts, difficulty mix, scoring, pagination model).
- [x] Establish a `designing_tests/` workspace folder.
- [x] Define per-exam subfolder structure (e.g., `designing_tests/exam-YYYYMMDD/`).
- [x] In each exam folder, draft items/sections incrementally and compile to a single JSON file.
- [x] Add an example JSON exam at `designing_tests/example.exam.json` to illustrate schema and conventions.
- [x] Add JSON Schemas for exam and attempt data (`schema/`).
- [x] Add tools to compile shards and validate exams (`tools/`).
- [ ] Implement ReviewReport UI and attempt persistence (per spec).
- [ ] Add lazy-loading of large sections (if needed) via manifest/runtime.

## Documentation
- [x] Update `projectspec.md` to reflect the refined scope (practice exams only, strategy tutorials optional).
- [ ] Add a brief README section that links to the "Exam Parameters" doc and `designing_tests/` conventions.
- [x] Note the JSON schema location once finalized, and how to validate new exams.
- [x] Add `CONTRIBUTING.md` for content authoring workflow.
- [x] Create `docs/ARCHITECTURE.md` summarizing components and data flows.

---

Notes:
- Keep this file in the repository root so the app can fetch it via the Contents API.
- Use `- [ ]` and `- [x]` checkboxes under headings.
