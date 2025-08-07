const express = require('express');
const cors = require('cors');
const webhookRoutes = require('./routes/webhooks');
const messageRoutes = require('./routes/messages');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/webhooks', webhookRoutes);
app.use('/api/messages', messageRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;