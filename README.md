# Aura Finance Backend

A Node.js Express API server for the Aura Finance application.

## Features

- ✅ Express.js REST API
- ✅ TypeScript support
- ✅ MongoDB with Mongoose
- ✅ CORS enabled
- ✅ Environment configuration
- ✅ Hot reload with nodemon

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:
   Edit `.env` file with your MongoDB connection string:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aura-finance
NODE_ENV=development
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm start
```

## API Endpoints

### Health Check

- `GET /` - API information
- `GET /api/health` - Health check

### Transactions

- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id/budget` - Update category budget
- `DELETE /api/categories/:id` - Delete category

## Project Structure

```
src/
├── index.ts           # Main application file
├── models/            # MongoDB models
│   ├── Transaction.ts
│   └── Category.ts
└── routes/            # API routes
    ├── transactions.ts
    └── categories.ts
```

## Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- CORS
- dotenv
