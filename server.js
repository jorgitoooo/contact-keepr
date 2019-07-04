const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Init middleware (accepts request body data)
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Yoo..' }));

// All possible routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server listening to port : ', PORT));
