import { useEffect, useState } from "react";
import TicLayout from "../../layouts/TicLayout";
import { getSubmissions, reviewSubmission } from "../../services/submissionService";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Clock, ExternalLink, Filter } from "lucide-react";

const STATUS_CFG = {
  approved: { icon: <CheckCircle size={14} />, label: "Approved", color: "#059669", bg: "rgba(16,185,129,0.1)" },
  rejected: { icon: <XCircle size={14} />,    label: "Rejected", color: "#dc2626", bg: "rgba(239,68,68,0.1)" },
  pending:  { icon: <Clock size={14} />,      label: "Pending",  color: "#d97706", bg: "rgba(245,158,11,0.1)" },
};

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [remarkModal, setRemarkModal] = useState(null);
  const [remark, setRemark] = useState("");

  const loadData = async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleApprove = async (id) => {
    try {
      setReviewingId(id);
      await reviewSubmission({ submissionId: id, status: "approved" });
      toast.success("Submission approved! XP awarded ✅");
      loadData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Review failed");
    } finally {
      setReviewingId(null);
    }
  };

  const handleReject = async () => {
    if (!remarkModal) return;
    try {
      setReviewingId(remarkModal);
      await reviewSubmission({ submissionId: remarkModal, status: "rejected", remarks: remark });
      toast.success("Submission rejected");
      setRemarkModal(null);
      setRemark("");
      loadData();
    } catch {
      toast.error("Review failed");
    } finally {
      setReviewingId(null);
    }
  };

  const filtered = submissions.filter((s) => filter === "all" || s.status === filter);

  const counts = {
    all:      submissions.length,
    pending:  submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  const diffColor = (d) =>
    d === "Easy" ? "#059669" : d === "Medium" ? "#d97706" : "#dc2626";

  return (
    <TicLayout title="Submissions">

      <div className="cc-page-header">
        <h1 className="cc-page-title">Review Submissions</h1>
        <p className="cc-page-subtitle">Approve or reject student submissions to award XP</p>
      </div>

      {/* Filter Tabs with counts */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {Object.entries(counts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="cc-btn cc-btn-sm"
            style={{
              background: filter === key
                ? (key === "pending" ? "#f59e0b"
                  : key === "approved" ? "#0d9e6e"
                  : key === "rejected" ? "#ef4444"
                  : "linear-gradient(135deg,#0d9e6e,#0a7a55)")
                : "white",
              color: filter === key ? "white" : "var(--cc-text-secondary)",
              border: filter === key ? "none" : "1px solid var(--cc-border)",
              gap: 8,
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            <span
              style={{
                background: filter === key ? "rgba(255,255,255,0.25)" : "var(--cc-bg-muted)",
                borderRadius: 999,
                padding: "1px 7px",
                fontSize: 11,
                fontWeight: 700,
                color: filter === key ? "white" : "var(--cc-text-muted)",
              }}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Submissions Table */}
      {loading ? (
        <div className="cc-empty"><div className="cc-spinner cc-spinner-dark" style={{ margin: "0 auto" }} /></div>
      ) : filtered.length === 0 ? (
        <div className="cc-empty">
          <div className="cc-empty-icon">📭</div>
          <p>No {filter !== "all" ? filter : ""} submissions found</p>
        </div>
      ) : (
        <div className="cc-card" style={{ padding: 0 }}>
          <div className="cc-table-wrapper" style={{ border: "none", borderRadius: "var(--cc-radius-xl)" }}>
            <table className="cc-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Task</th>
                  <th>Difficulty</th>
                  <th>XP</th>
                  <th>Solution</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const cfg = STATUS_CFG[s.status];
                  const isReviewing = reviewingId === s._id;
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
                            <p style={{ fontSize: 11, color: "var(--cc-text-muted)" }}>
                              {s.student?.rollNumber || s.student?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <p style={{ fontSize: 13, fontWeight: 600, maxWidth: 180 }} className="text-truncate">
                          {s.task?.title}
                        </p>
                        <p style={{ fontSize: 11, color: "var(--cc-text-muted)" }}>{s.task?.platform}</p>
                      </td>

                      <td>
                        <span
                          style={{
                            fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
                            background: `${diffColor(s.task?.difficulty)}18`,
                            color: diffColor(s.task?.difficulty),
                          }}
                        >
                          {s.task?.difficulty}
                        </span>
                      </td>

                      <td>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#0d9e6e" }}>
                          +{s.task?.xpReward}
                        </span>
                      </td>

                      <td>
                        {s.solutionLink ? (
                          <a
                            href={s.solutionLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: "var(--cc-primary)", display: "flex", alignItems: "center",
                              gap: 4, fontSize: 13, fontWeight: 600, textDecoration: "none",
                            }}
                          >
                            <ExternalLink size={13} /> View
                          </a>
                        ) : (
                          <span style={{ color: "var(--cc-text-muted)", fontSize: 13 }}>—</span>
                        )}
                      </td>

                      <td>
                        <span
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                            background: cfg.bg, color: cfg.color,
                          }}
                        >
                          {cfg.icon} {cfg.label}
                        </span>
                        {s.remarks && (
                          <p style={{ fontSize: 11, color: "var(--cc-text-muted)", marginTop: 3 }}>
                            {s.remarks}
                          </p>
                        )}
                      </td>

                      <td>
                        <span style={{ fontSize: 12, color: "var(--cc-text-muted)" }}>
                          {new Date(s.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td>
                        {s.status === "pending" && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              onClick={() => handleApprove(s._id)}
                              disabled={isReviewing}
                              className="cc-btn cc-btn-success cc-btn-sm"
                            >
                              {isReviewing ? <span className="cc-spinner cc-spinner-dark" style={{ width: 14, height: 14 }} /> : <CheckCircle size={14} />}
                            </button>
                            <button
                              onClick={() => { setRemarkModal(s._id); setRemark(""); }}
                              disabled={isReviewing}
                              className="cc-btn cc-btn-danger cc-btn-sm"
                            >
                              <XCircle size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reject with Remark Modal */}
      {remarkModal && (
        <div className="cc-modal-overlay" onClick={() => setRemarkModal(null)}>
          <div className="cc-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Reject Submission</h2>
            <p style={{ fontSize: 13, color: "var(--cc-text-muted)", marginBottom: 20 }}>
              Optionally add a remark to guide the student
            </p>
            <div className="cc-form-group">
              <label className="cc-label">Remark (optional)</label>
              <input
                type="text"
                placeholder="e.g. Please use a more efficient approach"
                className="cc-input"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                autoFocus
              />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button
                onClick={() => setRemarkModal(null)}
                className="cc-btn cc-btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={reviewingId === remarkModal}
                className="cc-btn cc-btn-danger"
                style={{ flex: 1 }}
              >
                {reviewingId === remarkModal
                  ? <span className="cc-spinner cc-spinner-dark" style={{ width: 16, height: 16 }} />
                  : <><XCircle size={15} /> Reject</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </TicLayout>
  );
};

export default Submissions;