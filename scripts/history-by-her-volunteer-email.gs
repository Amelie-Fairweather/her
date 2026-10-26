/**
 * History by HER — volunteer form auto-email via Resend
 *
 * Reads each Google Form response row → greets that person's NAME
 * and sends to that person's EMAIL (from the form).
 *
 * Website signups already do this at:
 *   POST /api/history-by-her
 *
 * This script covers people who open the Google Form directly.
 *
 * SETUP (do once):
 * 1. Open the responses sheet → Extensions → Apps Script → paste this file → Save
 * 2. Project Settings → Script properties → Add:
 *      RESEND_API_KEY = (same key as Vercel)
 * 3. Select installTrigger → Run → Allow permissions
 *
 * Optional: delete old Gmail triggers first so nothing double-sends.
 *
 * Debug: Executions → Logs. Look for "OK sent to ..."
 */

var MATERIALS_FOLDER_URL =
  "https://drive.google.com/drive/folders/1I4gZfUv7RynkU6_Kj4deNGZFb0OAZYHM?usp=sharing";
var INSTRUCTION_VIDEO_URL =
  "https://drive.google.com/file/d/1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k/view?usp=sharing";
var VIDEO_THUMBNAIL_URL =
  "https://drive.google.com/thumbnail?id=1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k&sz=w1000";
var REPORT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeGaCWsgfY18pGDFB5NTpB9MU4LzgZPUZ7kQxBTYozZW_eKEw/viewform";
var FROM_EMAIL = "Amelie Fairweather <materials@hereducation.org>";
var REPLY_TO = "hereducationrequired@gmail.com";
var SENT_HEADER = "Auto email sent";
var MAX_CATCHUP_PER_RUN = 25;

/**
 * Run ONCE. Installs:
 * 1) On form submit → email that respondent immediately (their name + their email)
 * 2) Every 6 hours → catch anyone missed
 */
function installTrigger() {
  var ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (fn === "onFormSubmit" || fn === "processUnsentResponses") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(ssId)
    .onFormSubmit()
    .create();

  ScriptApp.newTrigger("processUnsentResponses")
    .timeBased()
    .everyHours(6)
    .create();

  ensureResendKey_();
  Logger.log(
    "Installed: onFormSubmit (instant) + processUnsentResponses (every 6 hours). Resend auto-email is ON.",
  );
}

/** Instant path — fires on each Google Form submission. */
function onFormSubmit(e) {
  try {
    var sheet = getResponsesSheet_();
    ensureSentColumn_(sheet);

    var rowIndex = e && e.range ? e.range.getRow() : sheet.getLastRow();
    if (alreadySent_(sheet, rowIndex)) {
      Logger.log("Row " + rowIndex + " already emailed — skip");
      return;
    }

    emailRow_(sheet, rowIndex, e);
  } catch (err) {
    Logger.log("FAIL: " + err);
    throw err;
  }
}

/** Backup path — catch missing YES rows. */
function processUnsentResponses() {
  resendAllMissing();
}

/**
 * Email responses missing "YES" in Auto email sent.
 * Each row uses THAT row's name + email from the Google Form.
 */
function resendAllMissing() {
  var sheet = getResponsesSheet_();
  ensureSentColumn_(sheet);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("No responses yet");
    return;
  }

  var sent = 0;
  var skipped = 0;
  var failed = 0;

  for (var row = 2; row <= lastRow; row++) {
    if (sent >= MAX_CATCHUP_PER_RUN) {
      Logger.log(
        "STOPPED early at row " +
          row +
          ": hit MAX_CATCHUP_PER_RUN (" +
          MAX_CATCHUP_PER_RUN +
          ").",
      );
      break;
    }

    if (alreadySent_(sheet, row)) {
      skipped++;
      continue;
    }

    try {
      emailRow_(sheet, row, null);
      sent++;
      Utilities.sleep(400);
    } catch (err) {
      failed++;
      Logger.log("Row " + row + " FAIL: " + err);
    }
  }

  Logger.log("Done. sent=" + sent + " skipped=" + skipped + " failed=" + failed);
}

/**
 * Manually email ONE sheet row (uses that row's form name + email).
 * Edit ROW, then Run → emailOneRow
 */
function emailOneRow() {
  var ROW = 51;
  var sheet = getResponsesSheet_();
  ensureSentColumn_(sheet);
  emailRow_(sheet, ROW, null);
}

/** Send one row. Uses the name + email from the Google Form answers on that row. */
function emailRow_(sheet, rowIndex, e) {
  var answers = readSheetRow_(sheet, rowIndex);
  if (e) {
    answers = mergeAnswers_(answers, collectAnswers_(e));
  }

  Logger.log("ROW " + rowIndex + " KEYS: " + Object.keys(answers).join(" || "));
  Logger.log("ROW " + rowIndex + " VALUES: " + JSON.stringify(answers));

  var name = pickName_(answers);
  var email = findEmail_(answers);

  if (!email) {
    markSent_(sheet, rowIndex, "FAIL: no email in row");
    throw new Error(
      "No email found on row " +
        rowIndex +
        ". Values: " +
        Object.keys(answers)
          .map(function (k) {
            return k + "=" + answers[k];
          })
          .join(" | "),
    );
  }

  var greeting = name || "Volunteer";
  sendVolunteerEmail_(email, greeting);
  markSent_(sheet, rowIndex, "YES " + new Date().toISOString() + " → " + email);
  Logger.log("OK sent to " + email + " as Hi " + greeting + " (row " + rowIndex + ")");
}

function alreadySent_(sheet, rowIndex) {
  ensureSentColumn_(sheet);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var col = findHeaderIndex_(headers, SENT_HEADER) + 1;
  var status = String(sheet.getRange(rowIndex, col).getValue() || "");
  return status.indexOf("YES") === 0;
}

function ensureResendKey_() {
  var key = PropertiesService.getScriptProperties().getProperty("RESEND_API_KEY");
  if (!key) {
    throw new Error(
      "Missing Script property RESEND_API_KEY. " +
        "Apps Script → Project Settings → Script properties → Add RESEND_API_KEY " +
        "(same value as Vercel).",
    );
  }
  return key;
}

/** Sends via Resend API — greets greetingName, delivers to email. */
function sendVolunteerEmail_(email, greetingName) {
  var apiKey = ensureResendKey_();
  var content = buildEmailContent_(greetingName);

  var payload = {
    from: FROM_EMAIL,
    to: [email],
    reply_to: REPLY_TO,
    subject: content.subject,
    text: content.text,
    html: content.html,
  };

  var res = UrlFetchApp.fetch("https://api.resend.com/emails", {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + apiKey },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var code = res.getResponseCode();
  var body = res.getContentText();
  if (code < 200 || code >= 300) {
    throw new Error("Resend HTTP " + code + ": " + body);
  }
  Logger.log("Resend OK: " + body);
}

function buildEmailContent_(greetingName) {
  var name = String(greetingName || "Volunteer").trim() || "Volunteer";
  var subject = "Your History by HER materials";

  var text =
    "Hi " +
    name +
    ",\n\n" +
    "Thank you so much for volunteering for History by HER, HER Education Required's global initiative aimed at improving how women's history is taught!\n\n" +
    "Step 1: Access Your Print Files\n" +
    "This is designed to be a no-cost initiative for you. Access the ready to print bookmarks here:\n" +
    MATERIALS_FOLDER_URL +
    "\n\n" +
    "Printing Options:\n" +
    "School Print Shops: Most schools have print shops that can print these front and back directly onto cardstock paper for free. Figure out how to contact the print shop, and go ask ASAP.\n\n" +
    "Manual Assembly: If you don't have access to a print shop, watch this short tutorial to easily align and assemble the front and back sides yourself using nice paper:\n" +
    INSTRUCTION_VIDEO_URL +
    "\n\n" +
    "Or create your own women's history themed bookmarks!\n\n" +
    "Step 2: Distribute to Your Community\n" +
    "Once assembled, please donate the bookmarks to local:\n" +
    "- High schools & middle schools\n" +
    "- Public libraries\n" +
    "- Local bookshops\n\n" +
    "Step 3: Track & Report Your Impact\n" +
    "To receive credit for your service, keep track of:\n" +
    "- The total number of bookmarks printed and donated.\n" +
    "- The number of institutions you visited.\n\n" +
    "Once your donations are complete, submit your totals using this form:\n" +
    REPORT_FORM_URL +
    "\n\n" +
    "Recognition & Next Steps\n" +
    "Global Recognition: Completing your donation and submitting the reporting form qualifies you for global recognition on our website and Instagram page!\n\n" +
    "Media Volunteers: If you opted to take photos or film a reel for our Instagram, keep an eye on your inbox—a follow-up email with detailed guidelines will be sent shortly.\n\n" +
    "Timeline: Please try to complete your distribution within the next 2–3 weeks.\n\n" +
    "Thank you again for bringing vital historical figures into local classrooms and communities! Feel free to reply directly to this email if you have any questions.\n\n" +
    "Best regards,\n" +
    "Amelie Fairweather\n" +
    "Founder & President\n" +
    "HER Education Required\n" +
    "hereducation.org";

  var html =
    "<p>Hi " +
    esc_(name) +
    ",</p>" +
    "<p>Thank you so much for volunteering for History by HER, HER Education Required's global initiative aimed at improving how women's history is taught!</p>" +
    "<p><b>Step 1: Access Your Print Files</b><br>" +
    "This is designed to be a no-cost initiative for you. Access the ready to print bookmarks here:<br>" +
    link_(MATERIALS_FOLDER_URL) +
    "</p>" +
    "<p><b>Printing Options:</b><br>" +
    "<b>School Print Shops:</b> Most schools have print shops that can print these front and back directly onto cardstock paper for free. Figure out how to contact the print shop, and go ask ASAP.</p>" +
    "<p><b>Manual Assembly:</b> If you don't have access to a print shop, watch this short tutorial to easily align and assemble the front and back sides yourself using nice paper:</p>" +
    "<p>" +
    '<a href="' +
    INSTRUCTION_VIDEO_URL +
    '" target="_blank" style="display:inline-block;text-decoration:none;">' +
    '<img src="' +
    VIDEO_THUMBNAIL_URL +
    '" width="480" style="max-width:100%;border-radius:12px;display:block;border:0;" alt="Watch how-to video" />' +
    '<span style="display:inline-block;margin-top:8px;padding:10px 16px;background:#EB89B5;color:#ffffff;border-radius:8px;font-weight:bold;">▶ Watch how-to video</span>' +
    "</a>" +
    "</p>" +
    "<p>Or create your own women's history themed bookmarks!</p>" +
    "<p><b>Step 2: Distribute to Your Community</b><br>" +
    "Once assembled, please donate the bookmarks to local:</p>" +
    "<ul><li>High schools &amp; middle schools</li><li>Public libraries</li><li>Local bookshops</li></ul>" +
    "<p><b>Step 3: Track &amp; Report Your Impact</b><br>" +
    "To receive credit for your service, keep track of:</p>" +
    "<ul><li>The total number of bookmarks printed and donated.</li><li>The number of institutions you visited.</li></ul>" +
    "<p>Once your donations are complete, submit your totals using this form:<br>" +
    link_(REPORT_FORM_URL) +
    "</p>" +
    "<p><b>Recognition &amp; Next Steps</b><br>" +
    "<b>Global Recognition:</b> Completing your donation and submitting the reporting form qualifies you for global recognition on our website and Instagram page!</p>" +
    "<p><b>Media Volunteers:</b> If you opted to take photos or film a reel for our Instagram, keep an eye on your inbox—a follow-up email with detailed guidelines will be sent shortly.</p>" +
    "<p><b>Timeline:</b> Please try to complete your distribution within the next 2–3 weeks.</p>" +
    "<p>Thank you again for bringing vital historical figures into local classrooms and communities! Feel free to reply directly to this email if you have any questions.</p>" +
    "<p>Best regards,<br>Amelie Fairweather<br>Founder &amp; President<br>HER Education Required<br>" +
    '<a href="https://hereducation.org">hereducation.org</a></p>';

  return { subject: subject, text: text, html: html };
}

function testSendEmail() {
  var TEST_EMAIL = "PASTE_YOUR_EMAIL_HERE@gmail.com";
  var TEST_NAME = "Test Volunteer";
  if (TEST_EMAIL.indexOf("PASTE_") === 0) {
    throw new Error("Edit TEST_EMAIL in testSendEmail() to your real email first.");
  }
  sendVolunteerEmail_(TEST_EMAIL, TEST_NAME);
  Logger.log("Test email sent to " + TEST_EMAIL + " as Hi " + TEST_NAME);
}

function syncLatestResponse() {
  onFormSubmit(null);
}

function collectAnswers_(e) {
  var named = {};
  if (e && e.namedValues) {
    var keys = Object.keys(e.namedValues);
    for (var i = 0; i < keys.length; i++) {
      var key = String(keys[i]).trim();
      var value = e.namedValues[keys[i]];
      named[key] = Array.isArray(value) ? value.join(", ") : String(value || "");
    }
  }
  if (e && e.values && e.values.length) {
    try {
      var sheet = getResponsesSheet_();
      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      for (var j = 0; j < headers.length; j++) {
        var header = String(headers[j] || "").trim();
        if (!header || header === SENT_HEADER) continue;
        if (!named[header]) {
          named[header] = e.values[j] != null ? String(e.values[j]) : "";
        }
      }
    } catch (err) {
      Logger.log("zip failed: " + err);
    }
  }
  return named;
}

function readSheetRow_(sheet, rowIndex) {
  var lastCol = sheet.getLastColumn();
  if (rowIndex < 2 || lastCol < 1) return {};
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var values = sheet.getRange(rowIndex, 1, rowIndex, lastCol).getValues()[0];
  var named = {};
  for (var i = 0; i < headers.length; i++) {
    var header = String(headers[i] || "").trim();
    if (!header || header === SENT_HEADER) continue;
    named[header] = values[i] != null ? String(values[i]) : "";
  }
  return named;
}

function getResponsesSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var n = sheets[i].getName().toLowerCase();
    if (n.indexOf("form responses") !== -1 || n.indexOf("responses") !== -1) {
      return sheets[i];
    }
  }
  return ss.getActiveSheet();
}

function ensureSentColumn_(sheet) {
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (findHeaderIndex_(headers, SENT_HEADER) >= 0) return;
  sheet.getRange(1, lastCol + 1).setValue(SENT_HEADER);
}

function markSent_(sheet, rowIndex, message) {
  ensureSentColumn_(sheet);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var col = findHeaderIndex_(headers, SENT_HEADER) + 1;
  sheet.getRange(rowIndex, col).setValue(message);
}

function findHeaderIndex_(headers, name) {
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i] || "").trim() === name) return i;
  }
  return -1;
}

function mergeAnswers_(base, overlay) {
  var out = {};
  var k;
  for (k in base) {
    if (base.hasOwnProperty(k)) out[k] = base[k];
  }
  for (k in overlay) {
    if (overlay.hasOwnProperty(k) && String(overlay[k] || "").trim()) {
      out[k] = overlay[k];
    }
  }
  return out;
}

function findEmail_(named) {
  var keys = Object.keys(named || {});
  var i;
  for (i = 0; i < keys.length; i++) {
    var lk = keys[i].toLowerCase();
    if (lk.indexOf("email") !== -1) {
      var fromCol = extractEmail_(named[keys[i]]);
      if (fromCol) return fromCol;
    }
  }
  for (i = 0; i < keys.length; i++) {
    var any = extractEmail_(named[keys[i]]);
    if (any) return any;
  }
  return "";
}

function extractEmail_(value) {
  var text = String(value || "").trim();
  var match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : "";
}

function pickName_(named) {
  var keys = Object.keys(named || {});
  for (var i = 0; i < keys.length; i++) {
    var lk = keys[i].toLowerCase();
    if (lk.indexOf("email") !== -1) continue;
    if (lk.indexOf("timestamp") !== -1) continue;
    if (lk.indexOf("name") !== -1 && String(named[keys[i]] || "").trim()) {
      return String(named[keys[i]]).trim();
    }
  }
  return "";
}

function esc_(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function link_(url) {
  return '<a href="' + url + '">' + esc_(url) + "</a>";
}
