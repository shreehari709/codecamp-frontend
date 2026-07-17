import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestLeaderboard from "./pages/GuestLeaderboard";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import Tasks from "./pages/Tasks";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

// TIC Pages
import TicDashboard from "./pages/tic/TicDashboard";
import Classes from "./pages/tic/Classes";
import CreateTask from "./pages/tic/CreateTask";
import Submissions from "./pages/tic/Submissions";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ── Public / Guest Routes ── */}
      <Route path="/" element={<Landing />} />
      <Route path="/explore" element={<GuestLeaderboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── Student Routes ── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ── TIC Routes ── */}
      <Route
        path="/tic"
        element={
          <ProtectedRoute>
            <RoleRoute role="tic">
              <TicDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tic/classes"
        element={
          <ProtectedRoute>
            <RoleRoute role="tic">
              <Classes />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tic/create-task"
        element={
          <ProtectedRoute>
            <RoleRoute role="tic">
              <CreateTask />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tic/submissions"
        element={
          <ProtectedRoute>
            <RoleRoute role="tic">
              <Submissions />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ── Fallback ── */}
      <Route
        path="*"
        element={
          user
            ? <Navigate to={user.role === "tic" ? "/tic" : "/dashboard"} replace />
            : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;