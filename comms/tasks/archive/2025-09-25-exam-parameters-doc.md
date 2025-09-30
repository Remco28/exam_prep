# Task: Draft Updated Exam Parameters Doc

## Objective
Create a concise reference document that captures the updated structure, timing, and scoring rules for the STEM magnet entrance practice exam so test authors and the app can stay aligned.

## Background & Rationale
The product scope has been narrowed to practice exams, and the exam parameters have shifted. We need a canonical doc under `docs/` that states the latest timing, section breakdown, question counts, and scoring guidance. This will unblock future content authoring and keep metadata consistent across JSON exam manifests.

## Deliverables
- `docs/exam_parameters.md` (new): Markdown reference outlining the exam configuration described below.

## Requirements
1. **Overview section**
   - State total duration (`2 hours`) and total question count (`100` questions).
   - Clarify that answers are scored 1 point each with **no deduction for incorrect answers**.
   - Mention target audience (8th-grade student preparing for STEM magnet entrance) to frame difficulty.

2. **Section breakdown**
   - Two primary sections: `Language Arts & Writing` (55 questions) and `Mathematics` (45 questions).
   - For Language Arts & Writing, describe the mix:
     - Reading comprehension from an excerpt (book passage or short article) with analysis-heavy prompts.
     - Vocabulary/word study requiring definitions/usage based on the excerpt.
     - Sentence revision / grammar corrections.
   - For Mathematics, emphasize focus on middle-school algebra competencies (linear equations, inequalities, word problems, proportional reasoning, etc.). Note calculator policy if relevant (if unknown, say "calculator optional" per current scope).

3. **Scoring & pacing guidance**
   - Explicitly state scoring (1 point per question, 100 points total) and absence of penalties.
   - Provide suggested pacing (e.g., 70–75 minutes for Language Arts & Writing, 45–50 minutes for Math) so authors know how to sequence pages in the JSON manifests. If deriving pacing, ensure total stays within 120 minutes.

4. **Implementation notes for content authors**
   - Brief bullet list aligning exam sections with JSON schema conventions (section ids, tags, recommended pagination).
   - Highlight need to include metadata for reading passages (title/source fields) and grammar prompts (explicit instructions) in future shards.

5. **Linkage**
   - At the end of the doc, add a short "Next Actions" subsection reminding contributors to keep `designing_tests/` manifests in sync with these parameters.

## Acceptance Criteria
- Document accurately reflects all new parameters listed above.
- Tone is instructional and concise; uses Markdown headings for clarity.
- No unrelated scope changes. File builds cleanly in Markdown lint (if run).
