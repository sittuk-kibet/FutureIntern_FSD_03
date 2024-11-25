
const path = require('path');
const fs = require('fs');

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, 'uploads', req.file.filename);

  res.status(200).json({
    message: 'File uploaded successfully.',
    fileUrl: `/uploads/${req.file.filename}`,
  });
};

// Serve uploaded files
exports.serveFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found.');
    }

    res.sendFile(filePath);
  });
};
