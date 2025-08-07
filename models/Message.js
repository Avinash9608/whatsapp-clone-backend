const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  wa_id: { type: String, required: true },
  profile_name: { type: String, required: true },
  from: { type: String, required: true },
  message_id: { type: String, required: true },
  timestamp: { type: String, required: true },
  body: { type: String, required: true },
  type: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'read'], 
    default: 'sent' 
  },
  display_phone_number: { type: String, required: true },
  phone_number_id: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema, 'processed_messages');