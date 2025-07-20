# Product Catalog API Assignment

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green?logo=mongodb)
![Swagger](https://img.shields.io/badge/Swagger-3.0-lightgreen?logo=swagger)

A complete **RESTful API** for **e-commerce product management**, featuring advanced inventory tracking, flexible product variants, search and filtering, and auto-generated documentation.

## 🎥 Video Walkthrough

[![API Demo Video](https://img.shields.io/badge/Watch_Demo-Video_Link-red)](https://youtu.be/PubWfMPZ7Tw)

---

## Features

* **Full CRUD** operations for products and categories
* **Inventory Management** with product variants (e.g., size, color)
* **Advanced Filtering/Search** by name, category, price, and availability
* **Discount Pricing** support
* **Real-time Stock Update**
* **Swagger UI** documentation
* **Input Validation & Error Handling** for robust API integrity

---

## Project Structure

```
product-catalog-api/
├── config/             # App configuration (e.g., logger, constants)
├── controllers/        # Route logic for product/category/report
├── middleware/         # Error handlers, logging, etc.
├── models/             # Mongoose schemas
├── node_modules/       # Node dependencies
├── routes/             # Express route definitions
│   ├── categories.js
│   ├── products.js
│   ├── reports.js
│   └── index.js        # Route entry point
├── utils/              # Helper functions/utilities
├── validations/        # Joi validation schemas
├── .env                # Environment variables
├── app.js              # Express app setup
├── generate-swagger.js # Script to auto-generate Swagger docs
├── package.json        # Project metadata & dependencies
├── server.js           # Main server entry point
├── swagger.js          # Swagger config
├── swagger.json        # Generated OpenAPI spec
├── test.js             # Simple test runner
└── README.md           # Project documentation
```

---

## Setup & Installation

### Prerequisites

Ensure you have the following installed:

* **Node.js v18+**
* **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
* **Git**

---

### 🚀 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Daniel-IRYIVUZE/product-catalog-api.git
cd product-catalog-api
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure `.env`

```bash
cp .env.example .env
```

Fill in:

```env
MONGODB_URI=mongodb://localhost:27017/product-catalog
JWT_SECRET=your-jwt-secret-key
PORT=3000
```

#### 4. Generate Swagger Docs

```bash
node generate-swagger.js
```

#### 5. Start the Server

```bash
npm run dev
```

#### 6. Production

```bash
npm start
```

---

## API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

---

### Categories Endpoints

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | `/categories`     | Create category     |
| GET    | `/categories`     | List all categories |
| GET    | `/categories/:id` | Get single category |
| PATCH  | `/categories/:id` | Update a category   |
| DELETE | `/categories/:id` | Delete a category   |

---

### Products Endpoints

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/products`           | Create product     |
| GET    | `/products`           | Get all products   |
| GET    | `/products/:id`       | Get single product |
| PATCH  | `/products/:id`       | Update product     |
| DELETE | `/products/:id`       | Delete product     |
| PATCH  | `/products/:id/stock` | Update stock count |

**Example Search Query:**

```
/products?search=phone&category=electronics&minPrice=100&maxPrice=500&inStock=true
```

---

### Testing

#### Run All Tests

```bash
node test.js
```

#### Manual Testing with Postman

* Import the collection from: `docs/Product_Catalog_API.postman_collection.json`
* Example Postman environment:

```json
{
  "base_url": "http://localhost:3000/api/v1",
  "auth_token": "your-jwt-token"
}
```

---

### Example cURL

```bash
curl -X GET http://localhost:3000/api/v1/products

curl -X POST http://localhost:3000/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Furniture","description":"Home items"}'
```

---

## Limitations

* No authentication yet (JWT planned)
* Image uploads via URL only (Cloudinary planned)
* Pagination with default limit 100
* No caching or rate limiting
* No payment integrations

---

## Contact

* **Name**: Daniel IRYIVUZE
* **Email**: [d.iryivuze@alustudent.com](mailto:d.iryivuze@alustudent.com)
* **GitHub**: [Daniel-IRYIVUZE](https://github.com/Daniel-IRYIVUZE)

---