const express = require('express');
require('dotenv').config();
const db = require('./db');
const User = require('./models/User');

const app = express();
app.use(express.json());

const cors = require('cors');
const helmet = require('helmet');

app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 3000;

// ✅ Root route just to check server running
app.get('/', (req, res) => {
  res.send('Welcome to the User API!');
});

// 👨‍🎓 Add a user
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

// 📚 Get all users
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
