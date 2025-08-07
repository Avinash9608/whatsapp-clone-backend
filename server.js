const app = require('./app');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle client joining a specific chat room
  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined conversation: ${conversationId}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Make io accessible from other modules
app.set('io', io);

// Connect to database and start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});