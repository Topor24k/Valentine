const mongoose = require('mongoose');

let cachedDb = null;

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
  bundlePhotos: {
    type: [String],
    default: []
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema);

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  const connection = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = connection;
  return connection;
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await connectToDatabase();

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      // Get single timeline item
      const item = await Timeline.findById(id);
      if (!item) {
        return res.status(404).json({ message: 'Timeline item not found' });
      }
      res.status(200).json(item);
    } else if (req.method === 'PUT') {
      // Update timeline item
      const updatedItem = await Timeline.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          date: req.body.date,
          mainPhoto: req.body.mainPhoto,
          bundlePhotos: req.body.bundlePhotos,
          message: req.body.message
        },
        { new: true }
      );
      
      if (!updatedItem) {
        return res.status(404).json({ message: 'Timeline item not found' });
      }
      
      res.status(200).json(updatedItem);
    } else if (req.method === 'DELETE') {
      // Delete timeline item
      const deletedItem = await Timeline.findByIdAndDelete(id);
      
      if (!deletedItem) {
        return res.status(404).json({ message: 'Timeline item not found' });
      }
      
      res.status(200).json({ message: 'Timeline item deleted successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
