import { useEffect, useState } from "react";
import TicLayout from "../../layouts/TicLayout";
import { getClasses } from "../../services/classService";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Plus, ExternalLink, Trash2, Calendar } from "lucide-react";

const PLATFORMS = ["LeetCode", "GFG", "Codeforces", "HackerRank", "CodeChef"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const CreateTask = () => {
  const [classes, setClasses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    platform: "LeetCode",
    questionLink: "",
    difficulty: "Medium",
    xpReward: 10,
    dueDate: new Date().toISOString().split("T")[0],
    assignedClass: "",
    description: "",
  });

  const loadData = async () => {
    try {
      const [cls, { data: t }] = await Promise.all([
        getClasses(),
        api.get("/tasks"),
      ]);
      setClasses(cls);
      setTasks(t);
      if (cls.length > 0 && !form.assignedClass) {
        setForm((f) => ({ ...f, assignedClass: cls[0]._id }));
      }
    } catch {}
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.questionLink.trim()) {
      toast.error("Title and question link are required");
      return;
    }
    try {
      setCreating(true);
      await api.post("/tasks", form);
      toast.success("Task created and assigned to class! ✅");
      setForm((f) => ({
        ...f,
        title: "",
        questionLink: "",
        description: "",
      }));
      loadData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      loadData();
    } catch {
      toast.error("Delete failed");
    }
  };

  const diffColor = (d) =>
    d === "Easy" ? "#059669" : d === "Medium" ? "#d97706" : "#dc2626";

  return (
    <TicLayout title="Create Task">
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div className="cc-page-header">
          <h1 className="cc-page-title">Create Daily Task</h1>
          <p className="cc-page-subtitle">Assign DSA problems to your class</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Form */}
          <div
            className="cc-card"
            style={{ background: "linear-gradient(135deg,#0a1612,#0d1f18)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 24 }}>
              <Plus size={18} style={{ display: "inline", marginRight: 8, color: "#4ade80" }} />
              New Task
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="cc-form-group">
                <label className="cc-label" style={{ color: "rgba(255,255,255,0.5)" }}>Problem Title *</label>
                <input
                  name="title"
                  type="text"
                  placeholder="e.g. Two Sum"
                  className="cc-input cc-input-dark"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="cc-form-group">
                <label className="cc-label" style={{ color: "rgba(255,255,255,0.5)" }}>Question URL *</label>
                <input
                  name="questionLink"
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  className="cc-input cc-input-dark"
                  value={form.questionLink}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="cc-form-group">
                  <label className="cc-label" style={{ color: "rgba(255,255,255,0.5)" }}>Platform</label>
                  <select
                    name="platform"
                    className="cc-select"
                    style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1.5px solid rgba(255,255,255,0.1)" }}
                    value={form.platform}
                    onChange={handleChange}
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p} style={{ background: "#0a1612" }}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="cc-form-group">
                  <label className="cc-label" style={{ color: "rgba(255,255,255,0.5)" }}>Difficulty</label>
                  <select
                    name="difficulty"
                    className="cc-select"
                    style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1.5px solid rgba(255,255,255,0.1)" }}
                    value={form.difficulty}
                    onChange={handleChange}
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d} style={{ background: "#0a1612" }}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="cc-form-group">
                  <label className="cc-label" style={{ color: "rgba(255,255,255,0.5)" }}>XP Reward</label>
                  <input
                    name="xpReward"
                    type="number"
                    min={1}
                    max={100}
                    className="cc-input cc-input-dark"
                    value={form.xpReward}
                    onChange={handleChange}
                  />
                </div>

                <div className="cc-form-group">
                  <label className="cc-label" style={{ color: "rgba(255,255,255,0.5)" }}>Due Date</label>
                  <input
                    name="dueDate"
                    type="date"
                    className="cc-input cc-input-dark"
                    value={form.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {classes.length > 1 && (
                <div className="cc-form-group">
                  <label className="cc-label" style={{ color: "rgba(255,255,255,0.5)" }}>Assign To Class</label>
                  <select
                    name="assignedClass"
                    className="cc-select"
                    style={{ background: "rgba(255,255,255,0.05)", color: "white", border: "1.5px solid rgba(255,255,255,0.1)" }}
                    value={form.assignedClass}
                    onChange={handleChange}
                  >
                    {classes.map((c) => (
                      <option key={c._id} value={c._id} style={{ background: "#0a1612" }}>
                        {c.className}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                id="create-task-btn"
                type="submit"
                disabled={creating}
                className="cc-btn cc-btn-primary"
                style={{ width: "100%", marginTop: 8 }}
              >
                {creating ? <span className="cc-spinner" /> : <><Plus size={16} /> Create Task</>}
              </button>
            </form>
          </div>

          {/* Task History */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
              Task History <span style={{ fontSize: 13, color: "var(--cc-text-muted)", fontWeight: 400 }}>({tasks.length} total)</span>
            </h2>

            {tasks.length === 0 ? (
              <div className="cc-empty">
                <div className="cc-empty-icon">📋</div>
                <p>No tasks yet. Create your first one!</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="cc-card"
                    style={{ padding: "16px 18px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }} className="text-truncate">
                          {task.title}
                        </h3>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <span style={{ background: "#f0f7f4", color: "#0d9e6e", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
                            {task.platform}
                          </span>
                          <span
                            style={{
                              background: `${diffColor(task.difficulty)}18`,
                              color: diffColor(task.difficulty),
                              padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                            }}
                          >
                            {task.difficulty}
                          </span>
                          <span style={{ background: "rgba(13,158,110,0.1)", color: "#0d9e6e", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
                            +{task.xpReward} XP
                          </span>
                        </div>
                        {task.dueDate && (
                          <p style={{ fontSize: 11, color: "var(--cc-text-muted)", marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
                            <Calendar size={11} />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <a
                          href={task.questionLink}
                          target="_blank"
                          rel="noreferrer"
                          className="cc-btn cc-btn-ghost cc-btn-sm"
                          style={{ padding: "6px 8px", textDecoration: "none" }}
                          title="Open problem"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="cc-btn cc-btn-danger cc-btn-sm"
                          style={{ padding: "6px 8px" }}
                          title="Delete task"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </TicLayout>
  );
};

export default CreateTask;