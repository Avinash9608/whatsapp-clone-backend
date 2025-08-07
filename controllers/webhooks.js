const webhookService = require('../services/webhookService');

exports.processWebhook = async (req, res) => {
  try {
    const result = await webhookService.processWebhook(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
};

