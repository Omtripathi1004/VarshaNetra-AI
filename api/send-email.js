// api/send-email.js (Vercel Serverless Function & Standalone Endpoint)

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, X-User-Role, X-User-Email'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed. Use POST.' });
  }

  const { email, recipient, to, subject, message, alertType } = req.body || {};
  const targetEmail = (email || recipient || to || '').trim();

  if (!targetEmail) {
    return res.status(400).json({
      success: false,
      status: 'REJECTED',
      message: 'Recipient email address is required.',
    });
  }

  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailRegex.test(targetEmail)) {
    return res.status(400).json({
      success: false,
      status: 'REJECTED',
      message: `Malformed or invalid email address: '${targetEmail}'.`,
    });
  }

  const emailSubject = subject || `[VarshaNetra Alert] ${alertType || 'Agricultural Weather Alert'}`;
  const emailBody = message || 'VarshaNetra AI real-time agricultural alert.';

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.SMTP_EMAIL || process.env.GMAIL_ADDRESS || '';
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD || process.env.GMAIL_PASS || '';
  const smtpFrom = process.env.SMTP_FROM || process.env.EMAIL_FROM || smtpUser || 'noreply@varshanetra.gov.in';

  const resendKey = process.env.RESEND_API_KEY;
  const brevoKey = process.env.BREVO_API_KEY;

  // 1. Try Nodemailer / Gmail SMTP if credentials exist
  if (smtpUser && smtpPass) {
    try {
      let nodemailer;
      try {
        nodemailer = await import('nodemailer');
      } catch (importErr) {
        // Fallback to dynamic require if ESM import fails
        nodemailer = require('nodemailer');
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const info = await transporter.sendMail({
        from: `VarshaNetra AI <${smtpFrom}>`,
        to: targetEmail,
        subject: emailSubject,
        text: emailBody,
      });

      return res.status(200).json({
        success: true,
        status: 'ACCEPTED',
        provider: 'GMAIL_SMTP',
        provider_message_id: info.messageId || `smtp_${Date.now()}`,
        recipient: targetEmail,
        message: `Email accepted by Gmail SMTP server for ${targetEmail}`,
        smtp_host: smtpHost,
        smtp_port: smtpPort,
        timestamp: new Date().toISOString(),
      });
    } catch (smtpErr) {
      console.warn('Gmail SMTP error:', smtpErr.message);
      const isAuthError = smtpErr.responseCode === 535 || /auth|credential|login/i.test(smtpErr.message);
      return res.status(200).json({
        success: false,
        status: 'FAILED',
        provider: 'GMAIL_SMTP',
        error_code: isAuthError ? 'AUTH_FAILED' : 'SMTP_ERROR',
        message: isAuthError
          ? 'Gmail SMTP Authentication Failed (535): Please verify SMTP_USER and ensure SMTP_PASS is a 16-character App Password generated at myaccount.google.com/apppasswords.'
          : `SMTP dispatch failed: ${smtpErr.message}`,
        recipient: targetEmail,
        smtp_host: smtpHost,
        smtp_port: smtpPort,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // 2. Try Resend if configured
  if (resendKey) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'VarshaNetra AI <onboarding@resend.dev>',
          to: [targetEmail],
          subject: emailSubject,
          text: emailBody,
        }),
      });
      const data = await resendRes.json();
      if (resendRes.ok) {
        return res.status(200).json({
          success: true,
          status: 'ACCEPTED',
          provider: 'RESEND',
          provider_message_id: data.id,
          recipient: targetEmail,
          message: `Email accepted by Resend gateway for ${targetEmail}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Resend error:', err.message);
    }
  }

  // 3. Try Brevo if configured
  if (brevoKey) {
    try {
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'VarshaNetra AI', email: smtpFrom || 'alerts@varshanetra.ai' },
          to: [{ email: targetEmail }],
          subject: emailSubject,
          textContent: emailBody,
        }),
      });
      const data = await brevoRes.json();
      if (brevoRes.ok) {
        return res.status(200).json({
          success: true,
          status: 'ACCEPTED',
          provider: 'BREVO',
          provider_message_id: data.messageId,
          recipient: targetEmail,
          message: `Email accepted by Brevo gateway for ${targetEmail}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Brevo error:', err.message);
    }
  }

  // If no email provider is configured
  return res.status(200).json({
    success: false,
    status: 'CONFIGURATION_ERROR',
    provider: 'NONE',
    message: 'Gmail SMTP is not configured. Set SMTP_USER and SMTP_PASS (Gmail App Password) in environment variables.',
    recipient: targetEmail,
    timestamp: new Date().toISOString(),
  });
}
