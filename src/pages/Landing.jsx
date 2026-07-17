import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import {
  Code2, Zap, Trophy, Users, ArrowRight, ExternalLink,
  Target, Flame, Star, CheckCircle, BookOpen, TrendingUp
} from "lucide-react";

const FEATURES = [
  {
    icon: <Zap size={22} />,
    title: "Daily DSA Tasks",
    desc: "Your TIC assigns 2 curated problems every day from LeetCode, GFG, and Codeforces. Click once to start solving.",
    color: "#f59e0b",
  },
  {
    icon: <Trophy size={22} />,
    title: "XP & Streak System",
    desc: "Earn XP points when your TIC approves your solution. Keep a daily streak to climb the leaderboard faster.",
    color: "#0d9e6e",
  },
  {
    icon: <Users size={22} />,
    title: "Class-based Groups",
    desc: "Join your batch using a class code from your TIC. Everyone competes in the same pool — fair and focused.",
    color: "#8b5cf6",
  },
  {
    icon: <Target size={22} />,
    title: "TIC Review Flow",
    desc: "Submit your solution link. Your TIC reviews and approves or rejects with feedback, just like a real code review.",
    color: "#3b82f6",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "LeetCode Analytics",
    desc: "See your LeetCode solved count, Easy/Medium/Hard breakdown, and track how your profile grows over time.",
    color: "#ef4444",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Coding Profiles",
    desc: "Link your LeetCode, GFG, and Codeforces handles. Everything synced and visible in one place.",
    color: "#14b8a6",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Register & Join", desc: "Create your account and enter the class code from your TIC to join your batch." },
  { step: "02", title: "Get Daily Tasks", desc: "Every day, your TIC assigns DSA problems. Open the link, solve it on LeetCode or GFG." },
  { step: "03", title: "Submit Solution", desc: "Come back and paste your solution link. Your TIC will review and approve or give feedback." },
  { step: "04", title: "Earn XP & Rise", desc: "Approved? You earn XP and your streak grows. Watch yourself climb the leaderboard!" },
];

const STATS = [
  { label: "Problems Solved", value: "10K+", icon: <Target size={20} /> },
  { label: "Active Students", value: "500+", icon: <Users size={20} /> },
  { label: "Classes Running", value: "50+",  icon: <BookOpen size={20} /> },
  { label: "Avg Daily Streak", value: "7d",  icon: <Flame size={20} /> },
];

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect logged-in users to their dashboard
  useEffect(() => {
    if (user) {
      navigate(user.role === "tic" ? "/tic" : "/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (user) return null; // avoid flash

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1612",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5vw",
          height: 68,
          background: "rgba(10,22,18,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(13,158,110,0.4)",
            }}
          >
            <Code2 size={18} color="white" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>CodeCamp</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            to="/explore"
            style={{
              color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500,
              textDecoration: "none", padding: "8px 16px", borderRadius: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "white")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
          >
            Explore
          </Link>
          <Link
            to="/login"
            style={{
              color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 500,
              textDecoration: "none", padding: "8px 16px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              transition: "all 0.2s",
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
              color: "white", fontSize: 14, fontWeight: 600,
              textDecoration: "none", padding: "9px 20px", borderRadius: 9,
              boxShadow: "0 4px 14px rgba(13,158,110,0.35)",
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 5vw 60px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: "absolute", width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,158,110,0.12) 0%, transparent 70%)",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            top: "20%", left: "15%", pointerEvents: "none",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 999,
            background: "rgba(13,158,110,0.12)",
            border: "1px solid rgba(13,158,110,0.3)",
            marginBottom: 28,
            fontSize: 13, fontWeight: 600, color: "#4ade80",
            position: "relative", zIndex: 1,
          }}
        >
          <Star size={13} fill="#4ade80" />
          DSA Practice Platform for MCA Students
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-2px",
            marginBottom: 24,
            maxWidth: 800,
            position: "relative", zIndex: 1,
          }}
        >
          Master DSA,{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#4ade80,#0d9e6e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            One Day at a Time
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: 44,
            position: "relative", zIndex: 1,
          }}
        >
          Join your class, receive daily coding problems from your TIC, earn XP on approval, and compete with your batchmates on the leaderboard.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center",
            position: "relative", zIndex: 1,
          }}
        >
          <Link
            to="/register"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
              color: "white", textDecoration: "none",
              padding: "14px 28px", borderRadius: 12,
              fontSize: 16, fontWeight: 700,
              boxShadow: "0 8px 24px rgba(13,158,110,0.4)",
              transition: "all 0.2s",
            }}
          >
            Get Started <ArrowRight size={18} />
          </Link>

          <Link
            to="/explore"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.8)", textDecoration: "none",
              padding: "14px 28px", borderRadius: 12,
              fontSize: 16, fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            Browse as Guest
          </Link>

          <Link
            to="/login"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              color: "rgba(255,255,255,0.45)", textDecoration: "none",
              padding: "14px 20px", borderRadius: 12,
              fontSize: 15, fontWeight: 500,
            }}
          >
            Already have an account? Login →
          </Link>
        </div>

        {/* Hero Dashboard Preview Card */}
        <div
          style={{
            marginTop: 60,
            width: "100%", maxWidth: 860,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: 24,
            position: "relative", zIndex: 1,
          }}
        >
          {/* Fake browser bar */}
          <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
            {["#ef4444","#f59e0b","#10b981"].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
            <div
              style={{
                flex: 1, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.06)",
                marginLeft: 8, marginTop: 0,
              }}
            />
          </div>

          {/* Mini Dashboard Preview */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
            {[
              { label: "XP", value: "1,240", color: "#f59e0b" },
              { label: "Streak", value: "🔥 14", color: "#ef4444" },
              { label: "Tasks Done", value: "28", color: "#0d9e6e" },
              { label: "Rank", value: "#3", color: "#8b5cf6" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "14px 16px",
                }}
              >
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</p>
                <p style={{ fontSize: 22, fontWeight: 800, color }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Fake Task Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { title: "Two Sum", platform: "LeetCode", diff: "Easy", xp: 10, color: "#10b981" },
              { title: "Longest Substring Without Repeating Characters", platform: "LeetCode", diff: "Medium", xp: 20, color: "#f59e0b" },
            ].map(({ title, platform, diff, xp, color }) => (
              <div
                key={title}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "16px",
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 10, lineHeight: 1.3 }}>{title}</p>
                <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                  <span style={{ background: "rgba(255,161,22,0.12)", color: "#ffa116", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{platform}</span>
                  <span style={{ background: `${color}18`, color, padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{diff}</span>
                  <span style={{ background: "rgba(13,158,110,0.12)", color: "#4ade80", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>+{xp} XP</span>
                </div>
                <div
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(13,158,110,0.15)", color: "#4ade80",
                    padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  }}
                >
                  Solve Now <ExternalLink size={11} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section
        style={{
          padding: "40px 5vw",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(13,158,110,0.04)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 24,
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {STATS.map(({ label, value, icon }) => (
            <div key={label}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#4ade80", marginBottom: 8 }}>
                {icon}
              </div>
              <p style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1, color: "white" }}>{value}</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4, fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section style={{ padding: "100px 5vw", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 14 }}>
            Everything You Need
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.15 }}>
            Built for serious DSA practice
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
            Everything your class needs to build a consistent coding habit, organized and tracked.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
          }}
        >
          {FEATURES.map(({ icon, title, desc, color }) => (
            <div
              key={title}
              style={{
                padding: "28px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = `${color}35`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${color}18`, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color, marginBottom: 18,
                }}
              >
                {icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "white" }}>{title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        style={{
          padding: "80px 5vw",
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 14 }}>
              Simple Flow
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: -0.8 }}>
              How CodeCamp works
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={step} style={{ position: "relative" }}>
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    style={{
                      position: "absolute", top: 22, left: "calc(100% - 20px)",
                      width: "50%", height: 1,
                      background: "linear-gradient(90deg, rgba(13,158,110,0.4), transparent)",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 16, color: "white", marginBottom: 18,
                    boxShadow: "0 0 20px rgba(13,158,110,0.3)",
                  }}
                >
                  {step}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles Section ── */}
      <section style={{ padding: "80px 5vw", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: -0.8 }}>
            Two roles, one platform
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Student */}
          <div
            style={{
              padding: "32px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
            }}
          >
            <div
              style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(13,158,110,0.15)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#4ade80", marginBottom: 20,
              }}
            >
              <Code2 size={24} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Student 🎓</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>
              Join your class, solve daily tasks, earn XP, and rise on the leaderboard.
            </p>
            {[
              "View daily assigned tasks",
              "Open problems on LeetCode / GFG",
              "Submit solution links",
              "Track XP, streaks & rank",
              "See your LeetCode analytics",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <CheckCircle size={15} color="#0d9e6e" />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item}</span>
              </div>
            ))}
            <Link
              to="/register"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20,
                background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                color: "white", textDecoration: "none",
                padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              }}
            >
              Join as Student <ArrowRight size={15} />
            </Link>
          </div>

          {/* TIC */}
          <div
            style={{
              padding: "32px",
              background: "rgba(139,92,246,0.05)",
              border: "1px solid rgba(139,92,246,0.15)",
              borderRadius: 18,
            }}
          >
            <div
              style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(139,92,246,0.15)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#a78bfa", marginBottom: 20,
              }}
            >
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>TIC 👨‍🏫</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>
              Create a class, assign daily tasks, review submissions, and manage your students.
            </p>
            {[
              "Create classes with join codes",
              "Assign daily DSA problems",
              "Review & approve submissions",
              "Monitor student progress",
              "View class leaderboard",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <CheckCircle size={15} color="#8b5cf6" />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item}</span>
              </div>
            ))}
            <Link
              to="/register"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20,
                background: "rgba(139,92,246,0.2)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#c4b5fd", textDecoration: "none",
                padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              }}
            >
              Register as TIC <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{
          padding: "80px 5vw",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, rgba(13,158,110,0.06) 0%, transparent 100%)",
        }}
      >
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: -1, marginBottom: 18, lineHeight: 1.15 }}>
            Ready to start your
            <br />
            <span style={{ background: "linear-gradient(135deg,#4ade80,#0d9e6e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DSA journey?
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", marginBottom: 36, lineHeight: 1.7 }}>
            Register today. Join your class. Solve every day. It's that simple.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/register"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                color: "white", textDecoration: "none",
                padding: "15px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700,
                boxShadow: "0 8px 28px rgba(13,158,110,0.4)",
              }}
            >
              Get Started Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/explore"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)", textDecoration: "none",
                padding: "15px 28px", borderRadius: 12, fontSize: 16, fontWeight: 600,
              }}
            >
              Browse as Guest
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Code2 size={16} color="#0d9e6e" />
          <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>CodeCamp</span>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
          Built with ❤️ for MCA students
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {[{ to: "/login", label: "Login" }, { to: "/register", label: "Register" }, { to: "/explore", label: "Explore" }].map(({ to, label }) => (
            <Link key={label} to={to} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
