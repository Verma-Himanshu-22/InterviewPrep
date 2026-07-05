# InterviewPrep - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Authentication Flow](#authentication-flow)
8. [Key Features](#key-features)
9. [Environment Variables](#environment-variables)
10. [Security Considerations](#security-considerations)
11. [Error Handling](#error-handling)
12. [Setup & Deployment](#setup--deployment)

---

## Project Overview

**InterviewPrep** is an AI-powered interview preparation platform that helps candidates practice mock interviews with realistic AI-driven conversations, receive instant feedback, and track their performance over time.

### Core Capabilities
- Resume-based interview generation
- Real-time voice recognition and AI-driven questions
- Performance analytics with scoring metrics
- Interview history tracking
- PDF report generation
- Premium credit-based system with Razorpay integration

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                │
│  - Redux State Management                               │
│  - Motion animations                                    │
│  - Tailwind CSS responsive design                       │
│  - Firebase Authentication                              │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/CORS
┌────────────────────▼────────────────────────────────────┐
│                 EXPRESS SERVER (Node.js)                │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Routes:                                          │   │
│  │ - /api/auth (Google OAuth + Logout)             │   │
│  │ - /api/user (Current user)                      │   │
│  │ - /api/interview (Resume, questions, answers)   │   │
│  │ - /api/payment (Orders & verification)          │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │ Mongoose ODM
┌────────────────────▼────────────────────────────────────┐
│              MONGODB ATLAS DATABASE                     │
│  - Users Collection                                     │
│  - Interviews Collection                                │
│  - Payments Collection                                  │
└─────────────────────────────────────────────────────────┘
                     │
         ┌───────────┴──────────────┐
         │                          │
    ┌────▼──────┐          ┌────────▼────┐
    │ Firebase  │          │  Razorpay   │
    │ Auth & DB │          │  Payment    │
    └───────────┘          └─────────────┘
```

---

## Tech Stack

### Frontend
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 19.2.0 | Component-based UI |
| **Build Tool** | Vite 7.3.1 | Lightning-fast bundler |
| **Styling** | Tailwind CSS 4.1.18 | Utility-first CSS |
| **State Management** | Redux Toolkit 2.11.2 | Global state |
| **Routing** | React Router 7.13.0 | Client-side routing |
| **Animations** | Motion (Framer) 12.42.2 | Smooth animations |
| **HTTP Client** | Axios 1.13.5 | API requests |
| **Authentication** | Firebase 12.9.0 | Google OAuth |
| **Icons** | React Icons 5.5.0 | Icon library |
| **Charts** | Recharts 3.7.0 | Performance graphs |
| **PDF Generation** | jsPDF 4.2.0 | Report exports |
| **Progress Bars** | React Circular Progressbar 2.2.0 | Score visualization |
| **Font** | Poppins (Google Fonts) | Modern typography |

### Backend
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js | JavaScript runtime |
| **Framework** | Express 5.2.1 | REST API server |
| **Database** | MongoDB 9.2.1 | NoSQL database |
| **ODM** | Mongoose 9.2.1 | Schema validation |
| **Authentication** | JWT 9.0.3 | Token-based auth |
| **Payment Gateway** | Razorpay 2.9.6 | Payment processing |
| **Middleware** | Cookie Parser | Cookie handling |
| **CORS** | cors 2.8.6 | Cross-origin requests |
| **File Upload** | Multer 2.0.2 | Resume file handling |
| **PDF Processing** | pdfjs-dist 5.4.624 | Resume parsing |
| **AI Integration** | OpenRouter API | LLM for questions/feedback |
| **Environment** | Dotenv 17.3.1 | Config management |
| **Dev Tool** | Nodemon 3.1.11 | Auto-restart on changes |

---

## Project Structure

```
3.interviewIQ/
├── client/                          # Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation with auth check
│   │   │   ├── Footer.jsx          # Footer section
│   │   │   ├── AuthModel.jsx       # Auth modal component
│   │   │   ├── Step1SetUp.jsx      # Interview setup form
│   │   │   ├── Step2Interview.jsx  # Live interview UI
│   │   │   ├── Step3Report.jsx     # Results & analytics
│   │   │   └── Timer.jsx           # Countdown timer
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Auth.jsx            # Google OAuth page
│   │   │   ├── InterviewPage.jsx   # Interview flow coordinator
│   │   │   ├── InterviewHistory.jsx # Past interviews list
│   │   │   ├── Pricing.jsx         # Credit plans
│   │   │   └── InterviewReport.jsx # Interview details
│   │   ├── redux/
│   │   │   ├── store.js            # Redux store config
│   │   │   └── userSlice.js        # User state slice
│   │   ├── utils/
│   │   │   └── firebase.js         # Firebase config
│   │   ├── assets/
│   │   │   └── videos/             # AI avatar videos
│   │   ├── App.jsx                 # Main routes
│   │   ├── App.css                 # Global styles
│   │   ├── index.css               # Tailwind & fonts
│   │   └── main.jsx                # Entry point
│   ├── .env                        # Environment variables
│   ├── .env.example                # Template
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend Application
│   ├── config/
│   │   ├── connectDb.js            # MongoDB connection
│   │   └── token.js                # JWT generation
│   ├── models/
│   │   ├── user.model.js           # User schema
│   │   ├── interview.model.js      # Interview schema
│   │   └── payment.model.js        # Payment schema
│   ├── controllers/
│   │   ├── auth.controller.js      # Google OAuth & logout
│   │   ├── user.controller.js      # Get current user
│   │   ├── interview.controller.js # Interview logic
│   │   └── payment.controller.js   # Payment handling
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   ├── interview.route.js
│   │   └── payment.route.js
│   ├── middlewares/
│   │   ├── isAuth.js               # JWT verification
│   │   └── multer.js               # File upload config
│   ├── services/
│   │   ├── openRouter.service.js   # AI API calls
│   │   └── razorpay.service.js     # Payment SDK
│   ├── .env                        # Environment variables
│   ├── .env.example                # Template
│   ├── index.js                    # Server entry
│   └── package.json
│
├── .gitignore                      # Git exclusions
├── TECHNICAL_DOCS.md               # This file
└── README.md                       # Project overview
```

---

## Database Schema

### 1. User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  credits: Number (default: 100),
  createdAt: Date,
  updatedAt: Date
}
```
**Purpose**: Stores user account information and credit balance.

### 2. Interview Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  role: String (required),                    // e.g., "Full Stack Developer"
  experience: String (required),              // e.g., "2 years"
  mode: String (enum: ["HR", "Technical"]),
  resumeText: String,
  questions: [
    {
      question: String,
      difficulty: String (easy|medium|hard),
      timeLimit: Number (seconds),
      answer: String,
      feedback: String,
      score: Number (0-10),
      confidence: Number (0-10),
      communication: Number (0-10),
      correctness: Number (0-10)
    }
  ],
  finalScore: Number (0-10),
  status: String (enum: ["incomplete", "completed"], default: "incomplete"),
  createdAt: Date,
  updatedAt: Date
}
```
**Purpose**: Stores interview sessions, questions, and performance metrics.

### 3. Payment Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  planId: String,                             // free|basic|pro
  amount: Number (INR),
  credits: Number,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: String (enum: ["created", "paid", "failed"], default: "created"),
  createdAt: Date,
  updatedAt: Date
}
```
**Purpose**: Tracks payment transactions and credit purchases.

---

## API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/google` | ❌ | Google OAuth login/signup |
| GET | `/logout` | ✅ | Logout & clear token |

**Auth Flow**:
1. Client sends Google token + user data to `/api/auth/google`
2. Server creates/finds user in DB
3. Server generates JWT and sets httpOnly cookie
4. User logged in, token persists across requests

### User Routes (`/api/user`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/current-user` | ✅ | Get logged-in user data |

### Interview Routes (`/api/interview`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/resume` | ✅ | Parse resume PDF, extract data |
| POST | `/generate-questions` | ✅ | Generate 5 AI questions (50 credits) |
| POST | `/submit-answer` | ✅ | Submit answer, get AI feedback |
| POST | `/finish` | ✅ | Calculate final score |
| GET | `/get-interview` | ✅ | Get user's interview history |
| GET | `/report/:id` | ✅ | Get detailed interview report |

### Payment Routes (`/api/payment`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/order` | ✅ | Create Razorpay order |
| POST | `/verify` | ✅ | Verify payment & add credits |

---

## Authentication Flow

### Login Flow
```
1. User clicks "Continue with Google" on Auth page
2. Firebase.signInWithPopup() opens Google OAuth
3. User authorizes & gets Firebase token
4. Client sends {name, email} to /api/auth/google
5. Server creates/finds user in MongoDB
6. Server generates JWT token
7. Server sets httpOnly cookie: res.cookie("token", jwt, {httpOnly: true, ...})
8. User data sent back, Redux store updated
9. User redirected to home page
```

### Request Authentication
```
1. Client makes authenticated request (axios with withCredentials)
2. Browser automatically attaches httpOnly cookie
3. Server extracts token from req.cookies.token
4. isAuth middleware verifies JWT with process.env.JWT_SECRET
5. req.userId set from decoded token
6. Request proceeds or 401/403 returned
```

### Cookie Security
```javascript
res.cookie("token", token, {
  httpOnly: true,    // Prevents XSS attacks
  secure: true,      // HTTPS only (production)
  sameSite: "none",  // Cross-site requests allowed
  maxAge: 7*24*60*60*1000  // 7 days
})
```

---

## Key Features

### 1. Resume Analysis
**File**: `server/controllers/interview.controller.js` → `analyzeResume()`
- Accepts PDF file via Multer (5MB limit)
- Uses pdfjs-dist to extract text from all pages
- Sends to OpenRouter AI for structured extraction
- Returns: role, experience, projects, skills
- Cleanup: Deletes temp file after processing

### 2. Question Generation
**File**: `server/controllers/interview.controller.js` → `generateQuestion()`
- Validates user has ≥50 credits
- Deducts 50 credits from user account
- Sends comprehensive prompt to OpenRouter AI
- AI generates 5 questions with difficulty progression:
  - Q1-2: Easy (60s each)
  - Q3-4: Medium (90s each)
  - Q5: Hard (120s)
- Creates Interview document in DB

### 3. Live Interview (Voice)
**File**: `client/src/components/Step2Interview.jsx`
- Web Speech API for voice input
- SpeechSynthesis API for AI voice output
- Question display with timer countdown
- Real-time transcription display
- Video background changes based on AI gender

### 4. Answer Evaluation
**File**: `server/controllers/interview.controller.js` → `submitAnswer()`
- Validates time limit not exceeded
- Sends question + answer to OpenRouter AI
- AI scores on: Confidence (0-10), Communication (0-10), Correctness (0-10)
- Calculates finalScore as average
- Stores feedback (10-15 words)
- Error handling for JSON parsing failures

### 5. Performance Report
**File**: `client/src/components/Step3Report.jsx`
- Circular progress for overall score
- Individual skill breakdowns (confidence, communication, correctness)
- Question-wise score visualization
- Recharts area chart for score progression
- PDF download with jsPDF + autoTable

### 6. Payment Integration
**File**: `server/controllers/payment.controller.js`
- Razorpay SDK integration
- Order creation with validation
- Payment signature verification using HMAC-SHA256
- Credit addition to user account on success
- Status tracking: created → paid → failed

---

## Environment Variables

### Client (`.env`)
```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Server (`.env`)
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## Security Considerations

### 1. Authentication & Authorization
✅ **JWT in httpOnly cookies** - Prevents XSS attacks
✅ **User ownership validation** - Check userId before returning data
✅ **Protected routes** - isAuth middleware on all sensitive endpoints
✅ **CORS configuration** - Only allow localhost:5173

### 2. Payment Security
✅ **HMAC signature verification** - Validate Razorpay signatures
✅ **Input validation** - Check amount, credits before processing
✅ **Idempotency** - Prevent duplicate credit additions

### 3. Data Protection
✅ **Resume files** - Deleted after processing
✅ **Sensitive data** - Never logged to console
✅ **Environment secrets** - Stored in .env (not in repo)

### 4. API Security
✅ **Rate limiting** - Should be added for production
✅ **Input sanitization** - Trim and validate all inputs
✅ **Error messages** - Don't expose internal errors to client

---

## Error Handling

### Backend Error Codes
| Code | Scenario | Example |
|------|----------|---------|
| 400 | Bad request | Missing required fields |
| 403 | Unauthorized | User accessing other's interview |
| 404 | Not found | Interview doesn't exist |
| 500 | Server error | AI API failure, DB error |

### Frontend Error Handling
- Payment failures show alert to user
- API errors caught in try-catch blocks
- Failed console logs for debugging
- Graceful fallbacks for missing data

---

## Setup & Deployment

### Local Development

**1. Clone Repository**
```bash
git clone <repo-url>
cd 3.interviewIQ
```

**2. Setup Client**
```bash
cd client
npm install
cp .env.example .env
# Fill in .env with Firebase keys
npm run dev
```

**3. Setup Server (new terminal)**
```bash
cd server
npm install
cp .env.example .env
# Fill in .env with MongoDB, JWT, Razorpay, OpenRouter keys
npm run dev
```

**4. Access Application**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

### Production Deployment

**Frontend (Vercel/Netlify)**
```bash
npm run build
# Deploy dist/ folder
```

**Backend (Render/Railway/Heroku)**
```bash
# Set environment variables in hosting platform
# Deploy from git repository
```

**Database (MongoDB Atlas)**
- Use managed MongoDB Atlas cluster
- Enable IP whitelist for production server

---

## Development Guidelines

### Code Standards
- Use ES6+ features (arrow functions, destructuring, async-await)
- Component naming: PascalCase (React), camelCase (utilities)
- Keep components focused and reusable
- Add comments for complex logic

### API Design
- RESTful endpoints (POST for create, GET for read, etc.)
- Consistent error response format
- Validate inputs before processing
- Use appropriate HTTP status codes

### Database
- Use Mongoose schema validation
- Add indexes on frequently queried fields
- Handle connection errors gracefully
- Clean up temporary data (resume files)

### Testing
- Test auth flow with different user scenarios
- Verify interview scoring accuracy
- Test payment verification with test cards
- Check file upload with various PDF sizes

---

## Performance Optimizations

- **Frontend**: Vite for fast HMR, lazy loading routes
- **Backend**: Database indexes, connection pooling
- **AI Calls**: Timeout on OpenRouter API requests
- **File Uploads**: 5MB limit on resume files
- **Caching**: User data cached in Redux

---

## Future Enhancements

1. **Video Recording** - Record interview for later review
2. **Peer Comparison** - Compare scores with other users
3. **Interview Categories** - Expand beyond HR/Technical
4. **Mobile App** - React Native version
5. **Live Coaching** - Real human interviews
6. **Advanced Analytics** - ML-based improvement suggestions
7. **API Rate Limiting** - Prevent abuse
8. **Database Caching** - Redis for faster queries
9. **Webhook Notifications** - Email on interview completion
10. **Localization** - Support multiple languages

---

## Support & Documentation

- **Firebase Docs**: https://firebase.google.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com
- **OpenRouter API**: https://openrouter.ai/docs
- **Razorpay API**: https://razorpay.com/docs

---

**Last Updated**: July 5, 2026
**Version**: 1.0
