
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');
const path = require('path');
const authControllers = require('./controllers/authControllers');
const chatControllers = require('./controllers/chatControllers');
const uploadControllers = require('./controllers/uploadControllers');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
require('dotenv').config();



// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/files', uploadRoutes);

// Configure session with MySQL
const sessionStore = new MySQLStore({}, db.pool);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Set up multer for file uploads
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Routes
app.post('/register', authControllers.register);
app.post('/login', authControllers.login);
app.get('/chat/history/:roomId', chatControllers.getChatHistory);
app.post('/upload', upload.single('file'), uploadControllers.uploadFile);
app.get('/uploads/:filename', uploadControllers.serveFile);

// WebSocket setup
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Join a room
  socket.on('joinRoom', ({ roomId, username }) => {
    socket.join(roomId);
    socket.to(roomId).emit('userJoined', { username });
  });

  // Handle new messages
  socket.on('newMessage', async ({ roomId, senderId, message }) => {
    await chatControllers.saveMessage(roomId, senderId, message);
    io.to(roomId).emit('message', { senderId, message });
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

