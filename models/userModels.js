const db = require('../db');

// Create a new user
exports.createUser = async (username, hashedPassword) => {
  try {
    const [result] = await db.query(
      'INSERT INTO users (username, password, created_at) VALUES (?, ?, NOW())',
      [username, hashedPassword]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Get user by username
exports.getUserByUsername = async (username) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
};

// Get user by ID
exports.getUserById = async (userId) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

