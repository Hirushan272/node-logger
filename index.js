const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
app.use(bodyParser.json()); // To parse incoming JSON data

// Connect to MongoDB
mongoose.connect('mongodb+srv://hirushan272:<Index@5914655>@logger.1bwcd.mongodb.net/?retryWrites=true&w=majority&appName=logger', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema
const MessageSchema = new mongoose.Schema({
    time: { type: String, required: true },
    message: { type: String, required: true },
});

// Create a model
const Message = mongoose.model('Message', MessageSchema);

// Create POST route
app.post('/log', async (req, res) => {
    const { time, message } = req.body;

    try {
        const newMessage = new Message({ time, message });
        await newMessage.save();
        res.status(201).send('Message saved successfully!');
    } catch (error) {
        res.status(500).send('Error saving message');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
