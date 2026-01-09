# AI Website Builder - Backend

Backend API for AI Website Builder MVP built with Node.js and Express.

## 🚀 Features

- RESTful API architecture
- Mock endpoints for website generation, preview, payment, and deployment
- Input validation and error handling
- CORS and security middleware (Helmet)
- Standardized API responses
- Environment-based configuration

## 📁 Project Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Custom middleware
├── routes/          # API routes
├── utils/           # Utility functions
├── server.js        # Entry point
├── package.json     # Dependencies
└── .env.example     # Environment variables template
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration (mock values work for now):

```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
FRONTEND_URL=http://localhost:3000
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status and uptime

### Website Generation
- **POST** `/api/generate`
- **Body:**
  ```json
  {
    "businessName": "My Business",
    "businessType": "E-commerce",
    "description": "Online store for products",
    "features": ["Shopping cart", "Payment gateway"]
  }
  ```
- **Response:** Generated website with HTML/CSS/JS

### Preview
- **GET** `/api/preview/:id`
- Returns website preview data by ID

### Payment
- **POST** `/api/payment/create-order`
- **Body:**
  ```json
  {
    "amount": 499,
    "websiteId": "web_123"
  }
  ```
- **Response:** Mock Razorpay order

- **POST** `/api/payment/verify`
- **Body:**
  ```json
  {
    "orderId": "order_123",
    "paymentId": "pay_123",
    "signature": "signature_123",
    "websiteId": "web_123"
  }
  ```
- **Response:** Payment verification status

### Deployment
- **POST** `/api/deploy`
- **Body:**
  ```json
  {
    "websiteId": "web_123",
    "deploymentType": "auto"
  }
  ```
- **Response:** Deployment status and URL

## 🧪 Testing

Use tools like Postman, Insomnia, or curl to test the endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Generate website
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Business",
    "businessType": "Portfolio",
    "description": "Personal portfolio website"
  }'
```

## 📝 Notes

- All endpoints currently return **mock data**
- No database integration yet (using in-memory storage)
- No actual Gemini AI or Razorpay integration
- Ready for frontend integration

## 🔜 Next Steps

1. Integrate Google Gemini API for actual content generation
2. Add database (MongoDB/PostgreSQL) for data persistence
3. Implement Razorpay payment gateway
4. Add authentication and user management
5. Implement actual deployment logic

## 🛡️ Security

- Helmet.js for security headers
- CORS configured for frontend origin
- Input validation on all endpoints
- Environment variables for sensitive data

---

Built with ❤️ for AI Website Builder MVP
