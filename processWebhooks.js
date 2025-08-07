const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "whatsapp",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Message schema and model
const messageSchema = new mongoose.Schema({
  _id: String,
  wa_id: String,
  profile_name: String,
  from: String,
  message_id: String,
  timestamp: String,
  body: String,
  type: String,
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
  display_phone_number: String,
  phone_number_id: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema, "processed_messages");

// Complete list of payloads
const payloads = [
  {
    payload_type: "whatsapp_webhook",
    _id: "conv1-msg1-user",
    metaData: {
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                contacts: [
                  {
                    profile: {
                      name: "Ravi Kumar",
                    },
                    wa_id: "919937320320",
                  },
                ],
                messages: [
                  {
                    from: "919937320320",
                    id: "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhggMTIzQURFRjEyMzQ1Njc4OTA=",
                    timestamp: "1754400000",
                    text: {
                      body: "Hi, I'd like to know more about your services.",
                    },
                    type: "text",
                  },
                ],
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: "918329446654",
                  phone_number_id: "629305560276479",
                },
              },
            },
          ],
          id: "30164062719905277",
        },
      ],
      gs_app_id: "conv1-app",
      object: "whatsapp_business_account",
    },
    createdAt: "2025-08-06 12:00:00",
    startedAt: "2025-08-06 12:00:00",
    completedAt: "2025-08-06 12:00:01",
    executed: true,
  },
  {
    payload_type: "whatsapp_webhook",
    _id: "conv1-msg2-api",
    metaData: {
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: "918329446654",
                  phone_number_id: "629305560276479",
                },
                contacts: [
                  {
                    profile: {
                      name: "Ravi Kumar",
                    },
                    wa_id: "919937320320",
                  },
                ],
                messages: [
                  {
                    from: "918329446654",
                    id: "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhggNDc4NzZBQ0YxMjdCQ0VFOTk2NzA3MTI4RkZCNjYyMjc=",
                    timestamp: "1754400020",
                    text: {
                      body: "Hi Ravi! Sure, I'd be happy to help you with that. Could you tell me what you're looking for?",
                    },
                    type: "text",
                  },
                ],
              },
            },
          ],
          id: "30164062719905278",
        },
      ],
      gs_app_id: "conv1-app",
      object: "whatsapp_business_account",
    },
    createdAt: "2025-08-06 12:00:20",
    startedAt: "2025-08-06 12:00:20",
    completedAt: "2025-08-06 12:00:21",
    executed: true,
  },
  {
    payload_type: "whatsapp_webhook",
    _id: "conv1-msg1-user",
    metaData: {
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                contacts: [
                  {
                    profile: {
                      name: "Ravi Kumar",
                    },
                    wa_id: "919937320320",
                  },
                ],
                messages: [
                  {
                    from: "919937320320",
                    id: "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhggMTIzQURFRjEyMzQ1Njc4OTA=",
                    timestamp: "1754400000",
                    text: {
                      body: "Hi, I'd like to know more about your services.",
                    },
                    type: "text",
                  },
                ],
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: "918329446654",
                  phone_number_id: "629305560276479",
                },
              },
            },
          ],
          id: "30164062719905277",
        },
      ],
      gs_app_id: "conv1-app",
      object: "whatsapp_business_account",
    },
    createdAt: "2025-08-06 12:00:00",
    startedAt: "2025-08-06 12:00:00",
    completedAt: "2025-08-06 12:00:01",
    executed: true,
  },
  {
    payload_type: "whatsapp_webhook",
    _id: "conv1-msg2-status",
    metaData: {
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: "918329446654",
                  phone_number_id: "629305560276479",
                },
                statuses: [
                  {
                    conversation: {
                      id: "conv1-convo-id",
                      origin: {
                        type: "user_initiated",
                      },
                    },
                    gs_id: "conv1-msg2-gs-id",
                    id: "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhggNDc4NzZBQ0YxMjdCQ0VFOTk2NzA3MTI4RkZCNjYyMjc=",
                    meta_msg_id:
                      "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhggNDc4NzZBQ0YxMjdCQ0VFOTk2NzA3MTI4RkZCNjYyMjc=",
                    recipient_id: "919937320320",
                    status: "read",
                    timestamp: "1754400040",
                  },
                ],
              },
            },
          ],
          id: "30164062719905278",
        },
      ],
      gs_app_id: "conv1-app",
      object: "whatsapp_business_account",
      startedAt: "2025-08-06 12:00:40",
      completedAt: "2025-08-06 12:00:40",
      executed: true,
    },
  },
  {
    payload_type: "whatsapp_webhook",
    _id: "conv2-msg1-user",
    metaData: {
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                contacts: [
                  {
                    profile: {
                      name: "Neha Joshi",
                    },
                    wa_id: "929967673820",
                  },
                ],
                messages: [
                  {
                    from: "929967673820",
                    id: "wamid.HBgMOTI5OTY3NjczODIwFQIAEhggQ0FBQkNERUYwMDFGRjEyMzQ1NkZGQTk5RTJCM0I2NzY=",
                    timestamp: "1754401000",
                    text: {
                      body: "Hi, I saw your ad. Can you share more details?",
                    },
                    type: "text",
                  },
                ],
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: "918329446654",
                  phone_number_id: "629305560276479",
                },
              },
            },
          ],
          id: "30164062719905279",
        },
      ],
      gs_app_id: "conv2-app",
      object: "whatsapp_business_account",
    },
    createdAt: "2025-08-06 12:16:40",
    startedAt: "2025-08-06 12:16:40",
    completedAt: "2025-08-06 12:16:41",
    executed: true,
  },
  {
    payload_type: "whatsapp_webhook",
    _id: "conv2-msg2-api",
    metaData: {
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: "918329446654",
                  phone_number_id: "629305560276479",
                },
                contacts: [
                  {
                    profile: {
                      name: "Neha Joshi",
                    },
                    wa_id: "929967673820",
                  },
                ],
                messages: [
                  {
                    from: "918329446654",
                    id: "wamid.HBgMOTI5OTY3NjczODIwFQIAEhggM0RFNDkxRjEwNDhDQzgwMzk3NzA1ODc1RkU3QzI0MzU=",
                    timestamp: "1754401030",
                    text: {
                      body: "Hi Neha! Absolutely. We offer curated home decor pieces—are you looking for nameplates, wall art, or something else?",
                    },
                    type: "text",
                  },
                ],
              },
            },
          ],
          id: "30164062719905280",
        },
      ],
      gs_app_id: "conv2-app",
      object: "whatsapp_business_account",
    },
    createdAt: "2025-08-06 12:17:10",
    startedAt: "2025-08-06 12:17:10",
    completedAt: "2025-08-06 12:17:11",
    executed: true,
  },
  {
    payload_type: "whatsapp_webhook",
    _id: "conv2-msg1-status",
    metaData: {
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: "918329446654",
                  phone_number_id: "629305560276479",
                },
                statuses: [
                  {
                    conversation: {
                      id: "conv2-convo-id",
                      origin: {
                        type: "user_initiated",
                      },
                      expiration_timestamp: "1754487400",
                    },
                    gs_id: "conv2-status-gs-id",
                    id: "wamid.HBgMOTI5OTY3NjczODIwFQIAEhggQ0FBQkNERUYwMDFGRjEyMzQ1NkZGQTk5RTJCM0I2NzY=",
                    meta_msg_id:
                      "wamid.HBgMOTI5OTY3NjczODIwFQIAEhggQ0FBQkNERUYwMDFGRjEyMzQ1NkZGQTk5RTJCM0I2NzY=",
                    pricing: {
                      billable: true,
                      category: "utility",
                      pricing_model: "PMP",
                      type: "regular",
                    },
                    recipient_id: "929967673820",
                    status: "sent",
                    timestamp: "1754401010",
                  },
                ],
              },
            },
          ],
          id: "30164062719905279",
        },
      ],
      gs_app_id: "conv2-app",
      object: "whatsapp_business_account",
      startedAt: "2025-08-06 12:16:50",
      completedAt: "2025-08-06 12:16:50",
      executed: true,
    },
  },
  {
    payload_type: "whatsapp_webhook",
    _id: "conv2-msg2-status",
    metaData: {
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                messaging_product: "whatsapp",
                metadata: {
                  display_phone_number: "918329446654",
                  phone_number_id: "629305560276479",
                },
                statuses: [
                  {
                    conversation: {
                      id: "conv2-convo-id",
                      origin: {
                        type: "user_initiated",
                      },
                    },
                    gs_id: "conv2-msg2-gs-id",
                    id: "wamid.HBgMOTI5OTY3NjczODIwFQIAEhggM0RFNDkxRjEwNDhDQzgwMzk3NzA1ODc1RkU3QzI0MzU=",
                    meta_msg_id:
                      "wamid.HBgMOTI5OTY3NjczODIwFQIAEhggM0RFNDkxRjEwNDhDQzgwMzk3NzA1ODc1RkU3QzI0MzU=",
                    pricing: {
                      billable: true,
                      category: "utility",
                      pricing_model: "PMP",
                      type: "regular",
                    },
                    recipient_id: "929967673820",
                    status: "delivered",
                    timestamp: "1754401045",
                  },
                ],
              },
            },
          ],
          id: "30164062719905280",
        },
      ],
      gs_app_id: "conv2-app",
      object: "whatsapp_business_account",
      startedAt: "2025-08-06 12:17:30",
      completedAt: "2025-08-06 12:17:30",
      executed: true,
    },
  },
];

// Function to process a single payload
async function processPayload(payload) {
  try {
    const entry = payload.metaData.entry[0];
    const changes = entry.changes[0];
    const value = changes.value;

    if (value.statuses) {
      // Handle status update
      const statusData = value.statuses[0];
      const messageId = statusData.id || statusData.meta_msg_id;
      const status = statusData.status;

      const result = await Message.updateOne(
        { message_id: messageId },
        { $set: { status: status } }
      );

      console.log(
        `Status updated for message ${messageId} to ${status}. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`
      );
      return { action: "status_updated", messageId, status };
    } else if (value.messages) {
      // Handle new message
      const contact = value.contacts[0];
      const messageData = value.messages[0];

      const messageDoc = {
        _id: payload._id,
        wa_id: contact.wa_id,
        profile_name: contact.profile.name,
        from: messageData.from,
        message_id: messageData.id,
        timestamp: messageData.timestamp,
        body: messageData.text?.body || "",
        type: messageData.type,
        display_phone_number: value.metadata.display_phone_number,
        phone_number_id: value.metadata.phone_number_id,
      };

      // Check if message already exists
      const existingMessage = await Message.findOne({
        $or: [{ _id: messageDoc._id }, { message_id: messageDoc.message_id }],
      });

      if (!existingMessage) {
        const newMessage = await Message.create(messageDoc);
        console.log(
          `New message created from ${messageDoc.from}: ${messageDoc.body}`
        );
        return { action: "message_created", message: newMessage };
      } else {
        console.log(`Message already exists: ${messageDoc.message_id}`);
        return { action: "message_exists", message: existingMessage };
      }
    }

    console.warn("Unsupported payload type");
    return { action: "unsupported_payload" };
  } catch (error) {
    console.error("Error processing payload:", error);
    throw error;
  }
}

// Process all payloads
async function processAllPayloads() {
  try {
    console.log(`Processing ${payloads.length} payloads...`);

    for (const payload of payloads) {
      await processPayload(payload);
      // Small delay between processing
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log("All payloads processed successfully");
  } catch (error) {
    console.error("Error processing payloads:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Start processing
processAllPayloads();
