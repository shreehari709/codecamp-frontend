import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ title = "Dashboard" }) => {
  const { user } = useAuth();

  return (
    <header className="cc-navbar">
      <div>
        <h1 className="cc-navbar-title">{title}</h1>
      </div>

      <div className="cc-navbar-right">
        {/* Notification Bell */}
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: "1px solid var(--cc-border)",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--cc-text-muted)",
          }}
        >
          <Bell size={17} />
        </button>

        {/* User Info */}
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "var(--cc-primary)",
            }}
          >
            {user?.role}
          </p>
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--cc-text-primary)",
              lineHeight: 1.2,
              marginTop: 2,
            }}
          >
            {user?.name}
          </h4>
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--cc-primary), var(--cc-primary-dark))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            boxShadow: "0 2px 8px rgba(13,158,110,0.35)",
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Navbar;