import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import StudentLayout from "../layouts/StudentLayout";
import {
  Trophy, Flame, Target, Users, ExternalLink, CheckCircle,
  Clock, Code2, TrendingUp, BookOpen
} from "lucide-react";
import { getTasks } from "../services/taskService";
import { getMySubmissions } from "../services/submissionService";
import { getLeaderboard } from "../services/leaderboardService";

const PLATFORM_COLORS = {
  leetcode:   { bg: "rgba(255,161,22,0.12)", color: "#c17d00", label: "LeetCode" },
  gfg:        { bg: "rgba(47,141,70,0.12)",  color: "#1e6b30", label: "GFG" },
  codeforces: { bg: "rgba(31,141,214,0.12)", color: "#1565a8", label: "Codeforces" },
};

const DIFF_COLORS = {
  Easy:   { bg: "rgba(16,185,129,0.1)", color: "#059669" },
  Medium: { bg: "rgba(245,158,11,0.1)", color: "#d97706" },
  Hard:   { bg: "rgba(239,68,68,0.1)",  color: "#dc2626" },
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, s, lb] = await Promise.all([
          getTasks(),
          getMySubmissions(),
          getLeaderboard(),
        ]);
        setTasks(t);
        setSubmissions(s);
        const idx = lb.findIndex((u) => u._id === user?._id);
        if (idx !== -1) setRank(idx + 1);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  // Build submission map: taskId -> submission
  const subMap = {};
  submissions.forEach((s) => {
    if (s.task) subMap[s.task._id || s.task] = s;
  });

  const todayTasks = tasks.slice(0, 2); // Show first 2 as "today's tasks"
  const approvedCount = submissions.filter((s) => s.status === "approved").length;

  const stats = [
    { label: "Total XP",    value: user?.xp || 0,   icon: <Trophy size={20} />, color: "#f59e0b" },
    { label: "Streak",      value: user?.streak || 0, icon: <Flame size={20} />,  color: "#ef4444" },
    { label: "Tasks Done",  value: approvedCount,     icon: <Target size={20} />, color: "#0d9e6e" },
    { label: "Class Rank",  value: rank ? `#${rank}` : "—", icon: <Users size={20} />, color: "#8b5cf6" },
  ];

  const solved = user?.leetcodeStats?.solved;

  return (
    <StudentLayout title="Dashboard">
      {/* Welcome Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--cc-text-primary)", letterSpacing: -0.5 }}>
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p style={{ fontSize: 14, color: "var(--cc-text-muted)", marginTop: 4 }}>
          {user?.classJoined?.className
            ? `Class: ${user.classJoined.className}`
            : "You haven't joined a class yet"}
          {" · "}Keep your streak alive!
        </p>
      </div>

      {/* Stat Cards */}
      <div className="cc-grid-4" style={{ marginBottom: 28 }}>
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="cc-stat-card">
            <div>
              <p className="cc-stat-label">{label}</p>
              <h2 className="cc-stat-value">{loading ? "—" : value}</h2>
            </div>
            <div
              className="cc-stat-icon"
              style={{ background: `${color}18`, color }}
            >
              {icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Today's Tasks */}
        <div className="cc-card" style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700 }}>Today's DSA Tasks</h2>
              <p style={{ fontSize: 13, color: "var(--cc-text-muted)", marginTop: 2 }}>Click "Solve Now" to open the problem</p>
            </div>
            <a
              href="/tasks"
              style={{ fontSize: 13, color: "var(--cc-primary)", fontWeight: 600, textDecoration: "none" }}
            >
              View all →
            </a>
          </div>

          {loading ? (
            <div className="cc-empty"><div className="cc-spinner cc-spinner-dark" style={{ margin: "0 auto" }} /></div>
          ) : todayTasks.length === 0 ? (
            <div className="cc-empty">
              <div className="cc-empty-icon">📭</div>
              <p>No tasks assigned yet. Your TIC will add them soon!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {todayTasks.map((task) => {
                const sub = subMap[task._id];
                const platform = task.platform?.toLowerCase();
                const pc = PLATFORM_COLORS[platform] || { bg: "#f0f7f4", color: "#0d9e6e", label: task.platform };
                const dc = DIFF_COLORS[task.difficulty] || { bg: "#f0f7f4", color: "#4a6b60" };
                return (
                  <div key={task._id} className="cc-task-card">
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--cc-text-primary)", lineHeight: 1.3 }}>
                          {task.title}
                        </h3>
                      </div>
                      {sub && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "3px 8px",
                            borderRadius: 999,
                            fontSize: 11,
                            fontWeight: 700,
                            flexShrink: 0,
                            background: sub.status === "approved" ? "rgba(16,185,129,0.12)" : sub.status === "rejected" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)",
                            color: sub.status === "approved" ? "#059669" : sub.status === "rejected" ? "#dc2626" : "#d97706",
                          }}
                        >
                          {sub.status === "approved" ? <CheckCircle size={11} /> : <Clock size={11} />}
                          {sub.status}
                        </span>
                      )}
                    </div>

                    {/* Badges */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                      <span style={{ ...pc, padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                        {pc.label}
                      </span>
                      <span style={{ ...dc, padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                        {task.difficulty}
                      </span>
                      <span style={{ background: "rgba(13,158,110,0.1)", color: "#0d9e6e", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                        +{task.xpReward} XP
                      </span>
                    </div>

                    {/* CTA */}
                    <a
                      href={task.questionLink}
                      target="_blank"
                      rel="noreferrer"
                      className="cc-btn cc-btn-primary cc-btn-sm"
                      style={{ display: "inline-flex", textDecoration: "none" }}
                    >
                      Solve Now <ExternalLink size={13} />
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* LeetCode Stats */}
        <div
          className="cc-card cc-card-dark"
          style={{ padding: 28 }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 20 }}>
            LeetCode Stats
          </h2>

          {solved ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: `conic-gradient(#10b981 0deg ${(solved.easySolved / Math.max(solved.solvedProblem, 1)) * 360}deg, #f59e0b ${(solved.easySolved / Math.max(solved.solvedProblem, 1)) * 360}deg ${((solved.easySolved + solved.mediumSolved) / Math.max(solved.solvedProblem, 1)) * 360}deg, #ef4444 ${((solved.easySolved + solved.mediumSolved) / Math.max(solved.solvedProblem, 1)) * 360}deg 360deg)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 10,
                      borderRadius: "50%",
                      background: "#0a1612",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "white", lineHeight: 1 }}>
                        {solved.solvedProblem}
                      </div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Solved</div>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  {[
                    { label: "Easy",   val: solved.easySolved,   color: "#10b981" },
                    { label: "Medium", val: solved.mediumSolved,  color: "#f59e0b" },
                    { label: "Hard",   val: solved.hardSolved,    color: "#ef4444" },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color, fontWeight: 600 }}>{label}</span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{val}</span>
                      </div>
                      <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 999 }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${(val / Math.max(solved.solvedProblem, 1)) * 100}%`,
                            background: color,
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {user?.codingProfiles?.leetcode && (
                <a
                  href={`https://leetcode.com/${user.codingProfiles.leetcode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cc-btn cc-btn-ghost"
                  style={{
                    display: "inline-flex",
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: 13,
                  }}
                >
                  <Code2 size={14} /> View Profile
                </a>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "24px 0", color: "rgba(255,255,255,0.35)" }}>
              <Code2 size={32} style={{ marginBottom: 10, opacity: 0.4 }} />
              <p style={{ fontSize: 13 }}>
                {user?.codingProfiles?.leetcode
                  ? "Loading LeetCode stats..."
                  : "Add your LeetCode username in Profile"}
              </p>
            </div>
          )}
        </div>

        {/* Coding Profile Summary */}
        <div className="cc-card">
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Coding Profiles</h2>

          {[
            { key: "leetcode",   label: "LeetCode",   color: "#ffa116", url: "https://leetcode.com/" },
            { key: "gfg",        label: "GeeksForGeeks", color: "#2f8d46", url: "https://auth.geeksforgeeks.org/user/" },
            { key: "codeforces", label: "Codeforces",  color: "#1f8dd6", url: "https://codeforces.com/profile/" },
          ].map(({ key, label, color, url }) => {
            const username = user?.codingProfiles?.[key];
            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "var(--cc-bg-muted)",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: color,
                    }}
                  />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--cc-text-primary)" }}>{label}</span>
                </div>
                {username ? (
                  <a
                    href={`${url}${username}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 13, color: "var(--cc-primary)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {username} <ExternalLink size={12} />
                  </a>
                ) : (
                  <span style={{ fontSize: 13, color: "var(--cc-text-muted)" }}>Not linked</span>
                )}
              </div>
            );
          })}

          <div style={{ marginTop: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                background: "linear-gradient(135deg, rgba(13,158,110,0.08), rgba(13,158,110,0.04))",
                borderRadius: 10,
                border: "1px solid rgba(13,158,110,0.15)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 12, color: "var(--cc-text-muted)" }}>Total XP Earned</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "var(--cc-primary)" }}>{user?.xp || 0}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
                <span style={{ fontSize: 12, color: "var(--cc-text-muted)" }}>Current Streak</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#ef4444" }}>🔥 {user?.streak || 0}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;