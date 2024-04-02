const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./models/user');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://govardan:dWAviAc4dvF6D9lH@mafia.he8xjst.mongodb.net/Mafia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password })
    .then(user => {
        if (user) {
            if(user.password === password) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/signup', (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ message: err.message }));
});

app.listen(3001, () => console.log('Server running on port 3001'));
