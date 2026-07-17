import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  ClipboardList,
  Trophy,
  User,
  Users,
  PlusCircle,
  FileCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Code2,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ path, icon, label }) => {
    const active = isActive(path);
    return (
      <Link
        to={path}
        title={collapsed ? label : undefined}
        className={`cc-nav-item ${active ? "active" : ""}`}
      >
        <span className="cc-nav-icon">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <aside className={`cc-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header / Brand */}
      <div className="cc-sidebar-header" style={{ padding: collapsed ? "24px 16px" : undefined }}>
        <div className="cc-sidebar-brand">
          <div className="cc-sidebar-logo">
            <Code2 size={20} />
          </div>
          {!collapsed && (
            <div>
              <div className="cc-sidebar-name">CodeCamp</div>
              <div className="cc-sidebar-tagline">DSA Tracker</div>
            </div>
          )}
        </div>
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
          style={{
            position: "absolute",
            top: 20,
            right: collapsed ? 20 : 16,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.5)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="cc-nav">
        {!collapsed && (
          <div className="cc-nav-section">Student</div>
        )}
        <NavItem path="/dashboard" icon={<LayoutDashboard size={17} />} label="Dashboard" />
        <NavItem path="/tasks" icon={<ClipboardList size={17} />} label="My Tasks" />
        <NavItem path="/leaderboard" icon={<Trophy size={17} />} label="Leaderboard" />
        <NavItem path="/profile" icon={<User size={17} />} label="Profile" />

        {user?.role === "tic" && (
          <>
            {!collapsed && (
              <div className="cc-nav-section" style={{ marginTop: 8 }}>TIC Panel</div>
            )}
            <NavItem path="/tic" icon={<LayoutDashboard size={17} />} label="TIC Dashboard" />
            <NavItem path="/tic/classes" icon={<Users size={17} />} label="Classes" />
            <NavItem path="/tic/create-task" icon={<PlusCircle size={17} />} label="Create Task" />
            <NavItem path="/tic/submissions" icon={<FileCheck size={17} />} label="Submissions" />
          </>
        )}
      </nav>

      {/* Footer / User Card */}
      <div className="cc-sidebar-footer">
        <div className="cc-user-card" style={{ flexDirection: collapsed ? "column" : "row" }}>
          <div
            className="cc-avatar"
            style={{ background: "linear-gradient(135deg,#0d9e6e,#0a7a55)" }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="cc-user-name">{user?.name}</div>
              <div className="cc-user-role">{user?.role}</div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 8,
                padding: "6px 8px",
                cursor: "pointer",
                color: "#f87171",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              marginTop: 8,
              width: "100%",
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 8,
              padding: "8px",
              cursor: "pointer",
              color: "#f87171",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;