
const db = require('../config/db');

// Save a chat message
exports.saveMessage = async (roomId, senderId, message) => {
  try {
    await db.query('INSERT INTO messages (room_id, sender_id, message) VALUES (?, ?, ?)', [roomId, senderId, message]);
  } catch (err) {
    console.error('Error saving message:', err);
  }
};

// Get chat history for a room
exports.getChatHistory = async (req, res) => {
  const { roomId } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM messages WHERE room_id = ? ORDER BY created_at ASC', [roomId]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).send('Error fetching chat history.');
  }
};
