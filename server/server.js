const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://kayeencampana_db_user:Uq5vINcl6bFbxkvm@cluster0.eqp5jwy.mongodb.net/valentine?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Timeline Schema
const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  mainPhoto: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Timeline = mongoose.model('Timeline', timelineSchema);

// API Routes

// Get all timeline items (sorted by date)
app.get('/api/timeline', async (req, res) => {
  try {
    const items = await Timeline.find().sort({ date: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single timeline item
app.get('/api/timeline/:id', async (req, res) => {
  try {
    const item = await Timeline.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new timeline item
app.post('/api/timeline', async (req, res) => {
  const timeline = new Timeline({
    title: req.body.title,
    date: req.body.date,
    mainPhoto: req.body.mainPhoto,
    message: req.body.message || ''
  });

  try {
    const newTimeline = await timeline.save();
    res.status(201).json(newTimeline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update timeline item
app.put('/api/timeline/:id', async (req, res) => {
  try {
    const updatedItem = await Timeline.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        date: req.body.date,
        mainPhoto: req.body.mainPhoto,
        message: req.body.message || ''
      },
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete timeline item
app.delete('/api/timeline/:id', async (req, res) => {
  try {
    const deletedItem = await Timeline.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Timeline item not found' });
    }
    
    res.json({ message: 'Timeline item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
