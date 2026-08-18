import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email/${token}`

  await transporter.sendMail({
    from: `"AuthNest" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your AuthNest email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Welcome to AuthNest</h2>

        <p>Thanks for creating an account.</p>

        <p>Please verify your email address by clicking the button below:</p>

        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Verify Email
        </a>

        <p>This verification link will expire in 15 minutes.</p>

        <p>If you didn't create this account, you can safely ignore this email.</p>
      </div>
    `,
  })
}