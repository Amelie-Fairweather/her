/**
 * History by HER — report form auto-email (thank you + certificate)
 *
 * SETUP (do once — then it runs automatically forever):
 * Works whether you open Apps Script from the Form OR the responses Sheet.
 *
 * 1. Logged into hereducationrequired@gmail.com
 * 2. Paste this whole file into Code.gs → Save
 * 3. Run authorizeServices → Allow all permissions
 * 4. Run installTrigger → should say Completed
 * 5. (Optional) Edit TEST_EMAIL in testSendEmail → Run to verify the attachment
 *
 * Debug: Executions → open the run → look for the red error line.
 */

/** Drive file ID for Certificate.png */
var CERTIFICATE_FILE_ID = "1bwWmfop6NSgruNydV523i_ajcTtIreDq";

/**
 * Optional override. Paste from:
 * https://docs.google.com/spreadsheets/d/THIS_PART/edit
 * Only needed if the form is not linked to a sheet.
 */
var SPREADSHEET_ID = "";

var FROM_NAME = "Amelie Fairweather";
var HER_EMAIL = "hereducationrequired@gmail.com";
var SITE_URL = "https://hereducation.org";
var SENT_HEADER = "Auto email sent";

/**
 * Run this FIRST (once) to grant Gmail + Drive + Sheets + Forms permissions.
 * Then run installTrigger.
 */
function authorizeServices() {
  if (!CERTIFICATE_FILE_ID) {
    throw new Error("CERTIFICATE_FILE_ID is empty.");
  }
  DriveApp.getFileById(CERTIFICATE_FILE_ID).getName();
  MailApp.getRemainingDailyQuota();
  GmailApp.getAliases();

  try {
    var form = FormApp.getActiveForm();
    if (form) Logger.log("Bound to form: " + form.getTitle());
  } catch (err) {
    Logger.log("Not form-bound (ok if opened from Sheet).");
  }

  var ss = getSpreadsheet_();
  Logger.log("Authorized OK. Spreadsheet: " + ss.getName() + " (" + ss.getId() + ")");
  Logger.log("Certificate file found. Next: run installTrigger.");
}

/**
 * Run ONCE after authorizeServices. Installs:
 * 1) On form submit → email immediately
 * 2) Every 5 minutes → catch anyone the submit trigger missed
 */
function installTrigger() {
  if (!CERTIFICATE_FILE_ID) {
    throw new Error(
      "Set CERTIFICATE_FILE_ID first (Drive file ID for the certificate PNG).",
    );
  }

  var form = getActiveFormSafe_();
  var ss = getSpreadsheet_();
  var ssId = ss.getId();

  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (fn === "onFormSubmit" || fn === "processUnsentResponses") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  if (form) {
    ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
    Logger.log("Installed form submit trigger on: " + form.getTitle());
  } else {
    ScriptApp.newTrigger("onFormSubmit").forSpreadsheet(ssId).onFormSubmit().create();
    Logger.log("Installed spreadsheet submit trigger on: " + ss.getName());
  }

  ScriptApp.newTrigger("processUnsentResponses")
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log(
    "Backup trigger installed (every 5 min). Spreadsheet: " +
      ss.getName() +
      " (" +
      ssId +
      "). Automatic email is ON.",
  );
}

function getActiveFormSafe_() {
  try {
    return FormApp.getActiveForm();
  } catch (err) {
    return null;
  }
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) return ss;

  // Script was opened from the Form — use the linked responses destination
  var form = getActiveFormSafe_();
  if (form) {
    var destId = form.getDestinationId();
    if (destId) {
      return SpreadsheetApp.openById(destId);
    }
    throw new Error(
      "This form is not linked to a responses spreadsheet. " +
        "In the Form: Responses → link/create a Sheets file, then re-run installTrigger.",
    );
  }

  throw new Error(
    "No spreadsheet found. Either:\n" +
      "• Open Apps Script from the responses Sheet (Extensions → Apps Script), or\n" +
      "• Paste the sheet ID into SPREADSHEET_ID at the top of this file.",
  );
}

/** Instant path — fires automatically on each report form submission. */
function onFormSubmit(e) {
  try {
    // Form→Sheet sync can lag a second on form-bound triggers
    if (e && e.response && !e.range) {
      Utilities.sleep(1500);
    }

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

/** Backup path — runs every 5 minutes automatically after installTrigger. */
function processUnsentResponses() {
  resendAllMissing();
}

/**
 * Email every response that does not already have "YES" in Auto email sent.
 * Used by the 5-minute backup trigger; you can also Run it once for catch-up.
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

  Logger.log(
    "Done. sent=" +
      sent +
      " skipped=" +
      skipped +
      " failed=" +
      failed +
      " quotaLeft=" +
      MailApp.getRemainingDailyQuota(),
  );
}

/** Send one row. event e is optional (form submit has richer namedValues). */
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

  sendReportThankYouEmail_(email, name || "Volunteer");
  markSent_(sheet, rowIndex, "YES " + new Date().toISOString() + " → " + email);
  Logger.log("OK sent to " + email + " (row " + rowIndex + ")");
  Logger.log("Mail quota remaining today: " + MailApp.getRemainingDailyQuota());
}

function alreadySent_(sheet, rowIndex) {
  ensureSentColumn_(sheet);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var col = findHeaderIndex_(headers, SENT_HEADER) + 1;
  var status = String(sheet.getRange(rowIndex, col).getValue() || "");
  return status.indexOf("YES") === 0;
}

function getCertificateBlob_() {
  if (!CERTIFICATE_FILE_ID) {
    throw new Error(
      "CERTIFICATE_FILE_ID is empty. Upload the certificate to Drive and paste its file ID.",
    );
  }
  var file = DriveApp.getFileById(CERTIFICATE_FILE_ID);
  return file.getBlob().setName("History-by-HER-Certificate-of-Achievement.png");
}

function certificateDownloadUrl_() {
  return "https://drive.google.com/uc?export=download&id=" + CERTIFICATE_FILE_ID;
}

function sendReportThankYouEmail_(email, greetingName) {
  var certBlob = getCertificateBlob_();
  var downloadUrl = certificateDownloadUrl_();

  var subject = "Thank you for volunteering — your History by HER certificate";

  var body =
    "Hi " +
    greetingName +
    ",\n\n" +
    "Thank you so much for volunteering with History by HER and completing your donation report!\n\n" +
    "Your Certificate of Achievement is attached to this email — download it and keep it as recognition of your impact bringing women's history into public education.\n\n" +
    "You can also download it here:\n" +
    downloadUrl +
    "\n\n" +
    "Completing this report also qualifies you for recognition on our website and Instagram (@hereducationrequired).\n\n" +
    "With gratitude,\n" +
    "Amelie Fairweather\n" +
    "Founder & President\n" +
    "HER Education Required\n" +
    SITE_URL;

  var htmlBody =
    "<p>Hi " +
    esc_(greetingName) +
    ",</p>" +
    "<p>Thank you so much for volunteering with <b>History by HER</b> and completing your donation report!</p>" +
    "<p>Your <b>Certificate of Achievement</b> is attached to this email — download it and keep it as recognition of your impact bringing women&apos;s history into public education.</p>" +
    "<p>" +
    '<a href="' +
    downloadUrl +
    '" style="display:inline-block;background:#EB89B5;color:#ffffff;font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:10px;">' +
    "Download your certificate" +
    "</a>" +
    "</p>" +
    "<p style=\"font-size:13px;color:#555;\">If the button doesn&apos;t work, use this link:<br>" +
    link_(downloadUrl) +
    "</p>" +
    "<p>Completing this report also qualifies you for recognition on our website and Instagram (@hereducationrequired).</p>" +
    "<p>With gratitude,<br>Amelie Fairweather<br>Founder &amp; President<br>HER Education Required<br>" +
    '<a href="' +
    SITE_URL +
    '">' +
    esc_(SITE_URL.replace(/^https?:\/\//, "")) +
    "</a></p>";

  var options = {
    name: FROM_NAME,
    htmlBody: htmlBody,
    attachments: [certBlob],
  };

  var sender = "";
  try {
    sender = String(Session.getActiveUser().getEmail() || "").toLowerCase();
  } catch (err) {
    sender = "";
  }
  if (sender && sender !== HER_EMAIL.toLowerCase()) {
    options.replyTo = HER_EMAIL;
    Logger.log(
      "WARNING: sending as " +
        sender +
        ". Re-run installTrigger while logged into " +
        HER_EMAIL +
        " to reduce spam.",
    );
  }
  if (HER_EMAIL && email.toLowerCase() !== HER_EMAIL.toLowerCase()) {
    options.bcc = HER_EMAIL;
  }

  GmailApp.sendEmail(email, subject, body, options);
}

function testSendEmail() {
  var TEST_EMAIL = "PASTE_YOUR_EMAIL_HERE@gmail.com";
  if (TEST_EMAIL.indexOf("PASTE_") === 0) {
    throw new Error("Edit TEST_EMAIL in testSendEmail() to your real email first.");
  }
  sendReportThankYouEmail_(TEST_EMAIL, "Volunteer");
  Logger.log("Test email sent to " + TEST_EMAIL);
  Logger.log("Mail quota remaining today: " + MailApp.getRemainingDailyQuota());
}

function syncLatestResponse() {
  onFormSubmit(null);
}

function collectAnswers_(e) {
  var named = {};

  // Form-bound trigger uses e.response
  if (e && e.response) {
    try {
      var itemResponses = e.response.getItemResponses();
      for (var r = 0; r < itemResponses.length; r++) {
        var title = String(itemResponses[r].getItem().getTitle() || "").trim();
        var response = itemResponses[r].getResponse();
        named[title] = Array.isArray(response)
          ? response.join(", ")
          : String(response || "");
      }
      var respondentEmail = e.response.getRespondentEmail();
      if (respondentEmail) named["Email Address"] = respondentEmail;
    } catch (err) {
      Logger.log("form response parse failed: " + err);
    }
    return named;
  }

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
    } catch (err2) {
      Logger.log("zip failed: " + err2);
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
  var ss = getSpreadsheet_();
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

/**
 * Public JSON feed for the website.
 * Deploy: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Then paste the Web app URL into Vercel as HISTORY_BY_HER_STATS_URL
 *
 * Returns: { bookmarks, educationalInstitutions, responses, updatedAt }
 */
function doGet() {
  var totals = computeImpactTotals_();
  return ContentService.createTextOutput(JSON.stringify(totals)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/** Run manually to preview totals in Logs. */
function testImpactTotals() {
  Logger.log(JSON.stringify(computeImpactTotals_(), null, 2));
}

function computeImpactTotals_() {
  var sheet = getResponsesSheet_();
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  var bookmarks = 0;
  var places = 0;
  var responses = 0;

  if (lastRow < 2 || lastCol < 1) {
    return {
      bookmarks: 0,
      educationalInstitutions: 0,
      responses: 0,
      updatedAt: new Date().toISOString(),
    };
  }

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var bookmarkCol = findColumnByKeywords_(headers, ["bookmark"]);
  var placesCol = findColumnByKeywords_(headers, ["places you donated", "number of places", "places"]);

  var values = sheet.getRange(2, 1, lastRow, lastCol).getValues();
  for (var r = 0; r < values.length; r++) {
    var row = values[r];
    var hasAny = false;
    for (var c = 0; c < row.length; c++) {
      if (String(row[c] || "").trim()) {
        hasAny = true;
        break;
      }
    }
    if (!hasAny) continue;
    responses++;

    if (bookmarkCol >= 0) bookmarks += parseNumber_(row[bookmarkCol]);
    if (placesCol >= 0) places += parseNumber_(row[placesCol]);
  }

  return {
    bookmarks: bookmarks,
    educationalInstitutions: places,
    responses: responses,
    updatedAt: new Date().toISOString(),
  };
}

function findColumnByKeywords_(headers, keywords) {
  var i;
  var k;
  // Prefer the most specific keyword match first
  for (k = 0; k < keywords.length; k++) {
    var needle = String(keywords[k]).toLowerCase();
    for (i = 0; i < headers.length; i++) {
      var h = String(headers[i] || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      if (h.indexOf(needle) !== -1) return i;
    }
  }
  return -1;
}

function parseNumber_(value) {
  if (typeof value === "number" && isFinite(value)) return Math.max(0, Math.round(value));
  var text = String(value || "").replace(/,/g, "");
  var match = text.match(/-?\d+(\.\d+)?/);
  if (!match) return 0;
  var n = parseFloat(match[0]);
  return isFinite(n) ? Math.max(0, Math.round(n)) : 0;
}
