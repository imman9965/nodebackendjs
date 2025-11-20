# Rebuilt Stored-Procedure Express Project

## Quick start
1. Create the database and run SQL in `sql/stored_procedures.sql`.
2. Copy `.env.example` to `.env` and set values.
3. `npm install`
4. `npm run dev` or `npm start`

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (protected)
- POST /api/users (protected)
- GET /api/users (protected)
- GET /api/users/:id (protected)
- PUT /api/users/:id (protected)
- DELETE /api/users/:id (protected)
