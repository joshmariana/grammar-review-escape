/**
 * Library of Lost Voices: results collector.
 * Paste this whole file into Extensions > Apps Script of a Google Sheet.
 * See TEACHER-SETUP.md for the step-by-step guide.
 */

// CHANGE THIS to a PIN only you know. You type it on teacher.html to see results.
const TEACHER_PIN = "change-me";

const SHEET_NAME = "Results";
const COLUMNS = [
  ["sessionId", "Session ID"],
  ["name", "Student"],
  ["className", "Class"],
  ["status", "Status"],
  ["roomsDone", "Rooms Done (of 5)"],
  ["startedAt", "Started"],
  ["updatedAt", "Last Update"],
  ["minutes", "Minutes"],
  ["correct", "Total Correct"],
  ["wrong", "Total Mistakes"],
  ["accuracy", "Accuracy %"],
  ["interjections", "Interjections"],
  ["sort", "Direct vs. Indirect"],
  ["punctuate", "Punctuating Quotations"],
  ["convert", "Converting Quotations"],
  ["proofread", "Proofreading"],
  ["missed", "Missed Questions"],
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(COLUMNS.map(c => c[1]));
    sh.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold").setBackground("#fbecc8");
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Students' games send results here. One row per game, updated as they progress.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.sessionId) return json_({ ok: false });
    const sh = getSheet_();
    const row = COLUMNS.map(c => {
      const v = d[c[0]] === undefined ? "" : d[c[0]];
      return typeof v === "string" ? v.slice(0, 49000) : v;
    });
    const last = sh.getLastRow();
    let target = -1;
    if (last > 1) {
      const ids = sh.getRange(2, 1, last - 1, 1).getValues();
      for (let i = 0; i < ids.length; i++) if (ids[i][0] === d.sessionId) { target = i + 2; break; }
    }
    if (target > 0) sh.getRange(target, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// teacher.html reads results here (requires the PIN).
function doGet(e) {
  if (!e.parameter.pin || e.parameter.pin !== TEACHER_PIN) return json_({ ok: false, error: "Wrong PIN" });
  const sh = getSheet_();
  const last = sh.getLastRow();
  if (last < 2) return json_({ ok: true, rows: [] });
  const vals = sh.getRange(2, 1, last - 1, COLUMNS.length).getDisplayValues();
  const rows = vals.map(r => {
    const o = {};
    COLUMNS.forEach((c, i) => (o[c[0]] = r[i]));
    return o;
  });
  return json_({ ok: true, rows: rows });
}
