# Auth-Flow

A production-ready full-stack authentication system built with **React, Express.js, PostgreSQL, JWT, Redux Toolkit, Tailwind CSS, and Resend**.

The application demonstrates secure authentication practices including JWT-based login, refresh tokens, protected routes, and password reset via email.

## 🚀 Live Demo

- **Frontend:** https://auth-flow-five-iota.vercel.app/
- **Backend API:** https://auth-flow-backend-1v2h.onrender.com/

---

## ✨ Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Refresh Token Authentication
- ✅ Protected Routes
- ✅ User Profile
- ✅ Forgot Password
- ✅ Password Reset via Email
- ✅ Password Hashing with bcrypt
- ✅ PostgreSQL Integration
- ✅ Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- Resend Email API

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → PostgreSQL

---

## 🏗️ Project Architecture

```
React App
      │
      ▼
 Express.js API
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
 PostgreSQL
      │
      └──────────────► Resend
                             │
                             ▼
                      Password Reset Email

## 📂 Folder Structure

```
auth-project
│
├── auth-backend
│   ├── src
│   │   ├── controllers
│   │   ├── services
│   │   ├── repositories
│   │   ├── middleware
│   │   ├── routes
│   │   └── db
│   └── server.js
│
└── auth-frontend
    ├── src
    │   ├── api
    │   ├── components
    │   ├── pages
    │   ├── redux
    │   └── routes
    └── vite.config.js

## 🔐 Authentication Flow

1. User registers with email and password.
2. Password is securely hashed using **bcrypt**.
3. User logs in and receives:
   - JWT Access Token
   - Refresh Token
4. Protected routes validate the JWT.
5. Forgot Password generates a secure reset token and sends a reset link using **Resend**.
6. User resets the password through the secure reset page.


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

## ⚙️ Installation

### Backend

```bash
cd auth-backend
npm install
npm run dev
```

### Frontend

```bash
cd auth-frontend
npm install
npm run dev

<img width="362" height="321" alt="ins1" src="https://github.com/user-attachments/assets/dbd42c34-0112-40fa-8e83-153503419157" />

<img width="382" height="359" alt="backendfolderstruct" src="https://github.com/user-attachments/assets/105a4250-678b-42f0-b82b-ce79f1d67624" />


# Configure Environment Variables

.env
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_REFRESH_SECRET=

RESEND_API_KEY=

FRONTEND_URL=
```

---

## 📚 Learn More

I documented the complete development journey—including backend setup, frontend architecture, authentication flow, deployment, challenges, and production debugging—in a detailed technical blog.

📝 **Read the full blog:** *(Coming Soon)*

---

## 🚀 Future Improvements

- Email Verification
- Change Password
- OAuth (Google / GitHub)
- Role-Based Authorization
- Rate Limiting
- Docker Support
- CI/CD Pipeline
- Unit & Integration Testing

---

## 👩‍💻 Author

**Sriya T**

If you found this project helpful, feel free to ⭐ the repository.

