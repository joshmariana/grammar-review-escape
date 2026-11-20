# Library of Lost Voices: Teacher Guide

A one-player digital escape room for 5th grade covering **direct quotations, indirect quotations, and interjections**.

- **Student link:** `https://joshmariana.github.io/grammar-review-escape/quotations/`
- **Teacher results:** `https://joshmariana.github.io/grammar-review-escape/quotations/teacher.html`

(These links work once GitHub Pages is on. See step 0.)

## The 5 rooms

| Room | Skill | To unlock |
|---|---|---|
| 1. The Gasping Gallery | Interjections: find them (or type "none"), then punctuate strong (!) vs. mild (,) feelings | 5 correct. Each miss adds 1 more (up to 8) |
| 2. The Sorting Stacks | Sort sentences: correct direct / correct indirect / incorrect | A shelf of 6 with zero mistakes. Any miss = brand-new shelf |
| 3. The Quotation Workshop | Type the full sentence with correct capitals, commas, quotation marks, end marks (tag first, tag last, questions, split quotes) | 4 correct. Each miss adds 1 more (up to 7) |
| 4. The Echo Chamber | Build the sentence from word tiles, direct ↔ indirect (pronoun and verb shifts, trap tiles) | 3 correct. Each miss adds 1 more (up to 6) |
| 5. Professor Quill's Office | Proofread a story: click all 5 errors, with no clicks on correct words | One perfect page. Any miss = new page |

**What makes it hard to guess through:**
- Most answers are typed or built, not picked from a list.
- A wrong answer locks the screen for 10 seconds and adds extra questions.
- Questions are drawn at random from banks, so neighbors see different questions.
- Refreshing the page doesn't help: it resumes the same question.
- If a student changes or misspells a word in a typing question, they get a warning with no penalty, so typos don't count as grammar mistakes.

After each mistake, students see the correct answer and the rule, then get a **new** question. The results screen ends with a personal study list of every question they missed.

## Step 0: Turn on GitHub Pages (one time)
1. On GitHub, open the **grammar-review-escape** repository → **Settings** → **Pages**.
2. Under "Build and deployment", set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**. Click **Save**.
3. Wait about a minute. The student link above will start working.

## Step 1: Connect a Google Sheet so you can see results (about 5 minutes)
Without this step, results only appear on each student's screen and on the device they used.

1. Create a new Google Sheet (name it something like "Escape Room Results").
2. In the sheet: **Extensions → Apps Script**.
3. Delete what's there and paste in everything from [`apps-script/Code.gs`](apps-script/Code.gs).
4. On the line `const TEACHER_PIN = "change-me";`, change `change-me` to a PIN only you know.
5. Click **Save** (the disk icon).
6. Click **Deploy → New deployment**. Click the gear ⚙️ next to "Select type" → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone** (students don't need Google accounts, and they can't read results without your PIN)
7. Click **Deploy**, then **Authorize access**. Choose your account. If Google shows "Google hasn't verified this app", click **Advanced → Go to (project name)**. This is your own script, so that's expected.
8. Copy the **Web app URL** (it ends in `/exec`).
9. On GitHub, open `quotations/config.js`, click the ✏️ pencil, paste the URL between the quotes on the `RESULTS_URL:` line, and click **Commit changes**.
10. Optional: edit `CLASSES:` in the same file to list your class names.

To check it works, play a few questions yourself. A row should show up in the "Results" tab of your sheet.

## Seeing results
- **Google Sheet:** one row per student game. It updates live as they go: status, minutes, accuracy, a score for each skill, and every missed question with what they wrote.
- **teacher.html:** enter your PIN to see a color-coded dashboard with class averages per skill, filters by class, sorting, and a CSV download.

## Changing questions
All questions are in `quotations/questions.js`. Each item lists every accepted answer, so you can add or edit questions without touching the game code.

## Changing the wait time
In `config.js`, `WRONG_ANSWER_WAIT: 10` is the number of seconds of alarm after a wrong answer.
