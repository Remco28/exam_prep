# Task: Refresh Documentation for Updated Exam Structure

## Objective
Align existing repository documentation with the new exam parameters (two sections, 55/45 question split, 2-hour limit, no wrong-answer penalties) so contributors have a single, consistent reference.

## Background
Earlier docs referenced multiple sections (Math, Science, Logic, etc.), wider question ranges, and ambiguous scoring rules. We recently defined the canonical structure (Language Arts & Writing, Mathematics) and timing, so the spec, authoring guides, and contributing instructions need to reflect that canon.

## Deliverables
Update the following existing files:
- `projectspec.md`
- `designing_tests/README.md`
- `CONTRIBUTING.md`

## Requirements
### 1. `projectspec.md`
- In the scope/requirements area (Section 2), replace outdated section lists with the two official sections:
  - `Language Arts & Writing` — 55 questions
  - `Mathematics` — 45 questions
- Update any references to "2–3 hours" or "100–300 questions" so they state a 2-hour (120 minute / 7200 seconds) exam totaling 100 questions.
- Under Practice Exams (Section 2.1) and/or subsequent bullets, spell out the content expectations:
  - Reading comprehension from an excerpt (book passage or short article) with analysis prompts.
  - Vocabulary/definition questions tied to the passage.
  - Grammar/sentence revision items.
  - Middle-school algebra focus for Math (linear equations, inequalities, proportional reasoning, simple word problems).
- Clarify scoring: 1 point per question, no deduction for incorrect answers; include in the scoring description and any sample data references if present.
- Update example JSON if needed so the exam sections array illustrates both sections and the 55/45 split (can mention truncated questions with comments or placeholder counts if necessary).

### 2. `designing_tests/README.md`
- Add a short "Exam Structure" subsection near the top summarizing the 2 sections, question counts, and 2-hour time limit.
- Provide guidance on shard sizing/pagination aligned to the new pacing (suggest 5–10 questions per page, roughly 7–8 pages for Language Arts & Writing, 5–6 for Math).
- Call out metadata expectations for Language Arts passages (e.g., include `passage` objects with `title`, `source`, `body`) and grammar prompts (clear instructions field) so authors embed everything needed in shards.
- Note that vocabulary items should reference words from the passage and include correct usage/explanations.
- Mention no penalty scoring so authors can craft answer explanations accordingly.

### 3. `CONTRIBUTING.md`
- In "Authoring Exam Content" and/or "Shard Conventions", reinforce the official section IDs/names and per-section question targets (55/45) so contributors balance shards correctly.
- Update shard sizing guidance to align with the revised pagination recommendation (smaller shards geared toward ~5–10 questions).
- Add a reminder to tag Language Arts questions with skills such as `reading-comprehension`, `vocabulary`, `grammar` and Math questions with algebra-related tags (`linear-equations`, `inequalities`, `proportions`, etc.).
- Clarify scoring expectations (1 point each, no negative marking) so content authors don't design penalty-based logic.

## Acceptance Criteria
- All three files read consistently with the new exam parameters and no longer reference the legacy multi-section structure.
- Tone stays instructional and concise; headings remain intact.
- Markdown passes basic formatting/lint (no broken lists or code fences).
