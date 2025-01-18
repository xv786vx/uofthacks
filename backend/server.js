const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/campus-chronicles')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Memory Schema
const memorySchema = new mongoose.Schema({
  title: String,
  description: String,
  lat: Number,
  lng: Number,
  category: String,
  user: String
});

const Memory = mongoose.model('Memory', memorySchema);

// Routes
app.get('/api/memories', async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/memories', async (req, res) => {
  try {
    const memory = new Memory(req.body);
    await memory.save();
    res.status(201).json(memory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});