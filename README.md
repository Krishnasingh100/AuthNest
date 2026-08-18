# 🔐 AuthNest

A secure full-stack authentication system built with React, Node.js, Express.js, and MongoDB.

AuthNest is designed to demonstrate modern authentication and security practices in a MERN-stack application, with a focus on secure user authentication, authorization, API security, and clean project architecture.

## 🚀 Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Security

* JWT-based authentication
* bcrypt password hashing
* Protected routes
* Input validation
* HTTP-only cookies
* CORS configuration
* Rate limiting
* Centralized error handling
* Environment-based configuration

## 📁 Project Structure

```text
AuthNest/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/Krishnasingh100/AuthNest.git
cd AuthNest
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Never commit your actual `.env` file or sensitive credentials to GitHub.

## 🛡️ Security

AuthNest uses several security practices including password hashing, JWT authentication, protected routes, input validation, HTTP-only cookies, CORS configuration, rate limiting, and centralized error handling.

## 🔮 Planned Features

* Email verification
* Password reset
* Multi-device logout
* Google OAuth / OpenID Connect
* Zod validation
* Nodemailer email service
* Zustand state management
* Docker support
* TypeScript migration

## 📄 License

This project is licensed under the MIT License.
