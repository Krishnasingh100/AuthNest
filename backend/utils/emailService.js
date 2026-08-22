import { Resend } from 'resend'

const frontendUrl = () => process.env.CLIENT_URL

const sendEmail = async ({ to, subject, link }) => {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    throw new Error('RESEND_API_KEY and RESEND_FROM_EMAIL are required to send email')
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject,
    html: `<p>${subject}</p><p><a href="${link}">${link}</a></p>`
  })

  if (error) throw new Error('Email delivery provider rejected the request')

  return link
}

export const sendVerificationEmail = (email, token) => sendEmail({ to: email, subject: 'Verify your AuthNest email address', link: `${frontendUrl()}/verify-email/${token}` })
export const sendPasswordResetEmail = (email, token) => sendEmail({ to: email, subject: 'Reset your AuthNest password', link: `${frontendUrl()}/reset-password/${token}` })
