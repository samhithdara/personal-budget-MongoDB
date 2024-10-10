const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());  // This is needed to parse JSON data in req.body

// If you expect URL-encoded data (e.g., form submissions), include this as well
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const budgetSchema =  require('./budgetModel');
const { default: mongoose } = require('mongoose');
let url = 'mongodb://127.0.0.1:27017/budgetDB';

app.use(cors());


app.get('/budget', (req, res) => {
    async function connectAndFetch() {
        try {
            // Connect to MongoDB
            await mongoose.connect(url);
            console.log('Connected to MongoDB successfully');
            
            // Fetch the data once connected
            const budgetData = await budgetSchema.find();
            console.log('Budget Data:', budgetData);
            res.json(budgetData);
        } catch (err) {
            console.error('Error:', err);
        }
    }
    
    // Run the function to connect and fetch
    connectAndFetch();
});

// GET endpoint to fetch budget data
app.get('/api/budget', async (req, res) => {
    try {
        const budgetData = await Budget.find();
        res.json(budgetData);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.post('/api/budget', async (req, res) => {
    const { title, value, color } = req.body;
    if (!title || !value || !color) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    
    const newBudget = new budgetSchema({
        title,
        value,
        color
    });

    try {
        await newBudget.save();
        res.json(newBudget);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});


app.get('/', express.static('public'));
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});