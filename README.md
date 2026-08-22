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

## 🔐 Environment configuration

Copy the safe templates; do not commit the resulting `.env` files.

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

For development, use `NODE_ENV=development`, `CLIENT_URL=http://localhost:5173`, and `VITE_API_URL=http://localhost:5000/api`.

For production, set these values in your hosting provider's environment-variable settings (not in source control):

- `NODE_ENV=production`
- `PORT` — the port your backend host exposes to the application.
- `MONGO_URI` — MongoDB Atlas application connection string.
- `JWT_SECRET` — a new long, cryptographically random secret.
- `JWT_EXPIRE` — for example, `7d`.
- `CLIENT_URL` — your final HTTPS frontend origin, with no trailing slash.
- `RESEND_API_KEY` — Resend API key; backend only.
- `RESEND_FROM_EMAIL` — an address at a domain verified in Resend.
- `VITE_API_URL` — public HTTPS backend API URL ending in `/api`; this is frontend build-time configuration only and must contain no secret.

The backend refuses to start if a required backend variable is missing. `VITE_` variables are embedded in the frontend build, so never put a secret in one.

## 🐳 Docker deployment

The supplied Dockerfiles are required deployment files. The frontend is built by Nginx and includes an SPA fallback for React Router. Build the frontend with its public API URL and start the stack after entering the backend variables in `backend/.env`:

```bash
export VITE_API_URL='https://<your-api-host>/api'
docker compose build --pull
docker compose up -d
curl --fail https://<your-api-host>/api/healthcheck
```

For a non-Docker backend host:

```bash
cd backend
npm ci --omit=dev
NODE_ENV=production npm start
```

For a static frontend host:

```bash
cd frontend
npm ci
VITE_API_URL='https://<your-api-host>/api' npm run build
```

When you buy a domain, set `CLIENT_URL` to its final frontend origin and set `VITE_API_URL` to the final backend API URL, configure your DNS/TLS/reverse proxy or host routing, and verify the sender domain in Resend. No source-code change is required.

## 🛡️ Security

AuthNest uses several security practices including password hashing, JWT authentication, protected routes, input validation, HTTP-only cookies, CORS configuration, rate limiting, and centralized error handling.

## 🔮 Planned Features

* Multi-device logout
* Google OAuth / OpenID Connect
* Zod validation
* Zustand state management
* TypeScript migration

## 📄 License

This project is licensed under the MIT License.
