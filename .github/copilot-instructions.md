# Copilot Instructions: sp-express-postgres-auth

## Project Overview
This is a Node.js/Express REST API with PostgreSQL backend using stored procedures for data operations. The architecture enforces separation of concerns with routes → controllers → services → repositories, each layer calling the database only through stored procedures.

## Architecture & Key Patterns

### Layered Architecture
- **Routes** (`src/routes/*.routes.js`): Define endpoints and delegate to controllers
- **Controllers** (`src/controllers/*.controller.js`): Extract request data, call services, handle responses
- **Services** (`src/services/*.service.js`): Core business logic, validation, authentication (e.g., bcrypt hashing)
- **Repositories** (`src/repositories/*.repository.js`): **Only layer that touches database via stored procedures**
- **Middleware** (`src/middleware/`): JWT authentication via Bearer tokens

### Database Layer - Stored Procedures
All database operations use PostgreSQL stored procedures defined in `sql/stored_procedures.sql`:
- `sp_register_user(name, email, hashed_password)` → handles user creation
- `sp_login_user(email)` → retrieves user for password verification
- `sp_add_user(name, email, hashed_password)` → POST create (uses same SP as register)
- `sp_get_users()`, `sp_get_user(id)`, `sp_update_user(id, name, email)`, `sp_delete_user(id)`

Repository methods call these SPs and transform output (e.g., `out_id` → `id`).

### Authentication Pattern
1. JWT tokens store user ID: `jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '2d' })`
2. Protected routes use `auth.middleware.js` to verify Bearer tokens
3. Password hashing always uses `bcryptjs` with salt rounds of 10

## Essential Configuration

### Environment Variables (.env)
```
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-secret-key
PORT=3000
```

Uses `DATABASE_URL` connection string (modern approach) with `ssl: { rejectUnauthorized: false }` for cloud databases.

### Development Commands
- `npm run dev` — starts with nodemon (auto-reload on file changes)
- `npm start` — production run
- Must run SQL setup from `sql/stored_procedures.sql` before first run

## Common Developer Tasks

### Adding a New User Endpoint
1. Add SP to `sql/stored_procedures.sql`
2. Create repository method in `src/repositories/user.repository.js` calling the SP
3. Add service method in `src/services/user.service.js` with business logic/validation
4. Add controller method in `src/controllers/user.controller.js` to parse request
5. Add route in `src/routes/user.routes.js` and include in `src/app.js`

### Modifying Authentication
- Change JWT expiry in `src/utils/generateToken.js`
- Adjust bcrypt rounds in `src/services/auth.service.js`
- Token format always: `Authorization: Bearer <token>`

### Debugging Repository Queries
- Repository methods call `pool.query('SELECT sp_name($1, $2, ...)', [params])`
- Responses have `{ rows }` structure; stored procedures return rows with `out_` prefixed columns
- Check `sql/stored_procedures.sql` for SP column names when mapping results

## Critical Notes
- **No business logic in repositories** — they only call SPs and map fields
- **Services validate inputs** before calling repositories (see `auth.service.js` for validation pattern)
- **Controllers never access database directly** — always via services
- **Error handling**: Basic global error handler in `src/app.js` catches unhandled errors; consider more specific error classes for larger projects
