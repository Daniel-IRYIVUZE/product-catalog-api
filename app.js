const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const logger = require('./config/logger');
const AppError = require('./utils/appError');
const errorHandler = require('./middleware/error');

const app = express();

// 1. Security Middlewares
app.use(helmet());
app.use(cors());
app.options('*', cors());

// 2. Request Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 3. Body Parser
app.use(express.json({ limit: '10kb' }));

// 4. Data Sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// 5. Rate Limiting
const limiter = rateLimit({
  max: process.env.API_LIMIT || 100,
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// 6. Routes
app.use('/api/v1', require('./routes'));

// 7. API Documentation
app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customSiteTitle: 'Product Catalog API'
  })
);

// 8. Undefined Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// 9. Error Handling
app.use(errorHandler);

module.exports = app;