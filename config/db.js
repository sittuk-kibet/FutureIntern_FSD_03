const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your MySQL root password
  database: 'chat_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the pool for reuse
module.exports = pool.promise();
