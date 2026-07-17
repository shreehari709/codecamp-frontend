import { useEffect, useState } from "react";
import TicLayout from "../../layouts/TicLayout";
import { createClass, getClasses } from "../../services/classService";
import toast from "react-hot-toast";
import { Plus, Copy, Check, Users, Hash } from "lucide-react";

const Classes = () => {
  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const load = async () => {
    try {
      const data = await getClasses();
      setClasses(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!className.trim()) return toast.error("Enter a class name");
    try {
      setCreating(true);
      await createClass({ className });
      toast.success("Class created! Share the code with your students 🎉");
      setClassName("");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create class");
    } finally {
      setCreating(false);
    }
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success("Class code copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <TicLayout title="Classes">

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div className="cc-page-header">
          <h1 className="cc-page-title">Manage Classes</h1>
          <p className="cc-page-subtitle">Create classes and share the join code with your students</p>
        </div>

        {/* Create Class Form */}
        <div
          className="cc-card"
          style={{ marginBottom: 28, background: "linear-gradient(135deg,#0a1612,#0d1f18)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 20 }}>
            <Plus size={18} style={{ display: "inline", marginRight: 8, color: "#4ade80" }} />
            Create New Class
          </h2>
          <form onSubmit={handleCreate} style={{ display: "flex", gap: 12 }}>
            <input
              id="class-name-input"
              type="text"
              placeholder="e.g. MCA Batch 2024 — DSA"
              className="cc-input cc-input-dark"
              style={{ flex: 1 }}
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <button
              id="create-class-btn"
              type="submit"
              disabled={creating}
              className="cc-btn cc-btn-primary"
              style={{ flexShrink: 0 }}
            >
              {creating ? <span className="cc-spinner" /> : <><Plus size={16} /> Create</>}
            </button>
          </form>
        </div>

        {/* Classes List */}
        {loading ? (
          <div className="cc-empty"><div className="cc-spinner cc-spinner-dark" style={{ margin: "0 auto" }} /></div>
        ) : classes.length === 0 ? (
          <div className="cc-empty">
            <div className="cc-empty-icon">🏫</div>
            <p>No classes yet. Create your first one above!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {classes.map((cls) => (
              <div key={cls._id} className="cc-card" style={{ padding: 0 }}>
                {/* Class Header */}
                <div
                  style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid var(--cc-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700 }}>{cls.className}</h3>
                    <p style={{ fontSize: 13, color: "var(--cc-text-muted)", marginTop: 2 }}>
                      <Users size={13} style={{ display: "inline", marginRight: 4 }} />
                      {cls.students?.length || 0} student{(cls.students?.length || 0) !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Join Code */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>
                      <p style={{ fontSize: 11, color: "var(--cc-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
                        Join Code
                      </p>
                      <div
                        style={{
                          background: "linear-gradient(135deg,rgba(13,158,110,0.08),rgba(13,158,110,0.04))",
                          border: "1px solid rgba(13,158,110,0.2)",
                          borderRadius: 10,
                          padding: "8px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Courier New', monospace",
                            fontSize: 20,
                            fontWeight: 800,
                            letterSpacing: "3px",
                            color: "#0a7a55",
                          }}
                        >
                          {cls.classCode}
                        </span>
                        <button
                          onClick={() => copyCode(cls.classCode, cls._id)}
                          title="Copy code"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: copiedId === cls._id ? "#0d9e6e" : "var(--cc-text-muted)",
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.2s",
                          }}
                        >
                          {copiedId === cls._id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Students List */}
                {cls.students?.length > 0 ? (
                  <div style={{ padding: "16px 24px" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", color: "var(--cc-text-muted)", marginBottom: 12 }}>
                      Students
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                      {cls.students.map((s) => (
                        <div
                          key={s._id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                            background: "var(--cc-bg-muted)",
                            borderRadius: 10,
                            border: "1px solid var(--cc-border)",
                          }}
                        >
                          <div
                            style={{
                              width: 32, height: 32, borderRadius: "50%",
                              background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0,
                            }}
                          >
                            {s.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {s.name}
                            </p>
                            <p style={{ fontSize: 11, color: "var(--cc-text-muted)" }}>
                              {s.xp} XP · 🔥{s.streak}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "20px 24px", textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: "var(--cc-text-muted)" }}>
                      Share the code <strong>{cls.classCode}</strong> with your students so they can join.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </TicLayout>
  );
};

export default Classes;