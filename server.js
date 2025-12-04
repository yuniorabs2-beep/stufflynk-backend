const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

// Import User model (U mayúscula)
const User = require('./models/User');

// Conexión directa con tu usuario, contraseña y cluster Atlas
const uri = "mongodb+srv://yuniorabs1_db_user:PTpmwNTR61dJpaTB@cluster0.t2vm262.mongodb.net/UniTrade?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to UniTrade Backend 🚀');
});

// Register new user
app.post('/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: '✅ User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: '❌ Error creating user', error: error.message });
  }
});

// Login user
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: '❌ Invalid credentials' });
    }
    res.json({ message: '✅ Login successful', user });
  } catch (error) {
    res.status(400).json({ message: '❌ Error logging in', error: error.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: '❌ Error fetching users', error: error.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});