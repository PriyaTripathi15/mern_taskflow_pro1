# MERN Taskflow Pro

A full-stack task management app built with MongoDB, Express, React, and Node.js. It includes user authentication, task CRUD, and an admin panel for managing users.

## Features

- Public landing page with login and register actions
- JWT-based authentication
- User task dashboard with add, update, complete, and delete actions
- Admin panel for viewing and managing users
- Seed script for demo data
- Custom responsive frontend UI

## Project Structure

- `backend/` - Express API, MongoDB models, controllers, middleware
- `frontend/` - React app built with Vite

## Requirements

- Node.js 18 or newer
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

### 1. Backend

```bash
cd backend
npm install
npm start
```

Create or update `backend/.env` with your MongoDB connection string:

```env
MONGO_URI=mongodb://localhost:27017/mern_taskflow_pro
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

## Seed Demo Data

To populate the database with an admin user, regular users, and sample tasks:

```bash
cd backend
node seed.js
```

Demo credentials created by the seed script:

- Admin: `admin@example.com` / `admin123`
- User: `john@example.com` / `user123`
- User: `jane@example.com` / `user123`
- User: `mike@example.com` / `user123`

## Scripts

### Backend

- `npm start` - start the API server

### Frontend

- `npm run dev` - start the Vite dev server
- `npm run build` - build the frontend for production
- `npm run lint` - run ESLint

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/admin/users`
- `PUT /api/admin/users/:id`
- `DELETE /api/admin/users/:id`

## Notes

- The backend expects `MONGO_URI` in `backend/.env`.
- The seed script clears existing users and tasks before inserting demo data.
