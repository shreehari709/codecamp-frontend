import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import StudentLayout from "../layouts/StudentLayout";
import { getLeetcodeStats } from "../services/leetcodeService";
import toast from "react-hot-toast";
import { Code2, ExternalLink, RefreshCw, User, Trophy, Flame, Hash } from "lucide-react";

const Profile = () => {
  const { user, login } = useAuth();
  const [syncing, setSyncing] = useState(false);

  const handleSyncLeetCode = async () => {
    if (!user?.codingProfiles?.leetcode) {
      toast.error("No LeetCode username linked");
      return;
    }
    try {
      setSyncing(true);
      toast.loading("Syncing LeetCode stats...", { id: "sync" });
      await getLeetcodeStats(user.codingProfiles.leetcode);
      toast.success("Stats synced!", { id: "sync" });
    } catch {
      toast.error("Sync failed — try again", { id: "sync" });
    } finally {
      setSyncing(false);
    }
  };

  const solved = user?.leetcodeStats?.solved;

  return (
    <StudentLayout title="Profile">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Profile Hero Card */}
        <div
          className="cc-card"
          style={{
            background: "linear-gradient(135deg,#0a1612,#0d1f18)",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 24,
            padding: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* Avatar */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 800,
                color: "white",
                flexShrink: 0,
                boxShadow: "0 0 28px rgba(13,158,110,0.35)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: -0.5, marginBottom: 4 }}>
                {user?.name}
              </h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>{user?.email}</p>
              {user?.rollNumber && (
                <p style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}>
                  <Hash size={13} /> {user.rollNumber}
                </p>
              )}
            </div>

            <div
              style={{
                padding: "8px 18px",
                background: "rgba(13,158,110,0.2)",
                border: "1px solid rgba(13,158,110,0.3)",
                borderRadius: 999,
                color: "#4ade80",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {user?.role}
            </div>
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginTop: 28,
            }}
          >
            {[
              { label: "Total XP",   value: user?.xp || 0,     icon: <Trophy size={18} />, color: "#f59e0b" },
              { label: "Streak",     value: `🔥 ${user?.streak || 0}`, icon: <Flame size={18} />,  color: "#ef4444" },
              { label: "Class",      value: user?.classJoined?.className || "Not joined", icon: <User size={18} />, color: "#0d9e6e" },
            ].map(({ label, value, icon, color }) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, color, marginBottom: 6 }}>
                  {icon}
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "rgba(255,255,255,0.35)" }}>
                    {label}
                  </span>
                </div>
                <p style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coding Profiles */}
        <div className="cc-card" style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Coding Profiles</h2>

          {[
            {
              key: "leetcode", label: "LeetCode", dot: "#ffa116",
              url: (u) => `https://leetcode.com/${u}`,
            },
            {
              key: "gfg", label: "GeeksForGeeks", dot: "#2f8d46",
              url: (u) => `https://auth.geeksforgeeks.org/user/${u}`,
            },
            {
              key: "codeforces", label: "Codeforces", dot: "#1f8dd6",
              url: (u) => `https://codeforces.com/profile/${u}`,
            },
          ].map(({ key, label, dot, url }) => {
            const username = user?.codingProfiles?.[key];
            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  background: "var(--cc-bg-muted)",
                  borderRadius: 12,
                  marginBottom: 10,
                  border: "1px solid var(--cc-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: dot }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
                </div>
                {username ? (
                  <a
                    href={url(username)}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--cc-primary)",
                      textDecoration: "none",
                    }}
                  >
                    @{username} <ExternalLink size={13} />
                  </a>
                ) : (
                  <span style={{ fontSize: 13, color: "var(--cc-text-muted)" }}>Not linked</span>
                )}
              </div>
            );
          })}
        </div>

        {/* LeetCode Stats */}
        <div className="cc-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700 }}>LeetCode Stats</h2>
              <p style={{ fontSize: 13, color: "var(--cc-text-muted)", marginTop: 2 }}>
                {user?.codingProfiles?.leetcode
                  ? `@${user.codingProfiles.leetcode}`
                  : "No username linked"}
              </p>
            </div>
            <button
              onClick={handleSyncLeetCode}
              disabled={syncing || !user?.codingProfiles?.leetcode}
              className="cc-btn cc-btn-secondary cc-btn-sm"
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <RefreshCw size={14} className={syncing ? "spinning" : ""} />
              {syncing ? "Syncing..." : "Sync Stats"}
            </button>
          </div>

          {solved ? (
            <div>
              {/* Summary row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Total Solved", value: solved.solvedProblem, color: "#0d9e6e" },
                  { label: "Easy",         value: solved.easySolved,   color: "#10b981" },
                  { label: "Medium",       value: solved.mediumSolved,  color: "#f59e0b" },
                  { label: "Hard",         value: solved.hardSolved,    color: "#ef4444" },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    style={{
                      textAlign: "center",
                      padding: "16px 12px",
                      background: `${color}0d`,
                      border: `1px solid ${color}25`,
                      borderRadius: 12,
                    }}
                  >
                    <p style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
                    <p style={{ fontSize: 12, color: "var(--cc-text-muted)", marginTop: 4, fontWeight: 500 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Progress Bars */}
              {[
                { label: "Easy",   val: solved.easySolved,   total: solved.solvedProblem, color: "#10b981" },
                { label: "Medium", val: solved.mediumSolved,  total: solved.solvedProblem, color: "#f59e0b" },
                { label: "Hard",   val: solved.hardSolved,    total: solved.solvedProblem, color: "#ef4444" },
              ].map(({ label, val, total, color }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color }}>{label}</span>
                    <span style={{ fontSize: 13, color: "var(--cc-text-secondary)" }}>
                      {val} / {total}
                    </span>
                  </div>
                  <div className="cc-progress">
                    <div
                      className="cc-progress-fill"
                      style={{
                        width: total ? `${(val / total) * 100}%` : "0%",
                        background: color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cc-empty" style={{ padding: "32px 0" }}>
              <Code2 size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p style={{ fontSize: 14 }}>
                {user?.codingProfiles?.leetcode
                  ? "Click Sync Stats to load your LeetCode data"
                  : "Link your LeetCode username to see stats"}
              </p>
            </div>
          )}
        </div>

      </div>
    </StudentLayout>
  );
};

export default Profile;