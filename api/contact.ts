// Vercel serverless function (Node runtime). Not part of the Vite/tsc build
// (tsconfig.app.json only includes src/), so it's compiled independently by
// Vercel when this project deploys.
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const { name, email, subject, message } = req.body ?? {}

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Contact form submitted but RESEND_API_KEY is not configured.')
    res.status(500).json({ error: 'The contact form isn’t fully set up yet — please email us directly instead.' })
    return
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      // Sends from Resend's shared test address until linkglobalnetwork.ca
      // is verified as a sending domain in the Resend dashboard.
      body: JSON.stringify({
        from: 'LinkGlobal Network <onboarding@resend.dev>',
        to: ['info@linkglobalnetwork.ca'],
        reply_to: email,
        subject: `[Contact Form] ${subject || 'General Inquiry'} — ${name}`,
        text: `From: ${name} <${email}>\nTopic: ${subject || 'General Inquiry'}\n\n${message}`,
      }),
    })

    if (!resendRes.ok) {
      const detail = await resendRes.text()
      console.error('Resend API error:', detail)
      res.status(502).json({ error: 'Failed to send your message. Please try again.' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
