import {
  Routes,
  Route
} from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import TicDashboard from "./pages/TicDashboard";

import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

import StudentLayout from "./layouts/StudentLayout";
import TicLayout from "./layouts/TicLayout";

function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <StudentLayout>
              <Tasks />
            </StudentLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <StudentLayout>
              <Leaderboard />
            </StudentLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <StudentLayout>
              <Profile />
            </StudentLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tic"
        element={
          <ProtectedRoute>
            <RoleRoute role="tic">
              <TicLayout>
                <TicDashboard />
              </TicLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;