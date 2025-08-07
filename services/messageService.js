const Message = require('../models/Message');

class MessageService {
  async getConversations() {
    return Message.aggregate([
      {
        $group: {
          _id: '$wa_id',
          profile_name: { $first: '$profile_name' },
          last_message: { $last: '$body' },
          last_message_time: { $last: '$timestamp' },
          unread_count: {
            $sum: {
              $cond: [
                { $and: [
                  { $ne: ['$from', '$wa_id'] },
                  { $ne: ['$status', 'read'] }
                ]}, 
                1, 
                0
              ]
            }
          }
        }
      },
      { $sort: { last_message_time: -1 } }
    ]);
  }

  async getMessages(wa_id) {
    return Message.find({ wa_id }).sort({ timestamp: 1 });
  }

  async sendMessage(messageData) {
    const message = new Message({
      ...messageData,
      _id: `manual_${Date.now()}`,
      message_id: `manual_${Date.now()}`,
      timestamp: Math.floor(Date.now() / 1000).toString(),
      type: 'text',
      status: 'sent'
    });
    return message.save();
  }
}

module.exports = new MessageService();