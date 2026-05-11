````md
# Task Management System

A full-stack Task Management Application built using the MEAN stack (MongoDB, Express.js, Angular 19, Node.js) with JWT authentication, role-based authorization, and real-time updates using Socket.IO.

---

# Features

## Authentication & Authorization

- User Registration & Login
- JWT-based Authentication
- Protected API Routes
- Role-Based Access Control (RBAC)

### Roles

#### Manager

- View all users
- View all tasks
- Create/Edit/Delete any task
- Assign tasks to anyone
- Assign employees to team leads

#### Team Lead

- View own team members
- Create/Edit tasks
- Assign tasks to team members or self

#### Employee

- Create personal tasks
- Edit own tasks only
- Tasks auto-assign to self

---

# Task Management

- Create Tasks
- Edit Tasks
- Delete Tasks
- Task Status Filtering
- Real-Time Task Updates
- Responsive Dashboard UI

---

# Real-Time Features

Implemented using Socket.IO:

- Live task creation updates
- Live task editing updates
- Live task deletion updates
- Instant dashboard synchronization

---

# Tech Stack

## Frontend

- Angular 19 (Standalone Components)
- Tailwind CSS
- RxJS
- ngx-toastr
- Socket.IO Client

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO

## Database

- MongoDB Atlas

---

# Project Structure

## Backend

```bash
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
└── server.js
```

## Frontend

```bash
src/app/
├── core/
├── features/
├── guards/
├── layout/
├── shared/
└── app.routes.ts
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:4200
```

---

# Backend Installation

```bash
git clone <backend-repo-url>

cd task-manager-backend

npm install
```

## Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Installation

```bash
git clone <frontend-repo-url>

cd task-manager-frontend

npm install
```

## Run Frontend

```bash
ng serve
```

Frontend runs on:

```bash
http://localhost:4200
```

---

# API Endpoints

## Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

---

## Tasks

| Method | Endpoint              | Description |
| ------ | --------------------- | ----------- |
| GET    | /api/tasks            | Get tasks   |
| POST   | /api/tasks            | Create task |
| PATCH  | /api/tasks/:id        | Update task |
| DELETE | /api/tasks/:id        | Delete task |
| PATCH  | /api/tasks/:id/assign | Assign task |

---

## Users

| Method | Endpoint                        | Description             |
| ------ | ------------------------------- | ----------------------- |
| GET    | /api/users                      | Get all users           |
| GET    | /api/users/team                 | Get team members        |
| PATCH  | /api/users/:id/assign-team-lead | Assign employee to lead |

---

# Screenshots

## Login Page

(Add screenshot here)

## Dashboard

(Add screenshot here)

## Task Management

(Add screenshot here)

## User Management

(Add screenshot here)

---

# Deployment

## Frontend

Recommended: Vercel

## Backend

Recommended: Render

## Database

MongoDB Atlas

---

# Future Improvements

- Dark Mode
- Drag & Drop Tasks
- Task Comments
- Notifications
- Activity Logs
- Pagination
- Search & Sorting
- File Attachments

---

# Author

Vishal Singh

- GitHub: https://github.com/vishalsinghlab
- LinkedIn: https://linkedin.com/in/vishal-singh-b57b7b109

---
````

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
