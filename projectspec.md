# Project Specification: STEM Magnet Exam Prep App

## 1. Project Overview
### 1.1 Purpose
This is a personal, non-commercial web application designed to help an 8th-grade student practice for entrance exams to a STEM-focused magnet high school. The app centers on realistic practice exams, timing/scoring, progress tracking, and focused review of missed questions. Optional content may include brief test-taking strategy tips (not subject-matter lessons or curricula).

The app runs locally on the developer's machine (no remote deployment or server required). Exam content is stored in JSON files for easy authoring and dynamic rendering.

### 1.2 Scope
- **In Scope**: Practice exams; timing and scoring; progress analytics; post-exam review reports; local JSON-driven content; simple exam authoring/editing workflow.
- **Out of Scope**: Subject-matter lessons/curricula, lesson plans, deep content tutorials; user authentication/multi-user features; commercialization.
- **Assumptions**: Single-user desktop usage; MVP-first approach; built with AI-assisted development.

### 1.3 Target User
- Primary: 8th-grade student.
- Secondary: Developer/parent creating and editing exam content.
- Usage: Desktop environment; keyboard and mouse inputs.

## 2. Functional Requirements
### 2.1 Core Features
1. **Dashboard**:
   - Home screen showing recent attempts, streaks, and weak areas.
   - Navigation to practice exams, analytics, and review reports.

2. **Practice Exams**:
   - Timed simulations that mimic real exams (e.g., 2–3 hours; no calculator if applicable).
   - Dynamic rendering: Load exam from JSON and display questions by type.
   - Pagination: Split long exams into navigable screens (e.g., 5–10 questions/page).
   - Scoring: Auto-grade objective types; optional manual scoring for open-ended.
   - Optional: Retake only incorrect questions from a prior attempt.

3. **Post-Exam Review & Reporting**:
   - Immediate feedback and a structured report of incorrect and flagged questions.
   - Per-question details: id, section, type, chosen answer, correct answer, explanation, time spent, difficulty, tags.
   - Aggregates: Incorrect by section, by tag/skill, and by difficulty; time analysis.
   - Actions: Create a “wrong questions” practice set; export/share report (JSON/CSV optional).

4. **Analytics/Progress Tracking**:
   - Trends over time (scores, accuracy by section, time management).
   - Highlight weak areas by tag/skill and section.
   - History of attempts with links to review reports.

5. **Exam Authoring (Content Management)**:
   - Lightweight editor or file-based workflow to add/edit questions.
   - Per-exam design folders compiled to a single exam JSON.
   - Import/export JSON for backups or AI-assisted generation.

### 2.2 Question Types and Rendering
Support at least 5 formats, rendered dynamically based on a `type` field:
1. **multiple_choice**: Text + options array; UI: Radio buttons.
2. **open_ended**: Prompt; UI: Textarea; grading keyword/manual.
3. **diagram_based**: Text + image URL; UI: Image + inputs.
4. **true_false**: Text + boolean; UI: Toggle buttons.
5. **matching**: Two arrays (e.g., terms/definitions); UI: Drag-and-drop.

Rendering is component-driven (per type) based on the JSON schema.

### 2.3 Exam Structure Overview
- **Sections**: Math, Science, Logical Reasoning, Verbal/ELA, optional Writing.
- **Format**: Mostly multiple-choice; timed; 100–300 questions total across sections.
- **App Simulation**: Provide sample tests as separate JSON files.

## 3. Non-Functional Requirements
### 3.1 Performance
- Load local JSON (<600 KB) near-instantly; paginate rendering for UX.
- Handle full JSON in memory; efficient per-page updates.

### 3.2 Usability
- Intuitive UI; accessible with keyboard navigation and ARIA labels.
- Engaging but unobtrusive animations for feedback.
- Clear error handling (e.g., invalid JSON → alert with context).

### 3.3 Security/Privacy
- Local-only; no network persistence.

### 3.4 Maintainability
- Modular Vue components; clear data contracts; concise docs.

## 4. Technical Architecture
### 4.1 Tech Stack
- **Framework**: Vue.js 3.
- **UI**: Vuetify (preferred) or Bootstrap.
- **Data**: JSON files for exams; local storage for results/history (or simple file export/import in Electron variant).
- **Build**: Vite or Vue CLI; TypeScript optional.
- **Runtime**: Local dev server; Electron optional for desktop packaging; no backend required.

### 4.2 Data Model (JSON Schemas)
- **Exam JSON** (single compiled file per exam):
  ```json
  {
    "id": "exam-001",
    "title": "STEM Practice Exam 1",
    "timeLimit": 7200,
    "sections": [
      {
        "name": "Mathematics",
        "questions": [
          {
            "id": "q1",
            "type": "multiple_choice",
            "text": "Solve: 2x + 3 = 7",
            "options": ["x=2", "x=3", "x=4", "x=5"],
            "correctAnswer": "x=2",
            "explanation": "Subtract 3, divide by 2.",
            "difficulty": "easy",
            "tags": ["algebra", "linear-equations"],
            "diagramUrl": null
          }
        ]
      }
    ]
  }
  ```
- Fields like `difficulty`, `tags`, and `explanation` enable reporting and remediation.

- **Results/Attempt JSON** (stored per attempt):
  ```json
  {
    "attemptId": "2025-01-01T12:00:00Z",
    "examId": "exam-001",
    "timeTaken": 6800,
    "score": { "raw": 45, "total": 60, "percent": 75 },
    "responses": [
      {
        "questionId": "q1",
        "section": "Mathematics",
        "type": "multiple_choice",
        "chosen": "x=3",
        "correct": "x=2",
        "isCorrect": false,
        "timeSeconds": 18,
        "tags": ["algebra", "linear-equations"],
        "difficulty": "easy"
      }
    ],
    "summary": {
      "incorrectBySection": { "Mathematics": 1 },
      "incorrectByTag": { "algebra": 1 },
      "incorrectByDifficulty": { "easy": 1 }
    }
  }
  ```

### 4.3 High-Level Architecture
- **Components**:
  - `App.vue` (root), `Dashboard.vue`, `ExamViewer.vue` (child components per type), `ReviewReport.vue` (post-exam), `Analytics.vue`, `ExamEditor.vue` (authoring).
- **State**: Pinia for current exam, attempt state, and history.
- **Routing**: Vue Router for navigation.

## 5. Development Guidelines
### 5.1 Phases
1. Setup: Scaffold Vue project; pick UI library.
2. Data Integration: Implement exam JSON loading and dynamic rendering.
3. Core Modules: Build ExamViewer (with 5 question types) and timing/scoring.
4. Review & Analytics: Implement ReviewReport and attempt persistence; charts for analytics.
5. Authoring: Basic exam editor or documented file workflow.
6. Testing: Manual local runs; validate JSON; edge cases (large exams).
7. Iteration: Use AI to generate content adhering to schema.

### 5.2 Best Practices
- Provide focused sub-specs for complex components (e.g., ExamViewer).
- Use `tags` and `difficulty` consistently for reporting.
- Validate JSON before use; guard against missing/invalid fields.

## 6. Deliverables
- Source code repository.
- Sample JSON exams (at least one example provided).
- User guide: How to run locally and add content.
- Designing workspace: `designing_tests/` with per-exam folders and a compiled exam JSON in each.
