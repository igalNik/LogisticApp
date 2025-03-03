const nodeMailer = require('nodemailer');

/**
 * Sends an email using Nodemailer.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject line.
 * @param {string} html - Email subject line.
 * @param {string} text - Plain text email body (fallback).
 * @returns {Promise<void>} - Resolves when email is sent.
 */
async function sendEmail(to, subject, html, text) {
  // 1. Create transporter (e.g., Gmail, adjust for your service)
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOPtions = {
    to,
    subject,
    html,
    text,
  };

  //   3. Send email
  await transporter.sendMail(mailOPtions);
}

module.exports = { sendEmail };
