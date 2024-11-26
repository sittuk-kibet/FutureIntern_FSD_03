
const db = require('../config/db');
const bcrypt = require('bcrypt');


// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).send('Registration successful.');
  } catch (err) {
    res.status(500).send('Error registering user.');
  }
};

// Authenticate a user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).send('Invalid credentials.');
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid credentials.');
    }

    req.session.userId = user.id;
    res.status(200).send('Login successful.');
  } catch (err) {
    res.status(500).send('Error logging in.');
  }
};
