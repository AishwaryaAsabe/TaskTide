import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendPasswordResetEmail(userEmail, token) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const subject = 'Password Reset Request';
  const text = `Click here to reset your password: ${resetLink}`;

  await sendEmail(userEmail, subject, text);
}
