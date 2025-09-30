# Implementation Plan — STEM Magnet Exam Prep App

## Overview
This document outlines the phased implementation strategy for building the Vue-based exam practice application. The plan prioritizes an MVP approach, delivering a working exam viewer with scoring before adding advanced features.

## Technical Decisions Summary

### Tech Stack
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Language**: JavaScript (no TypeScript)
- **UI Framework**: Bootstrap 5
- **State Management**: Pinia
- **Routing**: Vue Router
- **Storage**: Browser localStorage
- **Node Version**: 22.20.0 (LTS)
- **Dev Environment**: VS Code

### Key Constraints
- Local-only application (no backend/API)
- Multiple-choice and true/false questions only (no open-ended for MVP)
- Target 5 compiled exams maximum
- 100 questions per exam (55 Language Arts & Writing, 45 Mathematics)
- 2-hour (120 minute) time limit per exam

## UI/UX Requirements

### Exam Viewer
- **Pagination**: 8-12 questions per page with Next/Previous navigation
- **Back Navigation**: Allowed; students can revise previous answers
- **Question Flagging**: Students can flag questions for review
- **Question Navigator**: Sidebar with "jump to question X" functionality
- **Reading Passages**: Remain visible while answering related questions (sticky or side-by-side layout)

### Timer
- Countdown from 120:00 (minutes:seconds format)
- Toggleable visibility (show/hide button)
- Auto-submit exam when timer reaches 0:00
- Persistent across page navigation

### Scoring & Results
- Auto-grade multiple choice and true/false questions
- Score display: Total score (X/100) and section breakdown (Language Arts: X/55, Math: X/45)
- Store attempt results in localStorage with timestamp
- No detailed review report in MVP (deferred to Phase 6+)

## Implementation Phases

### Phase 1: Project Setup & Scaffolding
**Objective**: Initialize Vue project with all dependencies and basic routing.

**Tasks**:
1. Create Vue 3 project using Vite (`npm create vite@latest`)
2. Install dependencies:
   - Bootstrap 5
   - Vue Router
   - Pinia
3. Configure Bootstrap in main.js
4. Set up basic routing:
   - `/` — Home/Exam selection view
   - `/exam/:examId` — Exam viewer
   - `/score/:attemptId` — Score report
5. Create placeholder components:
   - `App.vue`
   - `views/Home.vue`
   - `views/ExamViewer.vue`
   - `views/ScoreReport.vue`
6. Initialize Pinia store with placeholder state
7. Verify dev server runs (`npm run dev`)

**Acceptance Criteria**:
- Project builds and runs without errors
- Basic routing works (can navigate between placeholder views)
- Bootstrap styles are applied

**Dependencies**: None (starting point)

---

### Phase 2: Exam Loading & Basic Question Rendering
**Objective**: Load exam JSON and render questions in a simple list format.

**Tasks**:
1. Create `stores/examStore.js` with Pinia:
   - State: `currentExam`, `loading`, `error`
   - Action: `loadExam(examId)` to fetch JSON from `/designing_tests/{examId}/compiled.exam.json`
2. Create `components/QuestionRenderer.vue`:
   - Props: `question` object
   - Render multiple_choice with radio buttons
   - Render true_false with toggle buttons
   - Basic styling with Bootstrap classes
3. Update `ExamViewer.vue`:
   - Load exam on mount using examStore
   - Display exam title
   - Render all questions in a scrolling list (no pagination yet)
   - Display loading/error states
4. Create a test route: Load `designing_tests/exam-sample/compiled.exam.json`
5. Verify questions render correctly with selectable options

**Acceptance Criteria**:
- Exam JSON loads successfully
- All 100 questions render in a single scrolling view
- Students can select answers (state not yet tracked)
- No console errors

**Dependencies**: Phase 1 complete

---

### Phase 3: Pagination & Navigation
**Objective**: Split questions into pages with Next/Previous controls.

**Tasks**:
1. Update `stores/examStore.js`:
   - Add `currentPage` state (default: 0)
   - Add computed `questionsPerPage` (default: 10)
   - Add computed `currentPageQuestions` (slice based on currentPage)
   - Add computed `totalPages`
   - Actions: `nextPage()`, `prevPage()`, `goToPage(pageIndex)`
2. Update `ExamViewer.vue`:
   - Render only `currentPageQuestions`
   - Add Next/Previous buttons (disable at boundaries)
   - Display page indicator: "Page X of Y"
3. Add reading passage support:
   - If question has `passageId`, look up passage in exam data
   - Display passage in a sticky sidebar or above question group
   - Ensure passage remains visible for all related questions
4. Test pagination with exam-sample

**Acceptance Criteria**:
- Questions divided into pages (~10 questions per page)
- Next/Previous navigation works correctly
- Page boundaries handled (no prev on page 1, no next on last page)
- Reading passages display with related questions

**Dependencies**: Phase 2 complete

---

### Phase 4: Answer Tracking & Question Navigator
**Objective**: Track student responses and add sidebar for jumping to questions.

**Tasks**:
1. Create `stores/attemptStore.js`:
   - State: `responses` (object: `{ questionId: { chosen, flagged, timeStarted } }`)
   - Action: `recordAnswer(questionId, answer)`
   - Action: `toggleFlag(questionId)`
   - Computed: `answeredCount`, `flaggedCount`, `unansweredQuestionIds`
2. Update `QuestionRenderer.vue`:
   - Bind selected option to attemptStore.responses
   - Add "Flag for Review" checkbox
   - Highlight flagged questions (badge or icon)
3. Create `components/QuestionNavigator.vue`:
   - Sidebar with buttons for each question (Q1, Q2, ..., Q100)
   - Highlight answered questions (color/icon)
   - Highlight flagged questions (different color/icon)
   - Highlight current question
   - Click handler: `examStore.goToPage()` to jump to question's page
4. Update `ExamViewer.vue`:
   - Add QuestionNavigator to layout (collapsible sidebar)
   - Show progress: "X of 100 answered, Y flagged"

**Acceptance Criteria**:
- Student selections persist when navigating between pages
- Question navigator displays all 100 questions
- Clicking navigator button jumps to correct page
- Flagging works and updates navigator visual state
- Back navigation preserves answers

**Dependencies**: Phase 3 complete

---

### Phase 5: Timer Implementation
**Objective**: Add countdown timer with toggle and auto-submit.

**Tasks**:
1. Update `stores/attemptStore.js`:
   - State: `timeRemaining` (seconds, default: 7200)
   - State: `timerActive` (boolean)
   - State: `timerVisible` (boolean, default: true)
   - Action: `startTimer()` — setInterval to decrement timeRemaining every second
   - Action: `pauseTimer()` / `stopTimer()`
   - Action: `toggleTimerVisibility()`
   - Computed: `formattedTime` (MM:SS format)
2. Create `components/ExamTimer.vue`:
   - Display `formattedTime` in large text
   - Toggle button to show/hide timer
   - Visual warning when < 10 minutes remaining (optional red color)
3. Update `ExamViewer.vue`:
   - Mount: Start timer on exam load
   - Add ExamTimer component to header/navbar
   - Watch `timeRemaining`: if 0, call `submitExam()` automatically
4. Cleanup: Stop timer on unmount or exam submit

**Acceptance Criteria**:
- Timer counts down from 120:00
- Timer remains consistent across page navigation
- Show/hide toggle works
- Auto-submit triggers at 0:00
- Timer stops after submission

**Dependencies**: Phase 4 complete

---

### Phase 6: Scoring Engine & Score Report
**Objective**: Grade exam and display results with section breakdown.

**Tasks**:
1. Update `stores/attemptStore.js`:
   - Action: `submitExam()`:
     - Stop timer
     - Iterate responses, compare `chosen` vs `correctAnswer`
     - Calculate total score, section scores (Language Arts & Writing, Mathematics)
     - Generate attempt summary object (attemptId, examId, score, responses, timestamp)
     - Store in localStorage: `exam_attempts` array
     - Navigate to `/score/:attemptId`
2. Create `views/ScoreReport.vue`:
   - Load attempt from localStorage by attemptId
   - Display:
     - Total score: "82/100 (82%)"
     - Section breakdown: "Language Arts & Writing: 45/55 (82%)", "Math: 37/45 (82%)"
     - Time taken: formatted duration
   - Button: "Back to Home"
3. Update `ExamViewer.vue`:
   - Add "Submit Exam" button (visible on all pages)
   - Confirmation dialog before submit: "Submit exam? You have X unanswered questions."
   - Call `attemptStore.submitExam()` on confirmation

**Acceptance Criteria**:
- Submit button triggers grading
- Correct answers are scored properly
- Score report displays total and section breakdown
- Attempt stored in localStorage with unique ID
- Navigation to score report works

**Dependencies**: Phase 5 complete

---

### Phase 7: Home View & Exam Selection
**Objective**: Create landing page with exam list and attempt history.

**Tasks**:
1. Create `views/Home.vue`:
   - Display available exams (hardcoded list or scan `designing_tests/` directory)
   - For each exam: Show title, question count, time limit
   - "Start Exam" button → navigate to `/exam/:examId`
2. Add localStorage utilities:
   - Retrieve `exam_attempts` array
   - Display last 5 attempts: exam title, date, score
   - Link to score report: `/score/:attemptId`
3. Optional: Add "Clear History" button to reset localStorage

**Acceptance Criteria**:
- Home page lists all available exams
- Student can start any exam from home
- Recent attempts display with scores
- Can navigate to previous score reports

**Dependencies**: Phase 6 complete

---

## Post-MVP Enhancements (Future Phases)

### Phase 8: Detailed Review Report
- Show question-by-question breakdown
- Display chosen vs correct answers
- Show explanations for incorrect answers
- Filter by incorrect/flagged/all questions

### Phase 9: Analytics & Progress Tracking
- Chart: Score trends over time
- Breakdown by tags (e.g., algebra, grammar)
- Breakdown by difficulty (easy/medium/hard)
- Identify weak areas

### Phase 10: Retake Wrong Questions
- Create custom exam from missed questions in previous attempt
- Shorter practice session targeting weaknesses

### Phase 11: Export & Backup
- Export attempt results as JSON or CSV
- Import/restore attempt history

## Task Spec Naming Convention
Individual task specs should be saved to `comms/tasks/` using the format:
```
YYYY-MM-DD-phase-N-brief-description.md
```

Examples:
- `2025-09-30-phase-1-project-setup.md`
- `2025-10-01-phase-2-exam-loading.md`

## Testing Strategy
- **Manual Testing**: Developer/User tests each phase locally via `npm run dev`
- **JSON Validation**: Use `npm run validate:compiled` to ensure exam JSON is schema-compliant
- **Browser DevTools**: Monitor console for errors; inspect localStorage for attempts

## Rollback Plan
- Each phase should be independently functional; revert to previous phase if blocking issues arise
- Use git branches per phase for isolation (optional)

## Related Documentation
- Architecture: `docs/ARCHITECTURE.md`
- Exam Parameters: `docs/exam_parameters.md`
- Project Spec: `projectspec.md`
- Next Steps: `NEXT_STEPS.md`