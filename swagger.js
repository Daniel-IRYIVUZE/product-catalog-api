const swaggerJSDoc = require('swagger-jsdoc');
const logger = require('./config/logger');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Catalog API',
      version: '1.0.0',
      description: 'API for managing e-commerce product catalog',
      contact: {
        name: 'API Support',
        email: 'support@productcatalog.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Category: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Electronics',
            },
            description: {
              type: 'string',
              example: 'All electronic devices',
            },
            isActive: {
              type: 'boolean',
              example: true,
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Smartphone X',
            },
            description: {
              type: 'string',
              example: 'Latest smartphone with advanced features',
            },
            price: {
              type: 'number',
              example: 999.99,
            },
            category: {
              type: 'string',
              format: 'mongo-id',
              example: '60c72b2f9b1d8e3a3c8e4567',
            },
            variants: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Variant',
              },
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
                format: 'url',
              },
              example: ['http://example.com/image1.jpg', 'http://example.com/image2.jpg'],
            },
            isActive: {
              type: 'boolean',
              example: true,
            },
            discount: {
              type: 'number',
              example: 10,
            },
          },
        },
        Variant: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Blue',
            },
            sku: {
              type: 'string',
              example: 'SMX-BLUE-128',
            },
            additionalCost: {
              type: 'number',
              example: 20,
            },
            stockCount: {
              type: 'integer',
              example: 50,
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        NotFound: {
          description: 'Resource not found',
        },
        ValidationError: {
          description: 'Validation failed',
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;