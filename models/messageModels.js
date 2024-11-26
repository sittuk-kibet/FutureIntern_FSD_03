const db = require('../db');

// Save a message
exports.saveMessage = async (roomId, senderId, message) => {
  try {
    const [result] = await db.query(
      'INSERT INTO messages (room_id, sender_id, message, created_at) VALUES (?, ?, ?, NOW())',
      [roomId, senderId, message]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

// Fetch messages by room
exports.getMessagesByRoom = async (roomId) => {
  try {
    const [rows] = await db.query(
      'SELECT messages.*, users.username FROM messages INNER JOIN users ON messages.sender_id = users.id WHERE room_id = ? ORDER BY created_at ASC',
      [roomId]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

