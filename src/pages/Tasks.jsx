import { useEffect, useState } from "react";
import StudentLayout from "../layouts/StudentLayout";
import { getTasks } from "../services/taskService";
import { getMySubmissions } from "../services/submissionService";
import { submitTask } from "../services/taskService";
import toast from "react-hot-toast";
import { ExternalLink, CheckCircle, Clock, XCircle, Send, X } from "lucide-react";

const PLATFORM_COLORS = {
  leetcode:   { bg: "rgba(255,161,22,0.1)", color: "#c17d00" },
  gfg:        { bg: "rgba(47,141,70,0.1)",  color: "#1e6b30" },
  codeforces: { bg: "rgba(31,141,214,0.1)", color: "#1565a8" },
};

const STATUS_CONFIG = {
  approved: { icon: <CheckCircle size={14} />, label: "Approved", color: "#059669", bg: "rgba(16,185,129,0.1)" },
  rejected: { icon: <XCircle size={14} />,    label: "Rejected", color: "#dc2626", bg: "rgba(239,68,68,0.1)" },
  pending:  { icon: <Clock size={14} />,      label: "Pending",  color: "#d97706", bg: "rgba(245,158,11,0.1)" },
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(null);
  const [modalTask, setModalTask] = useState(null);
  const [link, setLink] = useState("");
  const [filter, setFilter] = useState("all");

  const loadData = async () => {
    try {
      const [t, s] = await Promise.all([getTasks(), getMySubmissions()]);
      setTasks(t);
      setSubmissions(s);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const subMap = {};
  submissions.forEach((s) => {
    if (s.task) subMap[s.task._id || s.task] = s;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link.trim()) return toast.error("Please paste your solution link");
    try {
      setSubmitting(modalTask._id);
      await submitTask({ taskId: modalTask._id, solutionLink: link });
      toast.success("Submission sent! Awaiting TIC review 🎉");
      setModalTask(null);
      setLink("");
      loadData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(null);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const sub = subMap[t._id];
    if (filter === "pending")  return sub && sub.status === "pending";
    if (filter === "approved") return sub && sub.status === "approved";
    if (filter === "unsolved") return !sub;
    return true;
  });

  return (
    <StudentLayout title="My Tasks">

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        {["all", "unsolved", "pending", "approved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="cc-btn cc-btn-sm"
            style={{
              background: filter === f ? "linear-gradient(135deg,#0d9e6e,#0a7a55)" : "white",
              color: filter === f ? "white" : "var(--cc-text-secondary)",
              border: filter === f ? "none" : "1px solid var(--cc-border)",
              boxShadow: filter === f ? "0 2px 8px rgba(13,158,110,0.25)" : "none",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--cc-text-muted)" }}>
          {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Task Grid */}
      {loading ? (
        <div className="cc-empty"><div className="cc-spinner cc-spinner-dark" style={{ margin: "0 auto" }} /></div>
      ) : filteredTasks.length === 0 ? (
        <div className="cc-empty">
          <div className="cc-empty-icon">📭</div>
          <p>No tasks here yet.</p>
        </div>
      ) : (
        <div className="cc-grid-2">
          {filteredTasks.map((task) => {
            const sub = subMap[task._id];
            const statusCfg = sub ? STATUS_CONFIG[sub.status] : null;
            const platform = task.platform?.toLowerCase();
            const pc = PLATFORM_COLORS[platform] || { bg: "#f0f7f4", color: "#0d9e6e" };
            const diffColor =
              task.difficulty === "Easy" ? "#059669"
              : task.difficulty === "Medium" ? "#d97706"
              : "#dc2626";

            return (
              <div key={task._id} className="cc-task-card">
                {/* Status badge top-right */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--cc-text-primary)", lineHeight: 1.3 }}>
                      {task.title}
                    </h3>
                  </div>
                  {statusCfg && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                        background: statusCfg.bg,
                        color: statusCfg.color,
                      }}
                    >
                      {statusCfg.icon} {statusCfg.label}
                    </span>
                  )}
                </div>

                {/* Badges */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                  <span style={{ ...pc, padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                    {task.platform}
                  </span>
                  <span style={{ background: `${diffColor}18`, color: diffColor, padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                    {task.difficulty}
                  </span>
                  <span style={{ background: "rgba(13,158,110,0.1)", color: "#0d9e6e", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                    +{task.xpReward} XP
                  </span>
                </div>

                {/* Remarks (if rejected) */}
                {sub?.status === "rejected" && sub.remarks && (
                  <div
                    style={{
                      background: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      borderRadius: 8,
                      padding: "8px 12px",
                      marginBottom: 14,
                      fontSize: 13,
                      color: "#dc2626",
                    }}
                  >
                    TIC: {sub.remarks}
                  </div>
                )}

                {/* Solution link if submitted */}
                {sub?.solutionLink && (
                  <div style={{ marginBottom: 14 }}>
                    <a
                      href={sub.solutionLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: 12, color: "var(--cc-primary)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <ExternalLink size={12} /> Your solution
                    </a>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: "flex", gap: 10 }}>
                  <a
                    href={task.questionLink}
                    target="_blank"
                    rel="noreferrer"
                    className="cc-btn cc-btn-secondary cc-btn-sm"
                    style={{ textDecoration: "none", display: "inline-flex" }}
                  >
                    Open <ExternalLink size={12} />
                  </a>

                  {!sub && (
                    <button
                      onClick={() => { setModalTask(task); setLink(""); }}
                      className="cc-btn cc-btn-primary cc-btn-sm"
                    >
                      <Send size={13} /> Submit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Submit Modal */}
      {modalTask && (
        <div className="cc-modal-overlay" onClick={() => setModalTask(null)}>
          <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800 }}>Submit Solution</h2>
              <button
                onClick={() => setModalTask(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--cc-text-muted)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--cc-text-primary)", marginBottom: 4 }}>
              {modalTask.title}
            </p>
            <p style={{ fontSize: 13, color: "var(--cc-text-muted)", marginBottom: 20 }}>
              Paste your GitHub / LeetCode submission URL below
            </p>

            <form onSubmit={handleSubmit}>
              <div className="cc-form-group">
                <label className="cc-label">Solution Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  className="cc-input"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  autoFocus
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setModalTask(null)}
                  className="cc-btn cc-btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting === modalTask._id}
                  className="cc-btn cc-btn-primary"
                  style={{ flex: 1 }}
                >
                  {submitting === modalTask._id ? <span className="cc-spinner" /> : <><Send size={14} /> Submit</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default Tasks;