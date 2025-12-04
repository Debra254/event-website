const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const eventsRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');

const app = express();
mongoose.connect('mongodb://localhost:27017/ticketdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

app.use('/events', eventsRoutes);
app.use('/auth', authRoutes);
app.use('/payment', paymentRoutes);

app.listen(3001, () => console.log('Backend running on port 3001'));