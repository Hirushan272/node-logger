const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://hirushan272:Index@5914655@logger.1bwcd.mongodb.net/?retryWrites=true&w=majority&appName=logger', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for our data
const messageSchema = new mongoose.Schema({
  time: Date,
  message: String,
});

// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);

// Middleware
app.use(bodyParser.json());

// POST endpoint
app.post('/api/message', async (req, res) => {
  try {
    const { time, message } = req.body;

    // Validate input
    if (!time || !message) {
      return res.status(400).json({ error: 'Both time and message are required' });
    }

    // Create a new message document
    const newMessage = new Message({
      time: new Date(time),
      message,
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});