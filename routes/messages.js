const express = require('express');
const { 
  getConversations, 
  getMessages, 
  sendMessage 
} = require('../controllers/messages');

const router = express.Router();
router.get('/conversations', getConversations);
router.get('/:wa_id', getMessages);
router.post('/', sendMessage);
module.exports = router;