import { useEffect, useState } from "react";
import TicLayout from "../../layouts/TicLayout";
import { getClasses } from "../../services/classService";
import { getTasks } from "../../services/taskService";
import { getSubmissions } from "../../services/submissionService";
import { Users, ClipboardList, FileCheck, Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react";

const STATUS_CFG = {
  approved: { color: "#059669", bg: "rgba(16,185,129,0.1)", icon: <CheckCircle size={13} /> },
  rejected: { color: "#dc2626", bg: "rgba(239,68,68,0.1)",  icon: <XCircle size={13} /> },
  pending:  { color: "#d97706", bg: "rgba(245,158,11,0.1)",  icon: <Clock size={13} /> },
};

const TicDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [classes, tasks, submissions] = await Promise.all([
          getClasses(),
          getTasks(),
          getSubmissions(),
        ]);
        const totalStudents = classes.reduce((sum, c) => sum + (c.students?.length || 0), 0);
        const pending  = submissions.filter((s) => s.status === "pending").length;
        const approved = submissions.filter((s) => s.status === "approved").length;
        setData({
          classes,
          totalStudents,
          totalTasks: tasks.length,
          totalSubmissions: submissions.length,
          pending,
          approved,
          recent: submissions.slice(0, 8),
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = data
    ? [
        { label: "Total Students", value: data.totalStudents,    icon: <Users size={20} />, color: "#8b5cf6" },
        { label: "Tasks Created",  value: data.totalTasks,       icon: <ClipboardList size={20} />, color: "#0d9e6e" },
        { label: "Submissions",    value: data.totalSubmissions, icon: <FileCheck size={20} />, color: "#3b82f6" },
        { label: "Pending Review", value: data.pending,          icon: <Clock size={20} />, color: "#f59e0b" },
      ]
    : [];

  return (
    <TicLayout title="TIC Dashboard">

      {/* Welcome */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Overview</h1>
        <p style={{ fontSize: 14, color: "var(--cc-text-muted)", marginTop: 4 }}>
          {data?.pending > 0
            ? `⚡ You have ${data.pending} submission${data.pending > 1 ? "s" : ""} waiting for review`
            : "All submissions reviewed — great job!"}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="cc-grid-4" style={{ marginBottom: 28 }}>
        {loading
          ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="cc-stat-card" style={{ animation: "pulse 1.5s infinite" }}>
                <div style={{ height: 50, background: "#f0f7f4", borderRadius: 8, flex: 1 }} />
              </div>
            ))
          : stats.map(({ label, value, icon, color }) => (
              <div key={label} className="cc-stat-card">
                <div>
                  <p className="cc-stat-label">{label}</p>
                  <h2 className="cc-stat-value">{value}</h2>
                </div>
                <div className="cc-stat-icon" style={{ background: `${color}18`, color }}>
                  {icon}
                </div>
              </div>
            ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Recent Submissions */}
        <div className="cc-card" style={{ padding: 0, gridColumn: "1 / -1" }}>
          <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--cc-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Submissions</h2>
            <a href="/tic/submissions" style={{ fontSize: 13, color: "var(--cc-primary)", fontWeight: 600, textDecoration: "none" }}>
              View all →
            </a>
          </div>

          {loading ? (
            <div className="cc-empty"><div className="cc-spinner cc-spinner-dark" style={{ margin: "0 auto" }} /></div>
          ) : data?.recent?.length === 0 ? (
            <div className="cc-empty">
              <div className="cc-empty-icon">📭</div>
              <p>No submissions yet</p>
            </div>
          ) : (
            <div className="cc-table-wrapper" style={{ border: "none", borderRadius: 0 }}>
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Task</th>
                    <th>Platform</th>
                    <th>Status</th>
                    <th>Solution</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent.map((s) => {
                    const cfg = STATUS_CFG[s.status];
                    return (
                      <tr key={s._id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div
                              style={{
                                width: 32, height: 32, borderRadius: "50%",
                                background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0,
                              }}
                            >
                              {s.student?.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 600 }}>{s.student?.name}</p>
                              <p style={{ fontSize: 11, color: "var(--cc-text-muted)" }}>{s.student?.rollNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p style={{ fontSize: 13, fontWeight: 600, maxWidth: 200 }} className="text-truncate">
                            {s.task?.title}
                          </p>
                        </td>
                        <td>
                          <span style={{ fontSize: 12, color: "var(--cc-text-secondary)" }}>{s.task?.platform}</span>
                        </td>
                        <td>
                          <span
                            style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                              background: cfg.bg, color: cfg.color,
                            }}
                          >
                            {cfg.icon} {s.status}
                          </span>
                        </td>
                        <td>
                          {s.solutionLink && (
                            <a href={s.solutionLink} target="_blank" rel="noreferrer"
                              style={{ color: "var(--cc-primary)", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                              <ExternalLink size={13} /> View
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Class Overview */}
        <div className="cc-card" style={{ gridColumn: "1 / -1" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Your Classes</h2>
          {loading ? null : data?.classes?.length === 0 ? (
            <div className="cc-empty" style={{ padding: "24px 0" }}>
              <p>No classes yet. <a href="/tic/classes" style={{ color: "var(--cc-primary)", fontWeight: 600 }}>Create one →</a></p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {data.classes.map((c) => (
                <div
                  key={c._id}
                  style={{
                    padding: "16px 20px",
                    background: "var(--cc-bg-muted)",
                    border: "1px solid var(--cc-border)",
                    borderRadius: 12,
                  }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{c.className}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span className="cc-code-badge" style={{ fontSize: 14, letterSpacing: "2px", padding: "4px 12px" }}>
                      {c.classCode}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--cc-text-muted)" }}>
                    <Users size={13} style={{ display: "inline", marginRight: 4 }} />
                    {c.students?.length || 0} student{(c.students?.length || 0) !== 1 ? "s" : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </TicLayout>
  );
};

export default TicDashboard;