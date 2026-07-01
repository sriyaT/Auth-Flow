# Auth-Flow
Full-stack authentication system built with React, Node.js, PostgreSQL, JWT, bcrypt, and Nodemailer featuring login, registration, protected routes, and password reset via email.

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Forgot Password
- Password Reset via Email
- Password Hashing with bcrypt
- PostgreSQL Database Integration

## Tech Stack

Frontend:
- React
- React Router
- Redux Toolkit
- Tailwind CSS

Backend:
- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- Nodemailer

## Screenshots

- Register Page :

<img width="381" height="661" alt="register" src="https://github.com/user-attachments/assets/5cf635b5-d5ec-4b3b-a1b9-5dd3fd04b153" />

- Login Page :
  
 <img width="353" height="521" alt="loginpage" src="https://github.com/user-attachments/assets/36b6f766-0f96-4c05-89be-d27eeb502c56" />

- Forgot Password:

  <img width="383" height="559" alt="forgot Password" src="https://github.com/user-attachments/assets/1c934e73-a762-450b-baa1-af24d60aaf9c"   />
  
- Reset Password Page :

  <img width="373" height="474" alt="resetPassword" src="https://github.com/user-attachments/assets/57a5c565-f1f9-4bb5-8e2b-140bc42ab7ea" />

- Profile Page :

  <img width="264" height="549" alt="profile" src="https://github.com/user-attachments/assets/5deafcc4-7b21-4a43-8106-075c2afb69be" />

- Dashboard Page :

 <img width="438" height="459" alt="home" src="https://github.com/user-attachments/assets/4978c2d1-c3be-4d85-99af-6e5b36665337" />

- Home Page:

<img width="677" height="592" alt="home--" src="https://github.com/user-attachments/assets/f9e14e54-dab4-4de0-a8d3-e76f30ea40aa" />

## Installation & Setup

Setting up Backend:

# creake a project folder, same place we will have auth-backend as backend folder and auth-frontend as frontend folder.
mkdir auth-project
cd auth-project

mkdir auth-backend
mkdir auth-frontend

cd auth-backend

mkdir server
cd server

npm init -y

Install dependencies:
npm install express pg bcrypt dotenv cors
npm install -D nodemon

<img width="362" height="321" alt="ins1" src="https://github.com/user-attachments/assets/dbd42c34-0112-40fa-8e83-153503419157" />

<img width="382" height="359" alt="backendfolderstruct" src="https://github.com/user-attachments/assets/105a4250-678b-42f0-b82b-ce79f1d67624" />

# Create Postgressql DB:

Install PostgreSQL locally.
Create database:
CREATE DATABASE auth_project;
Create users table:

# Configure Environment Variables

.env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=auth_project

** Very Important
Never commit this file.
Add .gitignore
node_modules
.env

# Create DB Connection

src/db/db.js
const { Pool } = require("pg");

const pool = new Pool({
 host: process.env.DB_HOST,
 port: process.env.DB_PORT,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
});

module.exports = pool;

# Create Express App

src/app.js
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
 cors({
   origin: "http://localhost:5173",
   credentials: true,
 })
);

module.exports = app;

# Create Server Entry

server.js
require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});

# Add Scripts

package.json

{
 "scripts": {
   "start": "node server.js",
   "dev": "nodemon server.js"
 }
}

Run:
npm run dev

Expected:
Server running on port 5000

# Create Health Check Route
src/routes/health.routes.js
const router = require("express").Router();

router.get("/", (req, res) => {
 res.json({
   status: "ok",
 });
});

module.exports = router;

Register in app.js:
const healthRoutes = require("./routes/health.routes");

app.use("/health", healthRoutes);

Test:
http://localhost:5000/health

Response:
{
 "status": "ok"
}

Before touching authentication:
 ✅ Express architecture
 ✅ PostgreSQL connection
 ✅ Environment variables
 ✅ API structure
 ✅ CORS basics
 ✅ Project organization


1st let's make the users schema:

id   integer data type required auto generated and primary key,
username varchar(limit) required,
email varchar(limit) required unique,
hash_password varchar(limit) required,
Created_at timestamp default now()

Now let’s write the sql query to create users table with above data schema.

CREATE TABLE users (
id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
username VARCHAR(200) NOT NULL,
email VARCHAR(250)  NOT NULL UNIQUE,
password_hash VARCHAR  NOT NULL,
created_at TIMESTAMP DEFAULT now() 
);

Let's focus on Features:

1. Register:

   Now we will slowly build the service layer for register flow, where we will exactly look for if the email already exists or not and then we will hash the password, create the user and return the user.

register(username, email, password)

1. Check if email exists
   repository.findByEmail(email)

2. If exists
   throw Error("Email already exists")

3. Hash password
   bcrypt.hash(password, saltRounds)

4. Create user
   repository.createUser(
      username,
      email,
      passwordHash
   )

5. Return created user


Controller = thin layer
It should ONLY:
get req.body
call service
send response
NO business logic here

Controller
receives request
sends response
🟢 Service
checks existing user
hashes password (bcrypt)
calls repository
🟢 Repository
runs SQL safely
returns only needed fields
🟢 PostgreSQL
stores user
auto-generates:
id
Created_at

🎉 Final result

{
 "success": true,
 "user": {
   "id": 1,
   "username": "sriya",
   "email": "sriya@gmail.com",
   "created_at": "2026-06-02T19:15:10.790Z"
 }
}

✅ No password exposed
✅ Clean architecture
✅ Proper service-repository separation
✅ Secure hashing in place



