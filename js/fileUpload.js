
// DOM Elements
const fileInput = document.getElementById('file-input');
const sendFileButton = document.getElementById('send-file');

// File Upload Route
const uploadUrl = '/files/upload';

// Event: Sending a file
sendFileButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch(uploadUrl, {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      alert('File uploaded successfully.');
      // Notify the chat room about the file
      socket.emit('message', { fileUrl: data.fileUrl, roomId: 'room1', senderId: 'user1' }); // Replace with dynamic user/room IDs
    })
    .catch((error) => console.error('Error uploading file:', error));
});
