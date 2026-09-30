import { Resend } from 'resend'

const MATERIALS_FOLDER_URL =
  'https://drive.google.com/drive/folders/1I4gZfUv7RynkU6_Kj4deNGZFb0OAZYHM?usp=sharing'
const INSTRUCTION_VIDEO_URL =
  'https://drive.google.com/file/d/1hFNHGvuRvsgU11hii3PRIJ74RUJ36Q3k/view'
const VIDEO_THUMBNAIL_URL = 'https://www.hereducation.org/history-by-her-howto.jpg'
const REPORT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeGaCWsgfY18pGDFB5NTpB9MU4LzgZPUZ7kQxBTYozZW_eKEw/viewform'

const SUBJECT = 'Your History by HER materials'
const DEFAULT_FROM = 'Amelie Fairweather <materials@hereducation.org>'
const DEFAULT_REPLY_TO = 'hereducationrequired@gmail.com'

function esc(text: string) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function link(url: string) {
  return `<a href="${url}" style="color:#1a73e8;text-decoration:underline;">${esc(url)}</a>`
}

export function buildVolunteerMaterialsEmail(greetingName: string) {
  const name = greetingName.trim() || 'Volunteer'

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
High schools & middle schools
Public libraries
Local bookshops

Step 3: Track & Report Your Impact
To receive credit for your service, keep track of:
The total number of bookmarks printed and donated.
The number of institutions you visited.
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

  // Table-based HTML so Gmail/Outlook don't drop sections or the video image.
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;">
  <tr>
    <td align="left" style="padding:24px 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222222;">
      <p style="margin:0 0 16px 0;">Hi ${esc(name)},</p>

      <p style="margin:0 0 16px 0;">Thank you so much for volunteering for History by HER, HER Education Required's global initiative aimed at improving how women's history is taught!</p>

      <p style="margin:0 0 8px 0;"><strong>Step 1: Access Your Print Files</strong><br>
      This is designed to be a no-cost initiative for you. Access the ready to print bookmarks here:<br>
      ${link(MATERIALS_FOLDER_URL)}</p>

      <p style="margin:16px 0 8px 0;"><strong>Printing Options:</strong><br>
      <strong>School Print Shops:</strong> Most schools have print shops that can print these front and back directly onto cardstock paper for free. Figure out how to contact the print shop, and go ask ASAP.</p>

      <p style="margin:0 0 12px 0;"><strong>Manual Assembly:</strong> If you don't have access to a print shop, watch this short tutorial to easily align and assemble the front and back sides yourself using nice paper:</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px 0;">
        <tr>
          <td>
            <a href="${INSTRUCTION_VIDEO_URL}" target="_blank" style="text-decoration:none;">
              <img src="${VIDEO_THUMBNAIL_URL}" width="480" alt="Watch how-to video" style="display:block;width:100%;max-width:480px;height:auto;border:0;border-radius:12px;" />
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding-top:8px;">
            <a href="${INSTRUCTION_VIDEO_URL}" target="_blank" style="display:inline-block;padding:10px 16px;background:#EB89B5;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">▶ Watch how-to video</a>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 16px 0;">Or create your own women's history themed bookmarks!</p>

      <p style="margin:0 0 8px 0;"><strong>Step 2: Distribute to Your Community</strong><br>
      Once assembled, please donate the bookmarks to local:</p>
      <p style="margin:0 0 16px 0;">
        High schools &amp; middle schools<br>
        Public libraries<br>
        Local bookshops
      </p>

      <p style="margin:0 0 8px 0;"><strong>Step 3: Track &amp; Report Your Impact</strong><br>
      To receive credit for your service, keep track of:</p>
      <p style="margin:0 0 8px 0;">
        The total number of bookmarks printed and donated.<br>
        The number of institutions you visited.
      </p>
      <p style="margin:0 0 16px 0;">Once your donations are complete, submit your totals using this form:<br>
      ${link(REPORT_FORM_URL)}</p>

      <p style="margin:0 0 8px 0;"><strong>Recognition &amp; Next Steps</strong><br>
      <strong>Global Recognition:</strong> Completing your donation and submitting the reporting form qualifies you for global recognition on our website and Instagram page!</p>

      <p style="margin:0 0 8px 0;"><strong>Media Volunteers:</strong> If you opted to take photos or film a reel for our Instagram, keep an eye on your inbox—a follow-up email with detailed guidelines will be sent shortly.</p>

      <p style="margin:0 0 16px 0;"><strong>Timeline:</strong> Please try to complete your distribution within the next 2–3 weeks.</p>

      <p style="margin:0 0 16px 0;">Thank you again for bringing vital historical figures into local classrooms and communities! Feel free to reply directly to this email if you have any questions.</p>

      <p style="margin:0;">Best regards,<br>
      Amelie Fairweather<br>
      Founder &amp; President<br>
      HER Education Required<br>
      <a href="https://hereducation.org" style="color:#1a73e8;text-decoration:underline;">hereducation.org</a></p>
    </td>
  </tr>
</table>
</body>
</html>`

  return { subject: SUBJECT, text, html }
}

export type SendVolunteerEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string; skipped?: boolean }

export async function sendVolunteerMaterialsEmail(opts: {
  to: string
  name: string
}): Promise<SendVolunteerEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY is not set', skipped: true }
  }

  const to = opts.to.trim()
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return { ok: false, error: 'Invalid recipient email' }
  }

  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM
  const replyTo = process.env.RESEND_REPLY_TO?.trim() || DEFAULT_REPLY_TO
  const { subject, text, html } = buildVolunteerMaterialsEmail(opts.name)

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo,
    subject,
    text,
    html,
  })

  if (error) {
    return { ok: false, error: error.message || 'Resend send failed' }
  }

  return { ok: true, id: data?.id || 'sent' }
}
