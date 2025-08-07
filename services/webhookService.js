const Message = require('../models/Message');
const { processPayload } = require('../utils/payloadProcessor');

class WebhookService {
  async processWebhook(payload) {
    const { isStatusUpdate, data } = processPayload(payload);
    
    if (isStatusUpdate) {
      // Update message status
      await Message.updateOne(
        { message_id: data.message_id },
        { $set: { status: data.status } }
      );
      return { action: 'status_updated', data };
    } else {
      // Create new message
      const existingMessage = await Message.findById(data._id);
      if (!existingMessage) {
        await Message.create(data);
        return { action: 'message_created', data };
      }
      return { action: 'message_exists', data };
    }
  }
}

module.exports = new WebhookService();