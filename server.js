const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./config/logger');

// Load environment variables
require('dotenv').config();

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('Database connection established'))
  .catch(err => {
    logger.error('Database connection error:', err.message);
    process.exit(1);
  });

// Server setup
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Server running on port ${port} (${process.env.NODE_ENV} mode)`);
});

// Handle unhandled rejections
process.on('unhandledRejection', err => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully');
  server.close(() => logger.info('Process terminated'));
});