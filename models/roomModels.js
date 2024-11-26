
const db = require('../db');

// Create a new room
exports.createRoom = async (roomName) => {
  try {
    const [result] = await db.query(
      'INSERT INTO rooms (name, created_at) VALUES (?, NOW())',
      [roomName]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

// Get all rooms
exports.getAllRooms = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM rooms ORDER BY created_at ASC');
    return rows;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Get room by ID
exports.getRoomById = async (roomId) => {
  try {
    const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [roomId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    throw error;
  }
};
