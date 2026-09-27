import nodemailer from 'nodemailer';
import { config } from '@/config/env';

const buildTransport = () =>
  nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_PORT === 465,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

interface ContactNotificationPayload {
  name: string;
  email: string;
  message: string;
}

/** Notifies the owner inbox about a new contact form submission. */
const sendContactNotification = async ({ name, email, message }: ContactNotificationPayload) => {
  const transporter = buildTransport();

  const html = `
    <h2>New contact submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-line;">${escapeHtml(message)}</p>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.SMTP_USER}>`,
    to: config.CONTACT_NOTIFY_EMAIL,
    replyTo: email,
    subject: `New message from ${name} (portfolio contact form)`,
    html,
  });
};

export const emailService = {
  sendContactNotification,
};
