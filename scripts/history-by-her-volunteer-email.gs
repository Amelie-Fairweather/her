/**
 * History by HER — volunteer form auto-email (LEGACY / Google Form only)
 *
 * NEW SIGNUPS via hereducation.org use Resend (no Gmail quota):
 *   POST /api/history-by-her → Google Form + Resend materials email
 *   POST /api/history-by-her/send-materials → manual catch-up (secret auth)
 *
 * Keep this script ONLY for people who submit the Google Form directly
 * (not through the website). Prefer turning triggers OFF once Resend is live
 * so you do not double-email website signups.
 *
 * SETUP (optional legacy path):
 * 1. Open the responses sheet while logged into hereducationrequired@gmail.com
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Select installTrigger → Run → Allow permissions
 *
 * QUOTA NOTE (consumer Gmail ≈ 100 emails/day) — this is why we moved to Resend.
 *
 * Debug: Executions → Logs. Look for "OK sent to ..."
 */

var MATERIALS_FOLDER_URL =
  "https://drive.google.com/drive/folders/1I4gZfUv7RynkU6_Kj4deNGZFb0OAZYHM?usp=sharing";
var INSTRUCTION_VIDEO_URL =
  "https://drive.google.com/file/d/1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k/view?usp=sharing";

// Optional: upload a thumbnail image to Drive, share “Anyone with link”, then use its direct image URL
var VIDEO_THUMBNAIL_URL =
  "https://drive.google.com/thumbnail?id=1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k&sz=w1000";
var REPORT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeGaCWsgfY18pGDFB5NTpB9MU4LzgZPUZ7kQxBTYozZW_eKEw/viewform";
/** Keep this close to the real Gmail display name (mismatched From = spam). */
var FROM_NAME = "Amelie Fairweather";
var HER_EMAIL = "hereducationrequired@gmail.com";
var SENT_HEADER = "Auto email sent";

/**
 * Catch-up limits so a backlog cannot burn the whole daily Gmail quota overnight.
 * Free Gmail Apps Script ≈ 100 emails/day total (shared across ALL scripts on the account).
 */
var MAX_CATCHUP_PER_RUN = 10; // backup job sends at most this many per run
var MIN_QUOTA_RESERVE = 25; // stop catch-up when quota drops to this (save room for new signups)

/**
 * Run ONCE. Installs:
 * 1) On form submit → email immediately
 * 2) Every 5 minutes → catch anyone the submit trigger missed
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

  Logger.log(
    "Installed: onFormSubmit (instant) + processUnsentResponses (every 6 hours). Automatic email is ON.",
  );
  Logger.log("Mail quota remaining today: " + MailApp.getRemainingDailyQuota());
}

/** Instant path — fires automatically on each form submission. */
function onFormSubmit(e) {
  try {
    var left = MailApp.getRemainingDailyQuota();
    Logger.log("onFormSubmit quota remaining = " + left);
    if (left <= 0) {
      Logger.log(
        "FAIL: daily email quota exhausted — cannot send now. " +
          "Backup trigger will retry after ~midnight Pacific.",
      );
      return;
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
    // Do not leave permanent FAIL for transient errors — backup trigger will retry.
    throw err;
  }
}

/** Backup path — runs every 6 hours after installTrigger (re-run installTrigger to update). */
function processUnsentResponses() {
  var left = MailApp.getRemainingDailyQuota();
  Logger.log("Backup trigger: mail quota remaining = " + left);
  if (left <= MIN_QUOTA_RESERVE) {
    Logger.log(
      "SKIP backup: quota " +
        left +
        " <= reserve " +
        MIN_QUOTA_RESERVE +
        ". Saving sends for new live signups. Catch-up resumes when quota is higher (after midnight Pacific).",
    );
    return;
  }
  resendAllMissing();
}

/**
 * Email responses missing "YES" in Auto email sent — max MAX_CATCHUP_PER_RUN per run.
 * Stops early to protect daily quota for new volunteers.
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
    var left = MailApp.getRemainingDailyQuota();
    if (left <= MIN_QUOTA_RESERVE) {
      Logger.log(
        "STOPPED early at row " +
          row +
          ": quota " +
          left +
          " hit reserve " +
          MIN_QUOTA_RESERVE +
          ".",
      );
      break;
    }
    if (sent >= MAX_CATCHUP_PER_RUN) {
      Logger.log(
        "STOPPED early at row " +
          row +
          ": hit MAX_CATCHUP_PER_RUN (" +
          MAX_CATCHUP_PER_RUN +
          "). Run again later or tomorrow for more of the backlog.",
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
      Utilities.sleep(800);
    } catch (err) {
      failed++;
      Logger.log("Row " + row + " FAIL: " + err);
      var msg = String(err);
      if (
        msg.indexOf("too many times for one day") !== -1 ||
        msg.toLowerCase().indexOf("quota") !== -1
      ) {
        Logger.log("Quota hit — stopping further sends today.");
        break;
      }
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

/**
 * Manually email ONE sheet row.
 * Rows after ~50 are still missing — set ROW to the person you need (e.g. 51, 63).
 * Edit ROW, then Run → emailOneRow
 */
function emailOneRow() {
  var ROW = 51; // ← next unsent after row 50; change as needed (Sophie was 63)
  var left = MailApp.getRemainingDailyQuota();
  Logger.log("Mail quota remaining: " + left);
  if (left <= 0) {
    throw new Error(
      "No email quota left today. Wait until ~midnight Pacific, then run emailOneRow again. " +
        "Or email that person manually from Gmail right now.",
    );
  }
  var sheet = getResponsesSheet_();
  ensureSentColumn_(sheet);
  emailRow_(sheet, ROW, null);
}

/** Check how many emails you can still send today. Run this anytime. */
function checkMailQuota() {
  var left = MailApp.getRemainingDailyQuota();
  Logger.log("Mail quota remaining today: " + left);
  if (left <= 0) {
    Logger.log("Quota exhausted. Auto-email resumes after ~midnight Pacific.");
  }
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

  sendVolunteerEmail_(email, name || "Volunteer");
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

function sendVolunteerEmail_(email, greetingName) {
  if (MailApp.getRemainingDailyQuota() <= 0) {
    throw new Error("Service invoked too many times for one day: email.");
  }

  var videoLine =
    INSTRUCTION_VIDEO_URL && INSTRUCTION_VIDEO_URL.indexOf("http") === 0
      ? INSTRUCTION_VIDEO_URL
      : "[Tutorial video link coming soon]";

  var subject = "Your History by HER materials";

  var body =
    "Hi " +
    greetingName +
    ",\n\n" +
    "Thank you so much for volunteering for History by HER, HER Education Required's global initiative aimed at improving how women's history is taught!\n\n" +
    "Step 1: Access Your Print Files\n" +
    "This is designed to be a no-cost initiative for you. Access the ready to print bookmarks here:\n" +
    MATERIALS_FOLDER_URL +
    "\n\n" +
    "Printing Options:\n" +
    "School Print Shops: Most schools have print shops that can print these front and back directly onto cardstock paper for free. Figure out how to contact the print shop, and go ask ASAP.\n\n" +
    "Manual Assembly: If you don't have access to a print shop, watch this short tutorial to easily align and assemble the front and back sides yourself using nice paper:\n" +
    videoLine +
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
    "Timeline: Please try to complete your distribution within the next 2-3 weeks.\n\n" +
    "Thank you again for bringing vital historical figures into local classrooms and communities! Feel free to reply directly to this email if you have any questions.\n\n" +
    "Best regards,\n" +
    "Amelie Fairweather\n" +
    "Founder & President\n" +
    "HER Education Required\n" +
    "hereducation.org";

  var htmlBody =
    "<p>Hi " +
    esc_(greetingName) +
    ",</p>" +
    "<p>Thank you so much for volunteering for History by HER, HER Education Required's global initiative aimed at improving how women's history is taught!</p>" +
    "<p><b>Step 1: Access Your Print Files</b><br>" +
    "This is designed to be a no-cost initiative for you. Access the ready to print bookmarks here:<br>" +
    link_(MATERIALS_FOLDER_URL) +
    "</p>" +
    "<p><b>Printing Options:</b><br>" +
    "<b>School Print Shops:</b> Most schools have print shops that can print these front and back directly onto cardstock paper for free. Figure out how to contact the print shop, and go ask ASAP.</p>" +
    "<p><b>Manual Assembly:</b> If you don't have access to a print shop, watch this short tutorial to easily align and assemble the front and back sides yourself using nice paper:</p>" +
    (INSTRUCTION_VIDEO_URL && INSTRUCTION_VIDEO_URL.indexOf("http") === 0
      ? "<p>" +
        '<a href="' +
        INSTRUCTION_VIDEO_URL +
        '" target="_blank" style="display:inline-block;text-decoration:none;">' +
        '<img src="https://drive.google.com/thumbnail?id=1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k&sz=w1000" width="480" style="max-width:100%;border-radius:12px;display:block;" alt="Watch how-to video" />' +
        '<span style="display:inline-block;margin-top:8px;padding:10px 16px;background:#EB89B5;color:#ffffff;border-radius:8px;font-weight:bold;">▶ Watch how-to video</span>' +
        "</a>" +
        "</p>"
      : "<p>" + esc_(videoLine) + "</p>") +
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

  // GmailApp uses normal Gmail sending (better inbox placement than MailApp).
  // Must be authorized as hereducationrequired@gmail.com — see SETUP above.
  var options = {
    name: FROM_NAME,
    htmlBody: htmlBody,
  };

  var sender = "";
  try {
    sender = String(Session.getActiveUser().getEmail() || "").toLowerCase();
  } catch (err) {
    sender = "";
  }
  // Only add Reply-To when the script is NOT already sending from HER_EMAIL
  // (From school + Reply-To elsewhere is a common spam trigger).
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
  // Do NOT BCC HER_EMAIL — Gmail counts BCC toward the daily quota (2x usage).

  GmailApp.sendEmail(email, subject, body, options);
}

function testSendEmail() {
  var TEST_EMAIL = "PASTE_YOUR_EMAIL_HERE@gmail.com";
  if (TEST_EMAIL.indexOf("PASTE_") === 0) {
    throw new Error("Edit TEST_EMAIL in testSendEmail() to your real email first.");
  }
  sendVolunteerEmail_(TEST_EMAIL, "Volunteer");
  Logger.log("Test email sent to " + TEST_EMAIL);
  Logger.log("Mail quota remaining today: " + MailApp.getRemainingDailyQuota());
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

function readLatestSheetRow_() {
  var sheet = getResponsesSheet_();
  return readSheetRow_(sheet, sheet.getLastRow());
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
  // Prefer Google Forms "Email Address" / any email question
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
