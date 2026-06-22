import {
  Link
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <Link to="/">
        Dashboard
      </Link>

      <Link to="/tasks">
        Tasks
      </Link>

      <Link to="/leaderboard">
        Leaderboard
      </Link>

      <Link to="/profile">
        Profile
      </Link>

      {user?.role === "tic" && (
        <>
          <Link to="/tic">
            TIC Dashboard
          </Link>
        </>
      )}
    </aside>
  );
};

export default Sidebar;