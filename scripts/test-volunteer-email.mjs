/**
 * One-off live send test for History by HER materials email.
 *
 * Usage:
 *   RESEND_API_KEY=re_xxx node scripts/test-volunteer-email.mjs you@email.com "Your Name"
 */
import { Resend } from 'resend'
import { createRequire } from 'module'
import { pathToFileURL } from 'url'
import { register } from 'node:module'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const to = process.argv[2]
const name = process.argv[3] || 'Volunteer'
const apiKey = process.env.RESEND_API_KEY?.trim()
const from =
  process.env.RESEND_FROM_EMAIL?.trim() || 'Amelie Fairweather <materials@hereducation.org>'
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

function esc(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function link(url) {
  return `<a href="${url}">${esc(url)}</a>`
}

const subject = 'Your History by HER materials'
const text = `Hi ${name},

Thank you so much for volunteering for History by HER, HER Education Required's global initiative aimed at improving how women's history is taught!

Step 1: Access Your Print Files
This is designed to be a no-cost initiative for you. Access the ready to print bookmarks here:
${MATERIALS_FOLDER_URL}

Printing Options:
School Print Shops: Most schools have print shops that can print these front and back directly onto cardstock paper for free. Figure out how to contact the print shop, and go ask ASAP.

Manual Assembly: If you don't have access to a print shop, watch this short tutorial to easily align and assemble the front and back sides yourself using nice paper:
${INSTRUCTION_VIDEO_URL}

Or create your own women's history themed bookmarks!

Step 2: Distribute to Your Community
Once assembled, please donate the bookmarks to local:
- High schools & middle schools
- Public libraries
- Local bookshops

Step 3: Track & Report Your Impact
To receive credit for your service, keep track of:
- The total number of bookmarks printed and donated.
- The number of institutions you visited.

Once your donations are complete, submit your totals using this form:
${REPORT_FORM_URL}

Recognition & Next Steps
Global Recognition: Completing your donation and submitting the reporting form qualifies you for global recognition on our website and Instagram page!

Media Volunteers: If you opted to take photos or film a reel for our Instagram, keep an eye on your inbox—a follow-up email with detailed guidelines will be sent shortly.

Timeline: Please try to complete your distribution within the next 2–3 weeks.

Thank you again for bringing vital historical figures into local classrooms and communities! Feel free to reply directly to this email if you have any questions.

Best regards,
Amelie Fairweather
Founder & President
HER Education Required
hereducation.org`

const html = `
<p>Hi ${esc(name)},</p>
<p>Thank you so much for volunteering for History by HER, HER Education Required's global initiative aimed at improving how women's history is taught!</p>
<p><b>Step 1: Access Your Print Files</b><br>
This is designed to be a no-cost initiative for you. Access the ready to print bookmarks here:<br>
${link(MATERIALS_FOLDER_URL)}</p>
<p><b>Printing Options:</b><br>
<b>School Print Shops:</b> Most schools have print shops that can print these front and back directly onto cardstock paper for free. Figure out how to contact the print shop, and go ask ASAP.</p>
<p><b>Manual Assembly:</b> If you don't have access to a print shop, watch this short tutorial to easily align and assemble the front and back sides yourself using nice paper:</p>
<p>
  <a href="${INSTRUCTION_VIDEO_URL}" target="_blank" style="display:inline-block;text-decoration:none;">
    <img src="${VIDEO_THUMBNAIL_URL}" width="480" style="max-width:100%;border-radius:12px;display:block;border:0;" alt="Watch how-to video" />
    <span style="display:inline-block;margin-top:8px;padding:10px 16px;background:#EB89B5;color:#ffffff;border-radius:8px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">▶ Watch how-to video</span>
  </a>
</p>
<p>Or create your own women's history themed bookmarks!</p>
<p><b>Step 2: Distribute to Your Community</b><br>
Once assembled, please donate the bookmarks to local:</p>
<ul><li>High schools &amp; middle schools</li><li>Public libraries</li><li>Local bookshops</li></ul>
<p><b>Step 3: Track &amp; Report Your Impact</b><br>
To receive credit for your service, keep track of:</p>
<ul><li>The total number of bookmarks printed and donated.</li><li>The number of institutions you visited.</li></ul>
<p>Once your donations are complete, submit your totals using this form:<br>
${link(REPORT_FORM_URL)}</p>
<p><b>Recognition &amp; Next Steps</b><br>
<b>Global Recognition:</b> Completing your donation and submitting the reporting form qualifies you for global recognition on our website and Instagram page!</p>
<p><b>Media Volunteers:</b> If you opted to take photos or film a reel for our Instagram, keep an eye on your inbox—a follow-up email with detailed guidelines will be sent shortly.</p>
<p><b>Timeline:</b> Please try to complete your distribution within the next 2–3 weeks.</p>
<p>Thank you again for bringing vital historical figures into local classrooms and communities! Feel free to reply directly to this email if you have any questions.</p>
<p>Best regards,<br>Amelie Fairweather<br>Founder &amp; President<br>HER Education Required<br>
<a href="https://hereducation.org">hereducation.org</a></p>
`.trim()

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
