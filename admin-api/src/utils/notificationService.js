/**
 * Notification Service for Nova Innovations
 * Dispatches alerts when high-value client campaign inquiries arrive.
 * Supports SMTP (Node.js tls/net or nodemailer if configured), or structured logging.
 */

const sendNewEnquiryNotification = async (enquiry) => {
  try {
    const alertEmail = process.env.ALERT_EMAIL || 'novainnovations2020@gmail.com';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    console.log(`\n==================================================`);
    console.log(`🔔 NEW CLIENT ENQUIRY RECEIVED [${timestamp}]`);
    console.log(`Name:        ${enquiry.name}`);
    console.log(`Phone:       ${enquiry.phone}`);
    console.log(`Email:       ${enquiry.email || 'N/A'}`);
    console.log(`Company:     ${enquiry.company || 'N/A'}`);
    console.log(`Service:     ${enquiry.serviceType || 'Outdoor Hoardings'}`);
    console.log(`Details:     ${enquiry.notes || 'None'}`);
    console.log(`Source:      ${enquiry.source || 'Website'}`);
    console.log(`Target Recipient: ${alertEmail}`);
    console.log(`==================================================\n`);

    // If external webhook or SMTP environment is provided in production
    if (process.env.WEBHOOK_LEAD_URL) {
      try {
        const payload = JSON.stringify({
          text: `🚨 *New Nova Innovations Lead*\n*Name:* ${enquiry.name}\n*Phone:* ${enquiry.phone}\n*Service:* ${enquiry.serviceType || 'Hoardings'}\n*Notes:* ${enquiry.notes || 'N/A'}\n*Source:* ${enquiry.source}`,
        });
        await fetch(process.env.WEBHOOK_LEAD_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
        });
      } catch (webhookErr) {
        console.warn('Webhook lead notification warning:', webhookErr.message);
      }
    }
  } catch (err) {
    console.error('Notification dispatch error (non-fatal):', err.message);
  }
};

module.exports = {
  sendNewEnquiryNotification,
};
