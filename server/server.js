const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Database connection
mongoose.connect('mongodb://localhost/royalty_management')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Artist', 'Investor'] },
});

// User model
const User = mongoose.model('User', userSchema);

// Create content schema
const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  fileBase64: { type: String, required: true },
  thumbnailBase64: { type: String },
  contentType: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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

// Session middleware
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
}));

// Function to validate password strength
function isPasswordStrong(password) {
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const length = password.length;

  return length >= 8 && hasNumber && hasUppercase && hasLowercase && hasSpecialChar;
}

// Endpoint to create new user
app.post('/api/signup', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]), async (req, res) => {
  const { username, password, role } = req.body;
  let fileBase64 = '';
  let thumbnailBase64 = '';

  if (req.files && req.files.file && req.files.file[0]) {
    fileBase64 = req.files.file[0].buffer.toString('base64');
  }

  if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
    thumbnailBase64 = req.files.thumbnail[0].buffer.toString('base64');
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ message: 'Password not strong enough. Must be at least 8 characters long, have at least one number, one uppercase letter, one lowercase letter, and one special character.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    // Start a new session
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to log in user
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'We can\'t find your account. Please sign up.' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Start a new session
    req.session.userId = user._id;
    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to check if user is logged in
app.get('/api/loggedIn', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Endpoint to log out user
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

// Endpoint to create new content
app.post('/api/content', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]), async (req, res) => {
  const { title, description, price, contentType, uploadedBy } = req.body;
  let fileBase64 = '';
  let thumbnailBase64 = '';

  if (req.files && req.files.file && req.files.file[0]) {
    fileBase64 = req.files.file[0].buffer.toString('base64');
  }

  if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
    thumbnailBase64 = req.files.thumbnail[0].buffer.toString('base64');
  }

  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newContent = await Content.create({
      title,
      description,
      price,
      fileBase64,
      thumbnailBase64,
      contentType,
      uploadedBy: req.session.userId,
    });
    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to fetch upload history
app.get('/api/uploadHistory', async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const uploads = await Content.find({ uploadedBy: req.session.userId }).sort({ uploadedAt: -1 });
    res.json(uploads);
  } catch (error) {
    console.error('Error fetching upload history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch all content from all users
app.get('/api/allContent', async (req, res) => {
  try {
    const allContent = await Content.find().sort({ uploadedAt: -1 });
    res.json(allContent);
  } catch (error) {
    console.error('Error fetching all content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch user role
app.get('/api/userRole', async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.session.userId);
    res.json({ role: user.role });
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));