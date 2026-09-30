/**
 * One-off live send test for History by HER materials email.
 *
 * Usage:
 *   RESEND_API_KEY=re_xxx node scripts/test-volunteer-email.mjs you@email.com "Your Name"
 *
 * Until hereducation.org is verified in Resend, use:
 *   RESEND_FROM_EMAIL="Amelie Fairweather <onboarding@resend.dev>"
 * and send only to the email on your Resend account.
 */
import { Resend } from 'resend'

const to = process.argv[2]
const name = process.argv[3] || 'Volunteer'
const apiKey = process.env.RESEND_API_KEY?.trim()
const from =
  process.env.RESEND_FROM_EMAIL?.trim() || 'Amelie Fairweather <onboarding@resend.dev>'
const replyTo = process.env.RESEND_REPLY_TO?.trim() || 'hereducationrequired@gmail.com'

if (!apiKey) {
  console.error('Missing RESEND_API_KEY')
  process.exit(1)
}
if (!to) {
  console.error('Usage: RESEND_API_KEY=re_xxx node scripts/test-volunteer-email.mjs you@email.com "Name"')
  process.exit(1)
}

const MATERIALS_FOLDER_URL =
  'https://drive.google.com/drive/folders/1I4gZfUv7RynkU6_Kj4deNGZFb0OAZYHM?usp=sharing'
const INSTRUCTION_VIDEO_URL =
  'https://drive.google.com/file/d/1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k/view?usp=sharing'
const VIDEO_THUMBNAIL_URL =
  'https://drive.google.com/thumbnail?id=1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k&sz=w1000'
const REPORT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeGaCWsgfY18pGDFB5NTpB9MU4LzgZPUZ7kQxBTYozZW_eKEw/viewform'

const subject = 'Your History by HER materials'
const text = `Hi ${name},

Thank you so much for volunteering for History by HER, HER Education Required's global initiative aimed at improving how women's history is taught!

Step 1: Access Your Print Files
${MATERIALS_FOLDER_URL}

Manual Assembly video:
${INSTRUCTION_VIDEO_URL}

Report form:
${REPORT_FORM_URL}

Best regards,
Amelie Fairweather
HER Education Required`

const html = `<p>Hi ${name},</p>
<p>Thank you so much for volunteering for History by HER.</p>
<p><b>Print files:</b><br><a href="${MATERIALS_FOLDER_URL}">${MATERIALS_FOLDER_URL}</a></p>
<p><a href="${INSTRUCTION_VIDEO_URL}" target="_blank">
  <img src="${VIDEO_THUMBNAIL_URL}" width="480" style="max-width:100%;border-radius:12px;display:block;" alt="Watch how-to video" />
  <span style="display:inline-block;margin-top:8px;padding:10px 16px;background:#EB89B5;color:#ffffff;border-radius:8px;font-weight:bold;">▶ Watch how-to video</span>
</a></p>
<p><b>Report form:</b><br><a href="${REPORT_FORM_URL}">${REPORT_FORM_URL}</a></p>
<p>Best regards,<br>Amelie Fairweather<br>HER Education Required</p>`

const resend = new Resend(apiKey)
const { data, error } = await resend.emails.send({
  from,
  to: [to],
  replyTo,
  subject: `[TEST] ${subject}`,
  text,
  html,
})

if (error) {
  console.error('SEND FAILED:', error)
  process.exit(1)
}

console.log('SEND OK')
console.log('id:', data?.id)
console.log('to:', to)
console.log('from:', from)
