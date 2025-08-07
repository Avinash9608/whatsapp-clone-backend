const Message = require('../models/Message');

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
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
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    // Get messages for the conversation
    const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    
    // Update status to 'read' for all incoming messages that aren't already read
    await Message.updateMany(
      { 
        wa_id: req.params.wa_id, 
        from: req.params.wa_id, // Only update messages from the contact (not from business)
        status: { $ne: 'read' } 
      },
      { status: 'read' }
    );
    
    // Get the Socket.IO instance
    const io = req.app.get('io');
    if (io) {
      // Emit an event to notify clients that messages have been read
      io.to(req.params.wa_id).emit('messages_read', { wa_id: req.params.wa_id });
      // Also broadcast to all clients to update their conversation list
      io.emit('update_conversations');
    }
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const message = new Message({
      ...req.body,
      _id: `manual_${Date.now()}`,
      message_id: `manual_${Date.now()}`,
      timestamp: Math.floor(Date.now() / 1000).toString(),
      type: req.body.type || 'text',
      status: 'sent',
      display_phone_number: '918329446654',
      phone_number_id: '629305560276479'
    });
    await message.save();
    
    // Get the Socket.IO instance
    const io = req.app.get('io');
    if (io) {
      // Emit an event to the specific conversation room
      io.to(req.body.wa_id).emit('new_message', message);
      // Also broadcast to all clients to update their conversation list
      io.emit('update_conversations');
    }
    
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};