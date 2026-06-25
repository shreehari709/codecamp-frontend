# 🚀 CodeCamp

A MERN Stack based Coding Classroom & Progress Tracking Platform that helps TICs (Teachers In Charge) manage coding practice, track student progress, assign daily coding tasks, review submissions, and monitor coding activity from platforms like LeetCode.

---

## 📌 Overview

CodeCamp is designed to bridge the gap between coding practice platforms and classroom management systems.

Instead of manually checking whether students are solving coding problems, TICs can create coding tasks, track progress, review submissions, monitor streaks, and view analytics in a centralized dashboard.

The platform integrates with LeetCode APIs to fetch coding statistics automatically and provides a modern dashboard for both students and TICs.

---

# ✨ Features

## 👨‍🎓 Student Features

### Authentication

* Register Account
* Login Account
* JWT Authentication
* Protected Routes

### Coding Profiles

* Add LeetCode Username
* Add GeeksforGeeks Username
* Add Other Coding Platform Profiles

### Dashboard

* XP Tracking
* Daily Streak Tracking
* Coding Progress Analytics
* Question Distribution
* Recent Coding Activity
* Performance Overview

### Tasks

* View Daily Tasks
* Open Coding Problem Links
* Submit Solutions
* Track Submission Status

### Submission Status

* Pending
* Approved
* Rejected

### Leaderboard

* XP Ranking
* Streak Ranking
* Class Ranking

### Profile

* Personal Information
* Coding Profiles
* Statistics

---

## 👨‍🏫 TIC Features

### Dashboard

* Total Students
* Total Tasks
* Total Submissions
* Class Analytics

### Student Management

* View All Students
* Search Students
* View Student Profiles
* Remove Students
* Change Student Roles

### Task Management

* Create Daily Tasks
* Assign Problems
* Manage Deadlines

### Submission Review

* View Student Submissions
* Approve Submissions
* Reject Submissions

### Analytics

* Student Performance
* Coding Statistics
* Participation Tracking

---

# 🏗 System Architecture

```text
Frontend (React + Tailwind)
        │
        ▼
Backend (Node.js + Express)
        │
        ▼
MongoDB Database
        │
        ▼
LeetCode API Integration
```

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Context API
* Lucide React Icons

## Backend

* Node.js
* Express.js
* JWT Authentication
* BcryptJS

## Database

* MongoDB
* Mongoose

## External APIs

LeetCode API

```text
https://alfa-leetcode-api.onrender.com
```

---

# 📁 Project Structure

```text
CodeCamp
│
├── backend
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── vite.config.js
│
└── README.md
```

---

# 🗄 Database Models

## User

```javascript
{
  name,
  email,
  password,
  role,
  xp,
  streak,

  codingProfiles: {
    leetcode,
    gfg
  }
}
```

---

## Task

```javascript
{
  title,
  description,
  platform,
  questionLink,
  createdBy,
  deadline
}
```

---

## Submission

```javascript
{
  student,
  task,
  solutionLink,
  status
}
```

---

# 🔐 Roles

## Student

Can:

* View Tasks
* Submit Solutions
* View Dashboard
* View Leaderboard

Cannot:

* Create Tasks
* Review Submissions
* Manage Students

---

## TIC

Can:

* Create Tasks
* Review Submissions
* Manage Students
* View Analytics
* Change Student Roles

---

# 🚀 Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/codecamp.git

cd codecamp
```

---

# Backend Setup

## Navigate

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Create .env

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret
```

## Start Backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

## Navigate

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# LeetCode Integration

The platform integrates with:

```text
https://alfa-leetcode-api.onrender.com
```

Supported Endpoints:

## User

```text
/:username
/:username/profile
/:username/solved
/:username/progress
/:username/badges
/:username/contest
/:username/calendar
/:username/language
/:username/skill
/:username/acSubmission
```

## Problems

```text
/problems
/problems?difficulty=EASY
/problems?difficulty=MEDIUM
/problems?difficulty=HARD
```

## Contests

```text
/contests
/contests/upcoming
```

---

# Student Workflow

```text
Register
    │
    ▼
Add LeetCode Username
    │
    ▼
Login
    │
    ▼
View Daily Tasks
    │
    ▼
Solve Problem
    │
    ▼
Submit Solution
    │
    ▼
Pending Review
    │
    ▼
Approved by TIC
    │
    ▼
XP Updated
```

---

# TIC Workflow

```text
Login
   │
   ▼
Create Task
   │
   ▼
Students Solve
   │
   ▼
Review Submission
   │
   ▼
Approve / Reject
   │
   ▼
Leaderboard Updated
```

---

# Future Enhancements

## Phase 6

* Auto Verification using LeetCode API
* Contest Management
* Attendance Tracking
* Weekly Challenges
* Student Groups

## Phase 7

* AI Coding Mentor
* Personalized Question Recommendations
* Performance Prediction

## Phase 8

* Multi-Class Support
* Coding Battles
* Real-time Notifications
* Gamification System

---

# Security

* JWT Authentication
* Password Hashing (Bcrypt)
* Protected Routes
* Role-Based Access Control

---

# Performance

* MongoDB Indexing
* API Caching
* Lazy Loading Components
* Optimized Queries

---

# Contributors

### Shreehari Kalundia

MCA Student
NIT Jamshedpur

---

# License

MIT License

---

# ⭐ Support

If you like this project:

⭐ Star the repository

🍴 Fork the project

🚀 Contribute improvements

---

Made with ❤️ using MERN Stack.
