const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// Register a new user
router.post('/register', authControllers.register);

// Login a user
router.post('/login', authControllers.login);

module.exports = router;

