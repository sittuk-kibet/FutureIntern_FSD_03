const express = require('express');
const router = express.Router();
const chatControllers = require('../controllers/chatControllers');

// Get chat history for a specific room
router.get('/history/:roomId', chatControllers.getChatHistory);

module.exports = router;

