// services/whatsappService.js
const twilio = require('twilio');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Twilio client with API key
// Note: When using an API key (starting with SK), you also need to provide the Account SID
const apiKeySid = process.env.TWILIO_API_KEY_SID ;
const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const accountSid = process.env.TWILIO_ACCOUNT_SID; // This should start with AC

// Create client with API key and Account SID
const client = twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });

// WhatsApp number to send messages to
const adminWhatsAppNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+917894498135';
// Twilio WhatsApp sandbox number
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

/**
 * Send WhatsApp notification for new booking
 * @param {Object} booking - The booking object
 * @returns {Promise} - Twilio message promise
 */
const sendBookingNotification = async (booking) => {
  try {
    const message = await client.messages.create({
      body: `New Booking Alert! 💇‍♀️\n\nService: ${booking.service}\nStylist: ${booking.stylist}\nDate: ${booking.date}\nTime: ${booking.time}\n\nClient: ${booking.name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\n\nNotes: ${booking.notes || 'None'}`,
      from: twilioWhatsAppNumber,
      to: adminWhatsAppNumber
    });
    
    console.log(`WhatsApp notification sent with SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    throw error;
  }
};

module.exports = {
  sendBookingNotification
};