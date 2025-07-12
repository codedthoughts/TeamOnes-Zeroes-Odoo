# StackIt - Real-time Question & Answer Platform

A modern, real-time question and answer platform built with React and Node.js.

---

**Team Name:** **Ones and Zeros**

**Team Members:**
*   Sarthak Jejurkar
*   Atharva Wadhe
*   Om Bhamre

---

## 📖 Project Overview

**StackIt** is a lightweight, scalable, and real-time Q&A forum platform built with the MERN stack. It's designed from the ground up to foster collaborative learning and structured knowledge sharing within a community. Users can ask questions, provide detailed answers with a rich text editor, vote on the best content, and receive instant notifications for community engagement, creating a dynamic and interactive experience.

The goal of this project was to build a production-ready, full-stack application that demonstrates proficiency in modern web technologies, including real-time communication, robust authentication, and clean, scalable architecture.

## ✨ Core Features

### User & Authentication
*   **JWT-Based Authentication:** Secure user registration and login system using JSON Web Tokens.
*   **Password Hashing:** Passwords are securely hashed using `bcrypt.js` before being stored.
*   **Role-Based Access Control (RBAC):**
    *   **Guest:** Can view all questions and answers.
    *   **User:** Can register, log in, post questions/answers, and vote.
    *   **Admin:** Can moderate content (future scope).

### Q&A Functionality
*   **Ask a Question:** Authenticated users can post new questions with a title, detailed description, and relevant tags.
*   **Answer Questions:** Users can post answers to any question, fostering community help.
*   **Rich Text Editor:** Both questions and answers can be formatted using a powerful TipTap-based editor supporting:
    *   Bold, Italic, Strikethrough
    *   Bulleted & Numbered Lists
    *   Hyperlink Insertion
    *   Image Uploads (via URL)
    *   Text Alignment (Left, Center, Right)
    *   Emoji Picker
*   **Voting System:** Users can upvote or downvote answers to highlight the most helpful solutions. The system prevents duplicate voting.
*   **Accept an Answer:** The original author of the question can mark one answer as the "accepted" solution, which is visually highlighted.
*   **Tagging System:** Questions are categorized with tags, allowing users to easily filter and find relevant content.

### Real-Time & Interactive
*   **Live Notifications:** A real-time notification system built with **Socket.io**. Users receive instant notifications when:
    *   Someone answers their question.
*   **Notification Center:** A bell icon in the navbar displays the count of unread notifications and shows a dropdown list of recent events.
*   **Optimistic UI Updates:** Voting and accepting answers provide immediate visual feedback to the user for a smooth, lag-free experience.

## 🚀 Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</div>

### Frontend
*   **Framework:** React.js (with Vite for fast development)
*   **Routing:** React Router DOM
*   **Styling:** Tailwind CSS (with `@tailwindcss/typography` for rich text rendering)
*   **State Management:** Zustand (for global auth and notification state)
*   **Rich Text Editor:** TipTap
*   **API Communication:** Axios
*   **Real-time Client:** Socket.io-client

### Backend
*   **Framework:** Node.js + Express.js
*   **Database:** MongoDB Atlas (with Mongoose ODM)
*   **Authentication:** JSON Web Tokens (JWT)
*   **Password Hashing:** Bcrypt.js
*   **Real-time Server:** Socket.io
*   **Validation:** express-validator for robust API input validation

## 🛠️ Installation & Setup

### Prerequisites
*   Node.js (v18.x or higher)
*   npm (or yarn)
*   MongoDB Atlas account (or a local MongoDB instance)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables if does not exist:
   ```env
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables if does not exist:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## 🚀 Running the Application

1. Ensure both backend and frontend servers are running
2. Open your browser and navigate to `http://localhost:5173`
3. Register a new account or log in if you have an existing one
4. Start asking questions and engaging with the community!

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

*   Thanks to the creators of all the open-source tools and libraries used in this project
*   Special thanks to the Stack Overflow community for inspiration and guidance
*   Thanks to the Zeroes and Ones team members for their hard work and dedication

## Project Structure

### Backend (`/backend`)
```
backend/
├── controllers/       # API controllers
├── middleware/        # Custom middleware
├── models/           # MongoDB models
├── routes/           # API routes
├── utils/            # Utility functions
├── server.js         # Main server file
└── .env              # Environment variables
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── api/          # API client configuration
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── lib/         # Library configurations
│   ├── pages/       # Page components
│   ├── store/       # State management
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
├── public/          # Static assets
└── index.html       # HTML template
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run start` - Start backend server
- `npm run build` - Build frontend for production

