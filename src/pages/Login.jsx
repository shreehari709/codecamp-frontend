import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Code2, Eye, EyeOff, ArrowRight, Zap, Trophy, Users } from "lucide-react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const features = [
  { icon: <Zap size={20} />, title: "Daily DSA Tasks", desc: "Get fresh problems every day" },
  { icon: <Trophy size={20} />, title: "Earn XP & Streaks", desc: "Compete and climb the leaderboard" },
  { icon: <Users size={20} />, title: "Class-based Groups", desc: "Learn together with your batch" },
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const data = await loginUser(form);
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}! 🎉`);
      navigate(data.user.role === "tic" ? "/tic" : "/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-auth-wrapper">
      {/* Left Panel */}
      <div className="cc-auth-left">
        <div style={{ position: "relative", zIndex: 1, maxWidth: 420 }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(13,158,110,0.4)",
              }}
            >
              <Code2 size={26} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: -0.5 }}>
                CodeCamp
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>DSA Tracker Platform</p>
            </div>
          </div>

          <h2
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: -1,
              marginBottom: 16,
            }}
          >
            Master DSA,<br />
            <span style={{ color: "#4ade80" }}>One Day at a Time</span>
          </h2>

          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 40 }}>
            Join your class, solve daily problems, earn XP and compete with your peers on the leaderboard.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "rgba(13,158,110,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4ade80",
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{f.title}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="cc-auth-right">
        <div className="cc-auth-form">
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--cc-text-primary)", letterSpacing: -0.5 }}>
              Welcome back 👋
            </h2>
            <p style={{ fontSize: 14, color: "var(--cc-text-muted)", marginTop: 6 }}>
              Sign in to continue your coding journey
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="cc-form-group">
              <label className="cc-label">Email Address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="cc-input"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="cc-form-group">
              <label className="cc-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Your password"
                  className="cc-input"
                  style={{ paddingRight: 48 }}
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--cc-text-muted)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="cc-btn cc-btn-primary cc-btn-lg"
              style={{ width: "100%", marginTop: 8 }}
            >
              {loading ? (
                <span className="cc-spinner" />
              ) : (
                <>
                  Sign In <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="cc-divider" style={{ margin: "28px 0" }} />

          <p style={{ textAlign: "center", fontSize: 14, color: "var(--cc-text-muted)" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--cc-primary)", fontWeight: 600, textDecoration: "none" }}
            >
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;