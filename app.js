const express = require('express');
const cors = require('cors');
const webhookRoutes = require('./routes/webhooks');
const messageRoutes = require('./routes/messages');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://whatsapp-clone-frontend-alpha.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'WhatsApp Clone API is running' });
});

app.use('/api/webhooks', webhookRoutes);
app.use('/api/messages', messageRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;