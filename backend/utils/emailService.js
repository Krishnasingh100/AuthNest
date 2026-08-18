```javascript
/*
import dotenv from 'dotenv'
import { Resend } from 'resend'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)


// ==================== VERIFICATION EMAIL ====================

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email/${token}`

  const { data, error } = await resend.emails.send({
    from: 'AuthNest <onboarding@resend.dev>',
    to: email,
    subject: 'Verify your AuthNest email',

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 40px auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h2>Welcome to AuthNest 👋</h2>

        <p>Thanks for creating an account.</p>

        <p>
          Please verify your email address by clicking the button below:
        </p>

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

        <p style="margin-top: 20px;">
          This verification link will expire in 15 minutes.
        </p>

        <p>
          If you didn't create this account, you can safely ignore this email.
        </p>

      </div>
    `
  })

  if (error) {
    console.error('Verification email error:', error)
    throw new Error(error.message)
  }

  return data
}


// ==================== PASSWORD RESET EMAIL ====================

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl =
    `${process.env.CLIENT_URL}/reset-password/${token}`

  const { data, error } = await resend.emails.send({
    from: 'AuthNest <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your AuthNest password',

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 40px auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h2>Reset your AuthNest password 🔐</h2>

        <p>
          We received a request to reset your AuthNest password.
        </p>

        <p>
          Click the button below to create a new password:
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top: 20px;">
          This password reset link will expire in 15 minutes.
        </p>

        <p>
          If you didn't request a password reset, you can safely ignore this email.
        </p>

      </div>
    `
  })

  if (error) {
    console.error('Password reset email error:', error)
    throw new Error(error.message)
  }

  return data
}
*/
```
