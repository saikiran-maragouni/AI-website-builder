# AI Website Builder

An AI-powered website builder that generates professional, responsive websites using Google Gemini AI and professional templates.

## 🌟 Features

- **Hybrid Template System**: Combines professional HTML/CSS templates with AI-generated content
- **4 Professional Templates**: Restaurant, E-commerce, Portfolio, and Services
- **AI Content Generation**: Uses Google Gemini 2.5 Flash for unique, relevant content
- **Responsive Design**: Mobile-first, modern CSS with smooth animations
- **Fast Generation**: 5-10 seconds per website
- **Database Storage**: Stores both JSON content and final HTML/CSS/JS
- **Future-Ready**: Schema versioning and editable flags for future enhancements

## 🏗️ Architecture

```
User Input → Gemini AI (JSON) → Template Engine → Complete Website → Database
```

### Tech Stack

**Backend:**
- Node.js + Express
- Google Gemini AI (2.5 Flash)
- Supabase (PostgreSQL)
- Template Engine (custom)

**Frontend:**
- React + Vite
- Tailwind CSS
- Modern responsive design

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Google Gemini API key

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd AI-Website-Builder
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update `.env` with your credentials:

```env
PORT=5000
NODE_ENV=development

# Google Gemini API
GEMINI_API_KEY=your_actual_gemini_api_key

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Razorpay Configuration (optional for MVP)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup

Run the migration in your Supabase SQL Editor:

```sql
-- File: backend/migrations/add_hybrid_columns.sql
-- Creates generated_sites table with required columns
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

### 5. Run the Application

**Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## 📁 Project Structure

```
AI-Website-Builder/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Validation, error handling
│   ├── routes/          # API routes
│   ├── services/        # Business logic (Gemini, Database)
│   ├── templates/       # HTML/CSS/JS templates
│   ├── utils/           # Helper functions (Template Engine)
│   ├── migrations/      # Database migrations
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── services/    # API integration
    │   └── App.jsx      # Main app
    └── vite.config.js   # Vite configuration
```

## 🎨 Templates

### Available Templates

1. **Restaurant** - For cafes, restaurants, food businesses
2. **E-commerce** - For online stores, shops
3. **Portfolio** - For personal portfolios, freelancers
4. **Services** - For agencies, professional services

### Template Selection

Templates are automatically selected based on business type:
- `restaurant/cafe/food` → Restaurant template
- `ecommerce/shop/store` → E-commerce template
- `portfolio/personal/freelance` → Portfolio template
- `services/agency/consulting` → Services template

## 🔧 API Endpoints

### Generate Website
```http
POST /api/generate
Content-Type: application/json

{
  "businessName": "Bella Italia",
  "businessType": "Restaurant",
  "description": "Authentic Italian restaurant...",
  "features": ["Fresh ingredients", "Wood-fired pizza"]
}
```

### Get Preview
```http
GET /api/preview/:id
```

## 📊 Database Schema

### `generated_sites` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Auto-generated primary key |
| `business_name` | TEXT | Business name |
| `business_type` | TEXT | Business category |
| `description` | TEXT | Business description |
| `html` | TEXT | Generated HTML |
| `css` | TEXT | Generated CSS |
| `js` | TEXT | Generated JavaScript |
| `content_json` | JSONB | AI-generated JSON content |
| `template_name` | TEXT | Template used |
| `created_at` | TIMESTAMP | Creation timestamp |

## 🧪 Testing

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Fill in the form with business details
4. Click "Generate Website"
5. View the generated website in Live Preview tab
6. Switch to Code View to see HTML/CSS/JS

## 🔒 Security

- ✅ Environment variables for all secrets
- ✅ `.env` in `.gitignore`
- ✅ No hardcoded credentials
- ✅ `.env.example` with placeholders
- ✅ Proper CORS configuration

## 📝 Environment Variables

Required environment variables are documented in `.env.example`. Never commit your actual `.env` file.

## 🚀 Deployment

### Backend
- Deploy to Render, Railway, or any Node.js hosting
- Set environment variables in hosting platform
- Ensure Supabase is accessible

### Frontend
- Deploy to Vercel, Netlify, or similar
- Update `FRONTEND_URL` in backend `.env`
- Configure CORS accordingly

## 🛠️ Future Enhancements

- [ ] More templates (blog, landing page, etc.)
- [ ] Template customization options
- [ ] Color scheme selector
- [ ] Hybrid content editor
- [ ] Multi-page websites
- [ ] Image generation integration
- [ ] SEO optimization

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Google Gemini AI**
