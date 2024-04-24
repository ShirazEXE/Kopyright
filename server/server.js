const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Database connection
mongoose.connect('mongodb://localhost/royalty_management')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create content schema
const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  fileBase64: { type: String, required: true },
  thumbnailBase64: { type: String },
  contentType: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// Content model
const Content = mongoose.model('Content', contentSchema);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to create new content
app.post('/api/content', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]), async (req, res) => {
  const { title, description, price, contentType, uploadedBy } = req.body;
  const fileBase64 = req.files.file ? req.files.file[0].buffer.toString('base64') : '';
  const thumbnailBase64 = req.files.thumbnail ? req.files.thumbnail[0].buffer.toString('base64') : '';

  try {
    const newContent = await Content.create({
      title,
      description,
price,
      fileBase64,
      thumbnailBase64,
      contentType,
      uploadedBy
    });
    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to fetch upload history
app.get('/api/uploadHistory', async (req, res) => {
  try {
    const uploads = await Content.find({}).sort({ uploadedAt: -1 });
    res.json(uploads);
  } catch (error) {
    console.error('Error fetching upload history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));