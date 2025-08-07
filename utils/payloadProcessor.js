function processPayload(payload) {
    const entry = payload.metaData.entry[0];
    const changes = entry.changes[0];
    const value = changes.value;
    
    if (value.statuses) {
      // Status update payload
      const statusData = value.statuses[0];
      return {
        isStatusUpdate: true,
        data: {
          message_id: statusData.id,
          status: statusData.status
        }
      };
    } else {
      // New message payload
      const contact = value.contacts[0];
      const messageData = value.messages[0];
      
      return {
        isStatusUpdate: false,
        data: {
          _id: payload._id,
          wa_id: contact.wa_id,
          profile_name: contact.profile.name,
          from: messageData.from,
          message_id: messageData.id,
          timestamp: messageData.timestamp,
          body: messageData.text?.body || '',
          type: messageData.type,
          display_phone_number: value.metadata.display_phone_number,
          phone_number_id: value.metadata.phone_number_id
        }
      };
    }
  }
  
  module.exports = { processPayload };