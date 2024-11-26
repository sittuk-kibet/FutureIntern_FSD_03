
const express = require('express');
const router = express.Router();
const uploadControllers = require('../controllers/uploadControllers');

// Handle file upload
router.post('/upload', uploadControllers.uploadFile);

// Serve uploaded file
router.get('/uploads/:filename', uploadControllers.serveFile);

module.exports = router;
