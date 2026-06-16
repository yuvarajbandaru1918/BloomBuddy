# BloomBuddy Backend

Backend API for BloomBuddy with user authentication and database integration.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string and JWT secret:
```
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/bloom-buddy?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Set Up MongoDB
- Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- Create a cluster and database
- Get your connection string and add it to `.env`

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Response:
{
  "message": "Logged out successfully"
}
```

## Database Schema

### User Collection
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed, required),
  firstName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features
- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Input validation with express-validator
- ✅ CORS enabled for frontend integration
- ✅ Environment variables for sensitive data

## Frontend Integration

Add the following to your React frontend:

### Example Login Request
```javascript
const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      // Redirect to dashboard
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Next Steps
1. Create React login/signup components
2. Set up frontend authentication context
3. Add more API routes for features
4. Deploy backend to production (Heroku, Railway, Render, etc.)
