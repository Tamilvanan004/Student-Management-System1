# Student Management System

A portfolio-ready full-stack Student Management System for managing student records through a protected administrator dashboard.

## Stack

- Frontend: HTML5, CSS3, vanilla JavaScript
- Backend: Node.js, Express 5
- Database: MySQL 8+
- Authentication: database-backed sessions with cryptographically random bearer tokens and scrypt password hashing
- Tests: Node.js built-in test runner
- CI: GitHub Actions

## Features

- Real administrator login/logout
- Protected student CRUD APIs
- Search, department/year filters and database pagination
- Live dashboard totals and recent-student data
- Duplicate Student ID/email protection
- Server-side request validation
- Safe API error responses
- Editable administrator profile and password change
- Environment-based DB and CORS configuration
- Database/admin bootstrap scripts
- Health endpoint: `GET /api/health`

## Local setup

1. Install and start MySQL.
2. In `backend`, copy `.env.example` to `.env` and enter your MySQL settings.
3. Install dependencies:

```bash
cd backend
npm install
```

4. Create/update the database schema:

```bash
npm run db:setup
```

5. Set `ADMIN_NAME`, `ADMIN_EMAIL` and a strong `ADMIN_PASSWORD` in `backend/.env`, then create the administrator:

```bash
npm run admin:create
```

6. Start the backend:

```bash
npm run dev
```

7. Open `frontend/index.html` using VS Code Live Server. Default allowed origins are `http://127.0.0.1:5500` and `http://localhost:5500`. Add your actual Live Server origin to `FRONTEND_ORIGINS` when needed.

## API

Authentication: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `PUT /api/auth/profile`, `PUT /api/auth/password`.

Students: `GET /api/students`, `GET /api/students/stats/summary`, `GET /api/students/:id`, `POST /api/students`, `PUT /api/students/:id`, `DELETE /api/students/:id`.

All student endpoints require `Authorization: Bearer <token>`.

## Tests

```bash
cd backend
npm test
```

For a public production deployment, add HTTPS termination, rate limiting, centralized logging, managed secrets and proper database migrations.
