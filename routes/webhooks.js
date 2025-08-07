const express = require('express');
const { processWebhook } = require('../controllers/webhooks');

const router = express.Router();
router.post('/', processWebhook);
module.exports = router;