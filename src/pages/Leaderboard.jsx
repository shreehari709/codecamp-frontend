import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import StudentLayout from "../layouts/StudentLayout";
import { getLeaderboard } from "../services/leaderboardService";
import { Trophy, Flame, Medal, Target } from "lucide-react";

const Leaderboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const top3 = users.slice(0, 3);
  const rest  = users.slice(3);

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  const MEDALS = ["🥇", "🥈", "🥉"];
  const PODIUM_HEIGHTS = [90, 120, 70];
  const PODIUM_COLORS  = [
    "linear-gradient(180deg,#94a3b8,#64748b)",
    "linear-gradient(180deg,#fbbf24,#f59e0b)",
    "linear-gradient(180deg,#c2854e,#a0652a)",
  ];

  return (
    <StudentLayout title="Leaderboard">

      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div className="cc-page-header">
          <h1 className="cc-page-title">Class Leaderboard 🏆</h1>
          <p className="cc-page-subtitle">Ranked by XP earned from approved submissions</p>
        </div>

        {loading ? (
          <div className="cc-empty"><div className="cc-spinner cc-spinner-dark" style={{ margin: "0 auto" }} /></div>
        ) : users.length === 0 ? (
          <div className="cc-empty">
            <div className="cc-empty-icon">🏆</div>
            <p>No students yet. Be the first to earn XP!</p>
          </div>
        ) : (
          <>
            {/* Podium — top 3 */}
            {top3.length > 0 && (
              <div
                style={{
                  background: "linear-gradient(135deg,#0a1612,#0d1f18)",
                  borderRadius: 20,
                  padding: "40px 32px 0",
                  marginBottom: 24,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1.5px", textAlign: "center", marginBottom: 32 }}>
                  Top Performers
                </h2>

                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 12 }}>
                  {/* Render in order: 2nd, 1st, 3rd */}
                  {[
                    { user: top3[1], rank: 2, heightFactor: 0.75 },
                    { user: top3[0], rank: 1, heightFactor: 1 },
                    { user: top3[2], rank: 3, heightFactor: 0.58 },
                  ].filter((item) => item.user).map(({ user: u, rank }) => (
                    <div
                      key={u._id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        flex: rank === 1 ? "0 0 160px" : "0 0 130px",
                      }}
                    >
                      {/* Rank medal */}
                      <div style={{ fontSize: rank === 1 ? 28 : 22 }}>{MEDALS[rank - 1]}</div>

                      {/* Avatar */}
                      <div
                        style={{
                          width: rank === 1 ? 64 : 52,
                          height: rank === 1 ? 64 : 52,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 800,
                          fontSize: rank === 1 ? 22 : 18,
                          border: rank === 1 ? "3px solid #fbbf24" : "2px solid rgba(255,255,255,0.15)",
                          boxShadow: rank === 1 ? "0 0 20px rgba(251,191,36,0.3)" : "none",
                        }}
                      >
                        {u.name?.charAt(0)?.toUpperCase()}
                      </div>

                      {/* Name & XP */}
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            fontSize: rank === 1 ? 15 : 13,
                            fontWeight: 700,
                            color: "white",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: rank === 1 ? 140 : 115,
                          }}
                        >
                          {u.name}
                        </p>
                        <p style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>
                          {u.xp} XP
                        </p>
                      </div>

                      {/* Podium block */}
                      <div
                        style={{
                          width: "100%",
                          height: PODIUM_HEIGHTS[rank - 1],
                          background: PODIUM_COLORS[rank - 1],
                          borderRadius: "12px 12px 0 0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: 22, fontWeight: 900, color: "rgba(0,0,0,0.2)" }}>
                          #{rank}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Leaderboard Table */}
            <div className="cc-card" style={{ padding: 0 }}>
              <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--cc-border)" }}>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>All Rankings</h2>
              </div>

              <div className="cc-table-wrapper" style={{ border: "none", borderRadius: 0 }}>
                <table className="cc-table">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>Rank</th>
                      <th>Student</th>
                      <th>LeetCode</th>
                      <th style={{ textAlign: "center" }}>Streak</th>
                      <th style={{ textAlign: "right" }}>XP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => {
                      const isCurrentUser = u._id === user?._id;
                      return (
                        <tr
                          key={u._id}
                          style={{
                            background: isCurrentUser ? "rgba(13,158,110,0.04)" : undefined,
                          }}
                        >
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              {i < 3 ? (
                                <span style={{ fontSize: 18 }}>{MEDALS[i]}</span>
                              ) : (
                                <span
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 8,
                                    background: "var(--cc-bg-muted)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: "var(--cc-text-muted)",
                                  }}
                                >
                                  {i + 1}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: "50%",
                                  background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  fontWeight: 700,
                                  fontSize: 14,
                                  flexShrink: 0,
                                }}
                              >
                                {u.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <p
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "var(--cc-text-primary)",
                                  }}
                                >
                                  {u.name}
                                  {isCurrentUser && (
                                    <span
                                      style={{
                                        marginLeft: 8,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        background: "rgba(13,158,110,0.12)",
                                        color: "#0d9e6e",
                                        padding: "2px 7px",
                                        borderRadius: 999,
                                      }}
                                    >
                                      You
                                    </span>
                                  )}
                                </p>
                                {u.rollNumber && (
                                  <p style={{ fontSize: 12, color: "var(--cc-text-muted)" }}>
                                    {u.rollNumber}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: 13, color: "var(--cc-text-secondary)" }}>
                              {u.codingProfiles?.leetcode || "—"}
                            </span>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span style={{ fontSize: 14, fontWeight: 600 }}>
                              🔥 {u.streak}
                            </span>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <span
                              style={{
                                fontSize: 16,
                                fontWeight: 800,
                                color: "var(--cc-primary)",
                              }}
                            >
                              {u.xp}
                            </span>
                            <span style={{ fontSize: 12, color: "var(--cc-text-muted)", marginLeft: 2 }}>XP</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </StudentLayout>
  );
};

export default Leaderboard;