// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 430
        },
        {
            title: 'Grocery',
            budget: 110
        },
        {
            title: 'Wifi',
            budget: 35
        },
        {
            title: 'Gas',
            budget: 20
        },
        {
            title: 'Electricity',
            budget: 120
        },
        {
            title: 'water',
            budget: 15
        },
    ]
};


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.get('/', express.static('public'));
app.use(express.static('public'));
// app.get('/main.css', express.static('public/main.css'))
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});