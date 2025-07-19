const express = require('express');
require('dotenv').config();
const db = require('./db');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');

const app = express(); // <-- make sure this comes BEFORE using app

app.use(express.json());
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 5000;

// Basic home route
app.get('/', (req, res) => {
  res.send('Welcome to the User API!');
});

// ✅ Signup route
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    res.status(400).json({ error: 'Could not create user', details: error.message });
  }
});

// ✅ Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

// Fetch all users (optional)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    res.status(500).json({ error: 'Could not fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
