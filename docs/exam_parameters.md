# Exam Parameters Reference

## Overview
- Total duration: 2 hours (120 minutes / 7,200 seconds) covering 100 questions.
- Scoring: 1 point per question, 100 points total; no deductions for incorrect answers or omissions.
- Intended difficulty: Rigorous 8th-grade level for STEM magnet entrance preparation.

## Section Breakdown
### Language Arts & Writing — 55 Questions
- Sub-areas: 30–35 reading/vocabulary/grammar prompts anchored in a STEM-leaning passage (200–300 words) plus 20–25 logical reasoning items (patterns, analogies, deductions) to reinforce analytical literacy.
- Reading comprehension anchored in a single passage (literary or informational) with analysis-heavy prompts that reference line numbers or evidence.
- Vocabulary/word study items tied directly to the passage for contextual definitions and usage; encourage strategic guessing with high-quality distractors and clear explanations.
- Grammar and sentence revision questions asking students to edit or select improved constructions, including explicit instructions per prompt.
- Logical reasoning items should remain multiple-choice or true/false to support auto-grading; integrate visuals (tables, simple diagrams) on ~10% of questions for variety.
- Provide passage metadata (`title`, `author`, `source`, publication year if available) alongside the text body and include optional `lexile`-style difficulty annotations when known.

### Mathematics — 45 Questions
- Focus mix: 10–15 arithmetic/number-sense items (operations, fractions, percents), 10–15 algebraic manipulation and functions (linear equations, inequalities, systems, proportional reasoning), and 15–20 geometry/data interpretation problems (coordinate plane, area/volume, probability, charts).
- Emphasize multi-step, context-driven word problems that highlight STEM applications; note when a multi-part stem covers multiple questions so pacing remains clear.
- Majority multiple choice; reserve a handful of matching or open-ended responses where an auto-gradable format is feasible (e.g., numeric answer).
- Encourage diagram inclusion for roughly 10% of questions (graphs, tables, figures) with accessible alt text.
- Calculator policy: Optional; design problems solvable without a calculator to keep the experience equitable.

## Scoring and Pacing Guidance
- Each correct answer earns 1 point; incorrect or blank responses earn 0 points with no penalty (reinforce strategic guessing in explanations and walkthroughs).
- Suggested pacing when sequencing shards:
  - Language Arts & Writing: ~65 minutes total (around 70 seconds per question, with passages consuming blocks of time).
  - Mathematics: ~55 minutes total (around 70–75 seconds per question, allowing for multi-step items).
- Difficulty balance: target 30% easy, 40% medium, 30% hard across the full exam and annotate each question with the `difficulty` field to support analytics.
- Pagination guidance: aim for 8–12 questions per page (approximately 8 pages for Language Arts & Writing and 5 pages for Mathematics). Adjust slightly when a passage or multi-part problem needs to stay together.

## Implementation Notes for Content Authors
- Preferred section identifiers: `language-arts-writing` and `mathematics`; display labels should match the section names above.
- Align exam JSON with the schema outlined in `projectspec.md`: each section contains a `questions` array with `id`, `type`, `text`, `options` (where applicable), `correctAnswer`, `difficulty`, `tags`, and optional supports (`passage`, `diagramUrl`, etc.). Use the `difficulty` field to track the 30/40/30 distribution during authoring.
- Include passage objects for Language Arts questions (fields: `title`, `source`, `body`, optional `lexile`/difficulty metadata) and embed reference ids on each related question.
- Grammar prompts should include explicit instructions within the question text or an `instructions` field so the UI can render expectations clearly.
- Vocabulary questions should reference words pulled from the accompanying passage and include succinct explanations or usage notes in `explanation` fields.
- Tagging guidance: use `reading-comprehension`, `vocabulary`, `grammar`, `logical-reasoning` for Language Arts; use `linear-equations`, `inequalities`, `proportions`, `word-problems`, `data-interpretation`, and similar algebra-focused tags for Mathematics to support analytics.
- Keep shards balanced: roughly 3–4 shards for Language Arts & Writing and 3 shards for Mathematics at 8–12 questions each, maintaining the 55/45 split while preserving thematic cohesion.

## Next Actions
- Update and validate manifests in `designing_tests/` to reflect these parameters before publishing new exam builds.
- Coordinate with documentation maintainers to ensure `projectspec.md`, authoring guides, and contributor onboarding remain synchronized with this reference.
