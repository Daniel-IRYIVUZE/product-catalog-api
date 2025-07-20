# Product Catalog API Assignment

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green?logo=mongodb)
![Swagger](https://img.shields.io/badge/Swagger-3.0-lightgreen?logo=swagger)

A complete **RESTful API** for **e-commerce product management**, with advanced inventory tracking, search functionality, and comprehensive documentation.

## Video Walkthrough

[![API Demo Video](https://img.shields.io/badge/Watch_Demo-Video_Link-red)](https://youtu.be/your-video-link-here)

## Features

* **Complete CRUD Operations** for products and categories.
* **Product Variants** with inventory tracking (size, color).
* **Advanced Search** with filtering (name, category, price range).
* **Discount Pricing** system with percentage-based discounts.
* **Real-time Inventory** management.
* **Comprehensive Documentation** with Swagger UI.
* **Robust Error Handling** and input validation.

## Project Structure

```
product-catalog-api/
├── config/           # Configuration files (logger, db)
├── controllers/      # Route controllers
├── db/               # Database connection logic
├── endpoints/        # API endpoint definitions
├── middleware/       # Custom middleware
├── models/           # MongoDB schemas
├── routes/           # Express router definitions
├── swagger/          # API documentation
├── utils/            # Utility functions
├── validations/      # Request validation schemas
├── .env              # Environment configuration
├── app.js            # Express application setup
├── generate-swagger.js # Documentation generator
├── package.json      # Project dependencies
├── README.md         # This documentation
├── server.js         # Server entry point
├── swagger.json      # OpenAPI specification
└── test.js           # Integration tests
```

## Setup & Installation

### Prerequisites

Before getting started, make sure you have the following installed:

* **Node.js 18+**: For backend development.
* **MongoDB**: Either MongoDB Atlas (cloud) or a local MongoDB instance.
* **Git**: For version control and cloning the repository.

### Installation Steps

#### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Daniel-IRYIVUZE/product-catalog-api.git
cd product-catalog-api
```

#### 2. Install dependencies

Install all the necessary dependencies by running:

```bash
npm install
```

#### 3. Configure environment variables

To set up environment variables, follow these steps:

1. **Copy the example environment configuration** to create a `.env` file:

   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your MongoDB credentials and other configurations. Here is a sample of what it should contain:

   ```env
   # MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/product-catalog

   # Secret key for JWT (JSON Web Tokens)
   JWT_SECRET=your-jwt-secret-key

   # Port on which the app will run
   PORT=3000
   ```

#### 4. Generate Swagger Documentation

The Swagger documentation is auto-generated using `swagger-jsdoc`. To regenerate or update the documentation manually, run:

```bash
node generate-swagger.js
```

#### 5. Start the development server

To start the server in **development mode**, run:

```bash
npm run dev
```

#### 6. For production

When ready to deploy in production, use:

```bash
npm start
```

## API Documentation

### Base URL

All API endpoints are available under the base URL:

```
http://localhost:3000/api/v1
```

### Categories Endpoints

| Method | Endpoint          | Description          | Status Codes  |
| ------ | ----------------- | -------------------- | ------------- |
| POST   | `/categories`     | Create new category  | 201, 400      |
| GET    | `/categories`     | List all categories  | 200           |
| GET    | `/categories/:id` | Get category details | 200, 404      |
| PATCH  | `/categories/:id` | Update category      | 200, 400, 404 |
| DELETE | `/categories/:id` | Delete category      | 204, 404      |

**Example Request:**

```http
POST /api/v1/categories
Content-Type: application/json

{
  "name": "Electronics",
  "description": "All electronic devices"
}
```

**Example Response:**

```json
{
  "_id": "651a8b5c7d8a1b2c3d4e5f6a",
  "name": "Electronics",
  "description": "All electronic devices",
  "createdAt": "2023-10-01T12:00:00.000Z"
}
```

### Products Endpoints

| Method | Endpoint              | Description                    | Status Codes  |
| ------ | --------------------- | ------------------------------ | ------------- |
| POST   | `/products`           | Create new product             | 201, 400      |
| GET    | `/products`           | List all products (filterable) | 200           |
| GET    | `/products/:id`       | Get product details            | 200, 404      |
| PATCH  | `/products/:id`       | Update product                 | 200, 400, 404 |
| DELETE | `/products/:id`       | Delete product                 | 204, 404      |
| PATCH  | `/products/:id/stock` | Update inventory levels        | 200, 400, 404 |

**Filtering Options:**

```bash
GET /products?search=phone&category=electronics&minPrice=100&maxPrice=1000&inStock=true
```

**Example Request with Variants:**

```http
POST /api/v1/products
Content-Type: application/json

{
  "name": "Premium Headphones",
  "price": 299.99,
  "category": "651a8b5c7d8a1b2c3d4e5f6a",
  "variants": [
    {
      "name": "Black",
      "sku": "HP-BLK-001",
      "stockCount": 100,
      "additionalCost": 0
    }
  ],
  "discount": 15
}
```

## Interactive Documentation

You can access the live Swagger UI for interactive API documentation at:

```
http://localhost:3000/api-docs
```

## Testing

### Automated Tests

Run the integration tests with the following command:

```bash
node test.js
```

### Manual Testing with Postman

1. Import the Postman collection from `/docs/Product_Catalog_API.postman_collection.json`
2. Set environment variables in Postman:

   ```json
   {
     "base_url": "http://localhost:3000/api/v1",
     "auth_token": "your-jwt-token-here"
   }
   ```

### Example cURL Commands

You can test the endpoints using `cURL`:

```bash
# Get all products
curl -X GET "http://localhost:3000/api/v1/products"

# Create new category
curl -X POST "http://localhost:3000/api/v1/categories" \
  -H "Content-Type: application/json" \
  -d '{"name":"Furniture","description":"Home furniture"}'
```

## Limitations

1. **Authentication**: Currently not implemented. In production, JWT (JSON Web Token) will be used for authentication.
2. **Image Uploads**: Currently, the API only accepts image URLs. Future implementation will integrate services like Cloudinary or AWS S3 for direct image uploads.
3. **Pagination**: Default limit of 100 items per page.
4. **Performance**: No caching layer implemented.
5. **Payments**: No payment gateway integration for processing transactions.

## Contact

For questions or support, please contact:

* **Daniel IRYIVUZE**
* **Email**: [d.iryivuze@alustudent.com](mailto:d.iryivuze@alustudent.com)
* **GitHub**: [Daniel-IRYIVUZE](https://github.com/Daniel-IRYIVUZE)

---
