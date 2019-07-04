const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({ msg: 'Yoo..' }));

// All possible routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log('Server listening to port : ', PORT));
