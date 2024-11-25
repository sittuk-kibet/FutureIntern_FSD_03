// Establish WebSocket connection
const socket = io();

// DOM Elements
const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Event: Sending a message
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('message', { message, roomId: 'room1', senderId: 'user1' }); // Replace with dynamic user/room IDs
    messageInput.value = '';
  }
});

// Receiving messages from WebSocket
socket.on('message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${data.senderId}: ${data.message}`;
  messagesDiv.appendChild(messageElement);
});
