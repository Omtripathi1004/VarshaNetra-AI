// api/send-sms.js (Vercel Serverless Function & Standalone Endpoint)

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, X-User-Role'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed. Use POST.' });
  }

  const { phoneNumber, location, alertType, message } = req.body || {};

  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      status: 'REJECTED',
      message: 'Recipient phone number is required.',
    });
  }

  // Clean phone number (strip whitespace, dashes, parentheses, dots)
  const cleaned = String(phoneNumber).replace(/[\s\-().]/g, '');

  if (!/^\+?[1-9]\d{9,14}$/.test(cleaned)) {
    return res.status(400).json({
      success: false,
      status: 'REJECTED',
      message: 'Invalid phone number format. Please provide a valid 10-digit mobile or international E.164 number (+91XXXXXXXXXX).',
    });
  }

  // Format to E.164
  let sanitizedPhone = cleaned;
  if (!sanitizedPhone.startsWith('+')) {
    sanitizedPhone = sanitizedPhone.length === 10 ? `+91${sanitizedPhone}` : `+${sanitizedPhone}`;
  }

  const alertMsg = message || `[VarshaNetra Alert] ${alertType || 'Heavy Rainfall Warning'} registered for ${location || 'your agricultural sector'}. Take safety precautions and check drainage.`;

  const twilioSid = process.env.TWILIO_SID || process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_TOKEN || process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_FROM || process.env.TWILIO_PHONE_NUMBER;
  const fast2smsKey = process.env.FAST2SMS_API_KEY || process.env.SMS_API_KEY;

  // 1. Try Twilio if configured
  if (twilioSid && twilioToken && twilioFrom) {
    try {
      const basicAuth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
      const params = new URLSearchParams();
      params.append('To', sanitizedPhone);
      params.append('From', twilioFrom);
      params.append('Body', alertMsg);

      const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const twilioData = await twilioRes.json();
      if (twilioRes.ok) {
        return res.status(200).json({
          success: true,
          status: 'ACCEPTED',
          provider: 'TWILIO',
          provider_message_id: twilioData.sid,
          to: sanitizedPhone,
          message: `SMS accepted by Twilio gateway (SID: ${twilioData.sid})`,
          timestamp: new Date().toISOString(),
          data: twilioData,
        });
      } else {
        return res.status(200).json({
          success: false,
          status: 'FAILED',
          provider: 'TWILIO',
          error_code: twilioData.code || 'TWILIO_ERROR',
          message: twilioData.message || 'Twilio rejected the SMS request.',
          to: sanitizedPhone,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Twilio dispatch error:', err.message);
    }
  }

  // 2. Try Fast2SMS if configured
  if (fast2smsKey) {
    const phoneForFast2Sms = sanitizedPhone.replace(/^\+91/, '').replace(/^\+/, '');
    try {
      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          authorization: fast2smsKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: 'q',
          message: alertMsg.slice(0, 160),
          language: 'english',
          flash: 0,
          numbers: phoneForFast2Sms,
        }),
      });

      const data = await response.json();
      if (response.ok && data.return === true) {
        const reqId = data.request_id || (data.message && data.message[0]) || 'FAST2SMS_OK';
        return res.status(200).json({
          success: true,
          status: 'ACCEPTED',
          provider: 'FAST2SMS',
          provider_message_id: String(reqId),
          to: sanitizedPhone,
          message: `SMS accepted by Fast2SMS telecom gateway (Request ID: ${reqId})`,
          timestamp: new Date().toISOString(),
          data,
        });
      } else {
        return res.status(200).json({
          success: false,
          status: 'FAILED',
          provider: 'FAST2SMS',
          message: data.message || 'Fast2SMS gateway rejected message.',
          to: sanitizedPhone,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Fast2SMS Live dispatch error:', err.message);
    }
  }

  // If no provider is configured
  return res.status(200).json({
    success: false,
    status: 'CONFIGURATION_ERROR',
    provider: 'NONE',
    message: 'SMS provider is not configured. Set TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM or FAST2SMS_API_KEY in environment variables.',
    to: sanitizedPhone,
    timestamp: new Date().toISOString(),
  });
}
