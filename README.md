# 🚖 UBER – Full Stack Ride Booking Application

A full-stack Uber-inspired ride booking application built using the MERN stack.  
This project demonstrates real-time ride management, authentication, and scalable backend architecture.

---

## 📌 Overview

UBER is a full-stack ride-hailing platform that allows users to:

- Register and login securely
- Request rides
- Connect riders with captains
- Handle real-time ride status updates
- Manage authentication using JWT
- Interact through REST APIs
- Use real-time communication via Socket.IO

This project showcases backend architecture, API design, database modeling, and frontend integration.

---

## 🏗️ Tech Stack

### 🔹 Frontend
- React.js
- Axios
- Context API / State Management
- Tailwind CSS

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt (Password Hashing)
- Socket.IO
- dotenv

---

## 📁 Project Structure

UBER/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
└── README.md

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- Login with JWT
- Secure password hashing with bcrypt
- Protected routes using middleware

### 🚗 Ride Management
- Create ride request
- Captain ride acceptance
- Ride status updates
- Ride completion handling

### ⚡ Real-Time Updates
- Socket.IO integration
- Live ride updates between user and captain
- Event-based communication

### 🗄 Database
- MongoDB with Mongoose schemas
- Structured models for Users, Captains, Rides

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/prishushishodia/UBER.git  
cd UBER

---

### 2️⃣ Backend Setup

cd Backend  
npm install  

Create a `.env` file inside Backend:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

Start backend server:

npm run dev  

---

### 3️⃣ Frontend Setup

cd ../Frontend  
npm install  
npm start  

Make sure frontend API base URL matches backend port.

---

## 🌐 API Endpoints (Example)

### Auth Routes
- POST /api/user/register
- POST /api/user/login

### Ride Routes
- POST /api/ride/create
- PATCH /api/ride/update-status

---

## 🔒 Security Practices

- JWT-based stateless authentication
- Password hashing with bcrypt
- Environment variables for sensitive data
- Express middleware validation

---

## 🧠 Learning Outcomes

This project demonstrates:

- RESTful API design
- Role-based architecture (User / Captain)
- Real-time backend architecture
- Secure authentication flow
- Full-stack integration
- Modular backend structuring

---

## 📦 Future Improvements

- Google Maps integration
- Fare estimation logic
- Payment gateway integration
- Admin dashboard
- Ride history analytics
- Production deployment

---

## 👨‍💻 Author

Priyanshu Shishodia  
GitHub: https://github.com/prishushishodia

---

## 📄 License

This project is for educational purposes.
