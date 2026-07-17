import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import {
  Code2, Trophy, Flame, ArrowRight, Users,
  Target, Star, ExternalLink, TrendingUp
} from "lucide-react";

const MEDALS = ["🥇", "🥈", "🥉"];

const GuestLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Public endpoint — no auth needed
    api
      .get("/leaderboard")
      .then(({ data }) => setUsers(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  const PODIUM_HEIGHTS = [90, 120, 70];
  const PODIUM_COLORS = [
    "linear-gradient(180deg,#94a3b8,#64748b)",
    "linear-gradient(180deg,#fbbf24,#f59e0b)",
    "linear-gradient(180deg,#c2854e,#a0652a)",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1612",
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5vw",
          height: 64,
          background: "rgba(10,22,18,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Code2 size={16} color="white" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>CodeCamp</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 12, fontWeight: 700, color: "#4ade80",
              background: "rgba(13,158,110,0.12)",
              border: "1px solid rgba(13,158,110,0.25)",
              padding: "4px 12px", borderRadius: 999,
              textTransform: "uppercase", letterSpacing: "1px",
            }}
          >
            👁 Guest Mode
          </span>
          <Link
            to="/login"
            style={{
              color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500,
              textDecoration: "none", padding: "7px 14px",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
              color: "white", fontSize: 14, fontWeight: 600,
              textDecoration: "none", padding: "8px 18px", borderRadius: 9,
            }}
          >
            Join Now
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "5px 14px", borderRadius: 999,
              background: "rgba(13,158,110,0.12)", border: "1px solid rgba(13,158,110,0.25)",
              fontSize: 12, fontWeight: 700, color: "#4ade80",
              textTransform: "uppercase", letterSpacing: "1px", marginBottom: 20,
            }}
          >
            <Star size={12} fill="#4ade80" /> Public Leaderboard
          </div>
          <h1
            style={{
              fontSize: "clamp(28px,4vw,44px)", fontWeight: 900,
              letterSpacing: -1, lineHeight: 1.15, marginBottom: 14,
            }}
          >
            Top Coders on{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#4ade80,#0d9e6e)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              CodeCamp
            </span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            Browse the public leaderboard. Rankings are based on XP earned from completed tasks.
            <br />
            <Link
              to="/register"
              style={{ color: "#4ade80", fontWeight: 600, textDecoration: "none" }}
            >
              Join to compete →
            </Link>
          </p>
        </div>

        {/* Guest CTA Banner */}
        <div
          style={{
            background: "linear-gradient(135deg,rgba(13,158,110,0.1),rgba(13,158,110,0.04))",
            border: "1px solid rgba(13,158,110,0.2)",
            borderRadius: 16, padding: "20px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 16, marginBottom: 40, flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 4 }}>
              🚀 Want to appear on this leaderboard?
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
              Register now, join your class and start solving daily tasks.
            </p>
          </div>
          <Link
            to="/register"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
              color: "white", textDecoration: "none",
              padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700,
              whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(13,158,110,0.35)",
              flexShrink: 0,
            }}
          >
            Get Started <ArrowRight size={15} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "3px solid rgba(255,255,255,0.1)",
                borderTopColor: "#0d9e6e",
                animation: "spin 0.7s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Loading leaderboard...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div
            style={{
              textAlign: "center", padding: "60px 0",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <p style={{ fontSize: 40, marginBottom: 12 }}>😔</p>
            <p style={{ fontSize: 15 }}>Could not load leaderboard. The server may be offline.</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && users.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.35)" }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🏆</p>
            <p style={{ fontSize: 15 }}>No students yet — be the first!</p>
            <Link to="/register" style={{ color: "#4ade80", fontWeight: 600, textDecoration: "none" }}>
              Register now →
            </Link>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <>
            {/* Podium */}
            {top3.length >= 1 && (
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20, padding: "40px 32px 0",
                  marginBottom: 28,
                }}
              >
                <p
                  style={{
                    textAlign: "center", fontSize: 12, fontWeight: 700,
                    color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
                    letterSpacing: "1.5px", marginBottom: 32,
                  }}
                >
                  Top 3 Performers
                </p>
                <div
                  style={{
                    display: "flex", alignItems: "flex-end",
                    justifyContent: "center", gap: 12,
                  }}
                >
                  {[
                    { u: top3[1], rank: 2 },
                    { u: top3[0], rank: 1 },
                    { u: top3[2], rank: 3 },
                  ]
                    .filter(({ u }) => u)
                    .map(({ u, rank }) => (
                      <div
                        key={u._id}
                        style={{
                          display: "flex", flexDirection: "column",
                          alignItems: "center", gap: 10,
                          flex: rank === 1 ? "0 0 160px" : "0 0 130px",
                        }}
                      >
                        <span style={{ fontSize: rank === 1 ? 28 : 22 }}>{MEDALS[rank - 1]}</span>
                        <div
                          style={{
                            width: rank === 1 ? 64 : 52,
                            height: rank === 1 ? 64 : 52,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontWeight: 800,
                            fontSize: rank === 1 ? 22 : 18,
                            border: rank === 1 ? "3px solid #fbbf24" : "2px solid rgba(255,255,255,0.1)",
                            boxShadow: rank === 1 ? "0 0 20px rgba(251,191,36,0.25)" : "none",
                          }}
                        >
                          {u.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <p
                            style={{
                              fontSize: rank === 1 ? 15 : 13, fontWeight: 700,
                              color: "white", maxWidth: 130,
                              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}
                          >
                            {u.name}
                          </p>
                          <p style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>
                            {u.xp} XP · 🔥{u.streak}
                          </p>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: PODIUM_HEIGHTS[rank - 1],
                            background: PODIUM_COLORS[rank - 1],
                            borderRadius: "10px 10px 0 0",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <span style={{ fontSize: 20, fontWeight: 900, color: "rgba(0,0,0,0.15)" }}>
                            #{rank}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Full Table */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20, overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <h2 style={{ fontSize: 15, fontWeight: 700 }}>All Rankings</h2>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                  {users.length} coders
                </span>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%", borderCollapse: "collapse",
                    fontSize: 14,
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {["Rank", "Student", "LeetCode", "Streak", "XP"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 20px",
                            textAlign: h === "XP" || h === "Streak" ? "center" : "left",
                            fontSize: 11, fontWeight: 700,
                            color: "rgba(255,255,255,0.25)",
                            textTransform: "uppercase", letterSpacing: "0.8px",
                            background: "rgba(255,255,255,0.02)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr
                        key={u._id}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "14px 20px" }}>
                          {i < 3 ? (
                            <span style={{ fontSize: 18 }}>{MEDALS[i]}</span>
                          ) : (
                            <span
                              style={{
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                width: 28, height: 28, borderRadius: 8,
                                background: "rgba(255,255,255,0.05)",
                                fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)",
                              }}
                            >
                              {i + 1}
                            </span>
                          )}
                        </td>

                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div
                              style={{
                                width: 36, height: 36, borderRadius: "50%",
                                background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "white", fontWeight: 700, fontSize: 14, flexShrink: 0,
                              }}
                            >
                              {u.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                              <p style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{u.name}</p>
                              {u.rollNumber && (
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{u.rollNumber}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: "14px 20px" }}>
                          {u.codingProfiles?.leetcode ? (
                            <a
                              href={`https://leetcode.com/${u.codingProfiles.leetcode}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 5,
                                fontSize: 13, color: "#ffa116", textDecoration: "none",
                                fontWeight: 500,
                              }}
                            >
                              @{u.codingProfiles.leetcode}
                              <ExternalLink size={11} />
                            </a>
                          ) : (
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>—</span>
                          )}
                        </td>

                        <td style={{ padding: "14px 20px", textAlign: "center" }}>
                          <span style={{ fontSize: 14, fontWeight: 600 }}>🔥 {u.streak}</span>
                        </td>

                        <td style={{ padding: "14px 20px", textAlign: "center" }}>
                          <span
                            style={{
                              fontSize: 17, fontWeight: 900,
                              background: "linear-gradient(135deg,#4ade80,#0d9e6e)",
                              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}
                          >
                            {u.xp}
                          </span>
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: 3 }}>XP</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom CTA */}
            <div
              style={{
                marginTop: 40, textAlign: "center", padding: "40px 24px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
              }}
            >
              <p style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
                See yourself here?
              </p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
                Register now, join your class and start earning XP today.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  to="/register"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                    color: "white", textDecoration: "none",
                    padding: "12px 24px", borderRadius: 10, fontSize: 15, fontWeight: 700,
                    boxShadow: "0 4px 16px rgba(13,158,110,0.35)",
                  }}
                >
                  Get Started <ArrowRight size={16} />
                </Link>
                <Link
                  to="/login"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)", textDecoration: "none",
                    padding: "12px 24px", borderRadius: 10, fontSize: 15, fontWeight: 500,
                  }}
                >
                  Already a member? Login
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "20px 5vw",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex", alignItems: "center", gap: 8, textDecoration: "none",
          }}
        >
          <Code2 size={15} color="#0d9e6e" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
            CodeCamp
          </span>
        </Link>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
          Public leaderboard — register to compete
        </p>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default GuestLeaderboard;
