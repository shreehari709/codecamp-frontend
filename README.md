# 🏕️ CodeCamp

> A full-stack competitive coding management platform for teachers (TICs) and students — track tasks, submissions, XP, streaks, and LeetCode stats all in one place.

---

## 📌 Problem Statement

In academic environments, managing competitive programming activities across a class is a significant challenge. Instructors lack a unified platform to:

- **Assign coding tasks** from platforms like LeetCode, GeeksForGeeks, and Codeforces to their students.
- **Track student submissions** and provide approval or rejection with feedback.
- **Measure student progress** in a transparent, gamified way.
- **Compare performance** across students in a class-level leaderboard.
- **View live coding stats** from external platforms like LeetCode without switching between multiple tools.

Students, on the other hand, struggle to:

- Stay motivated without visible progress indicators.
- Know which tasks are pending and what deadlines apply to them.
- See how they rank among their peers in their class.

There is no dedicated tool that bridges the gap between an instructor's need to manage and a student's need to grow — CodeCamp was built to solve exactly this.

---

## 💡 Solution

**CodeCamp** is a role-based web application that brings instructors (called **TICs – Teachers In Charge**) and students into a single collaborative coding ecosystem.

- **TICs** can create classes, assign coding tasks with XP rewards, review student submissions, and get a high-level dashboard of their class's progress.
- **Students** can join a class, view assigned tasks, submit solutions, earn XP & streaks, and track their live LeetCode statistics — all from a personalized dashboard.
- A **class-level leaderboard** gamifies the experience by ranking students by XP, encouraging healthy competition.
- **LeetCode integration** pulls live data (solved count, contest stats, submission history, badges, etc.) for each student's profile automatically.

---

## ✨ Features

### 🔐 Authentication & Roles
| Feature | Description |
|---|---|
| **Register / Login** | Secure JWT-based authentication with password hashing using bcrypt |
| **Role-based Access** | Two roles: `student` and `tic` (Teacher In Charge) |
| **Auto Class Join** | Students can join a class by providing a class code at registration |
| **Protected Routes** | Frontend routes are guarded by auth and role middleware |

---

### 🏫 Class Management (TIC)
| Feature | Description |
|---|---|
| **Create Class** | TIC creates a class; a unique class code is auto-generated |
| **View Classes** | TIC sees all classes they own with enrolled students |
| **Student Roster** | Full student list with XP, streak, roll number, and coding profiles |
| **Join Class** | Students can join a class using its unique code |

---

### 📋 Task Management
| Feature | Description |
|---|---|
| **Create Task** | TIC creates tasks with title, platform, difficulty, XP reward, due date, and a question link |
| **View Tasks** | Students see tasks assigned to their class; TICs see tasks they've created |
| **Task Details** | Fetch individual task with class and creator info |
| **Delete Task** | TIC can remove tasks they created |
| **Multi-Platform Support** | Supports LeetCode, GeeksForGeeks, Codeforces, and more |

---

### 📤 Submission System
| Feature | Description |
|---|---|
| **Submit Solution** | Students submit a solution link for any assigned task |
| **Duplicate Guard** | A student cannot submit the same task twice |
| **My Submissions** | Students view all their past submissions with status |
| **TIC Submission View** | TICs see all submissions across their tasks with student info |
| **Review Submission** | TIC approves or rejects a submission with optional remarks |
| **XP & Streak Award** | On approval, the student automatically earns the task's XP and +1 streak |

---

### 🏆 Leaderboard
| Feature | Description |
|---|---|
| **Class Leaderboard** | Ranks all students in the same class by XP in descending order |
| **Rank Display** | Each student sees their rank number alongside XP and streak |
| **Coding Profile Links** | Leaderboard shows each student's LeetCode, GFG, Codeforces handles |

---

### 📊 Dashboard
| Feature | Description |
|---|---|
| **Student Dashboard** | Shows recent tasks, submission map, XP, streak, class rank, and total problems solved |
| **TIC Dashboard** | Aggregated stats: total classes, students, tasks, submissions, pending & approved counts, recent submissions |
| **Role-Based Routing** | Dashboard auto-routes based on user role |

---

### ⚡ LeetCode Integration
| Feature | Description |
|---|---|
| **Live Profile Fetch** | Fetches profile, solved stats, activity calendar, and recent accepted submissions |
| **Stored Stats** | LeetCode stats are cached in the database per user for fast access |
| **Contest History** | Tracks contest ratings, badges, and performance over time |
| **Skills & Languages** | Displays problem-solving skills and preferred programming languages |

---

## 🗂️ Project Structure

```
CodeCamp/
├── client/                        # React + Vite Frontend
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx          # Login page
│       │   ├── Register.jsx       # Registration page
│       │   ├── StudentDashboard.jsx
│       │   ├── Tasks.jsx          # Task listing for students
│       │   ├── Leaderboard.jsx    # Class leaderboard
│       │   ├── Profile.jsx        # Student profile & LeetCode stats
│       │   └── tic/
│       │       ├── TicDashboard.jsx
│       │       ├── Classes.jsx    # Class management
│       │       ├── CreateTask.jsx # Task creation form
│       │       └── Submissions.jsx# Review submissions
│       ├── components/            # Reusable UI components (Navbar, Sidebar, Cards, etc.)
│       ├── context/               # AuthContext for global user state
│       ├── routes/                # ProtectedRoute & RoleRoute guards
│       └── services/              # Axios API service layer
│
└── server/                        # Node.js + Express Backend
    ├── server.js                  # Entry point
    ├── config/db.js               # MongoDB connection
    ├── models/                    # Mongoose schemas
    │   ├── User.js
    │   ├── Class.js
    │   ├── Task.js
    │   └── Submission.js
    ├── controllers/               # Business logic
    │   ├── authController.js
    │   ├── classController.js
    │   ├── taskController.js
    │   ├── submissionController.js
    │   ├── leaderboardController.js
    │   ├── dashboardController.js
    │   └── leetcodeController.js
    ├── routes/                    # Express route definitions
    ├── middleware/                 # JWT auth & role guards
    ├── services/                  # LeetCode API service layer
    └── utils/                     # Token & class code generators
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router DOM v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations |
| **Recharts / Chart.js** | Data visualizations |
| **Lucide React** | Icon library |
| **Axios** | HTTP client |
| **React Hot Toast** | Toast notifications |
| **React Circular Progressbar** | Progress indicators |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | JWT authentication |
| **dotenv** | Environment variables |
| **cors** | Cross-origin request handling |
| **nodemon** | Dev auto-restart |
| **Axios** | LeetCode API requests |

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login and get JWT token |
| `GET` | `/me` | Protected | Get the current logged-in user |

### Classes — `/api/classes`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/` | TIC | Create a new class |
| `GET` | `/` | Protected | Get classes (TIC: own, Student: joined) |
| `POST` | `/join` | Student | Join a class using class code |
| `GET` | `/:id/students` | Protected | Get all students in a class |

### Tasks — `/api/tasks`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/` | TIC | Create a new task |
| `GET` | `/` | Protected | Get tasks (role-filtered) |
| `GET` | `/:id` | Protected | Get a single task by ID |
| `DELETE` | `/:id` | TIC | Delete a task |

### Submissions — `/api/submissions`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/` | Student | Submit a solution |
| `GET` | `/my` | Student | Get own submissions |
| `GET` | `/` | TIC | Get all submissions for TIC's tasks |
| `PUT` | `/review` | TIC | Approve or reject a submission |

### Dashboard — `/api/dashboard`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Protected | Get dashboard (auto-routes by role) |
| `GET` | `/student` | Student | Student-specific dashboard data |
| `GET` | `/tic` | TIC | TIC-specific dashboard data |

### Leaderboard — `/api/leaderboard`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Protected | Get ranked list of class students |

### LeetCode — `/api/leetcode`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/:username` | Protected | Fetch live LeetCode stats for a username |

---

## ⚙️ Setup Guide

Follow these steps to run CodeCamp locally on your system.

### Prerequisites

Make sure the following are installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/codecamp.git
cd codecamp
```

---

### 2. Setup the Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
# Server port
PORT=5000

# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>

# JSON Web Token secret (use a long random string)
JWT_SECRET=your_super_secret_jwt_key_here

# LeetCode API base URL (public API)
LEETCODE_API_KEY=https://alfa-leetcode-api.onrender.com/
```

> **Note:** Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB Atlas credentials. Never commit your real `.env` file to version control.

Start the backend server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will start on **http://localhost:5000**

---

### 3. Setup the Frontend (Client)

Open a new terminal window:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The client will start on **http://localhost:5173**

---

### 4. Open the Application

Visit **http://localhost:5173** in your browser.

- Register as a **TIC** to create classes and manage tasks.
- Register as a **Student** with a class code to join a class and start solving tasks.

---

### 5. Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `PORT` | Optional | Port for the Express server (default: `5000`) |
| `MONGO_URI` | ✅ Yes | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | ✅ Yes | Secret key for signing JWT tokens |
| `LEETCODE_API_KEY` | ✅ Yes | Base URL for the LeetCode API service |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
