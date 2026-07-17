import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Code2, Eye, EyeOff, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const STEPS = ["Account", "Coding Profiles", "Join Class"];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    rollNumber: "",
    leetcode: "",
    gfg: "",
    codeforces: "",
    classCode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateStep = () => {
    if (step === 0) {
      if (!form.name.trim()) return toast.error("Name is required");
      if (!form.email.trim()) return toast.error("Email is required");
      if (form.password.length < 6)
        return toast.error("Password must be at least 6 characters");
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await registerUser(form);
      login(data.user, data.token);
      toast.success("Account created! Welcome to CodeCamp 🚀");
      navigate(data.user.role === "tic" ? "/tic" : "/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-auth-wrapper">
      {/* Left Panel */}
      <div className="cc-auth-left">
        <div style={{ position: "relative", zIndex: 1, maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(135deg,#0d9e6e,#0a7a55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(13,158,110,0.4)",
              }}
            >
              <Code2 size={26} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "white" }}>CodeCamp</h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>DSA Tracker Platform</p>
            </div>
          </div>

          <h2
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
              letterSpacing: -0.8,
              marginBottom: 16,
            }}
          >
            Start your DSA journey
            <br />
            <span style={{ color: "#4ade80" }}>today.</span>
          </h2>

          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 40 }}>
            Register as a student or TIC. Connect your coding profiles and start solving daily challenges.
          </p>

          {/* Steps indicator */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {STEPS.map((s, i) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: i > step ? 0.35 : 1,
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontWeight: 700,
                    fontSize: 13,
                    background:
                      i < step
                        ? "#0d9e6e"
                        : i === step
                        ? "rgba(13,158,110,0.3)"
                        : "rgba(255,255,255,0.08)",
                    border:
                      i === step
                        ? "1px solid rgba(13,158,110,0.5)"
                        : i < step
                        ? "none"
                        : "1px solid rgba(255,255,255,0.1)",
                    color: i < step ? "white" : "#4ade80",
                  }}
                >
                  {i < step ? <Check size={15} /> : i + 1}
                </div>
                <span style={{ color: i === step ? "white" : "rgba(255,255,255,0.5)", fontWeight: i === step ? 600 : 400, fontSize: 14 }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Multi-step Form */}
      <div className="cc-auth-right">
        <div className="cc-auth-form">
          {/* Progress indicator */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--cc-primary)" }}>
                Step {step + 1} of {STEPS.length}
              </span>
              <span style={{ fontSize: 12, color: "var(--cc-text-muted)" }}>{STEPS[step]}</span>
            </div>
            <div className="cc-progress">
              <div
                className="cc-progress-fill"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--cc-text-primary)", letterSpacing: -0.3 }}>
              {step === 0 && "Create your account"}
              {step === 1 && "Your coding profiles"}
              {step === 2 && "Join your class"}
            </h2>
            <p style={{ fontSize: 13, color: "var(--cc-text-muted)", marginTop: 4 }}>
              {step === 0 && "Basic info to get started"}
              {step === 1 && "Link your competitive programming profiles"}
              {step === 2 && "Enter the class code from your TIC (optional)"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 0 — Account Info */}
            {step === 0 && (
              <>
                <div className="cc-form-group">
                  <label className="cc-label">Full Name</label>
                  <input
                    id="reg-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="cc-input"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="cc-form-group">
                  <label className="cc-label">Roll Number (optional)</label>
                  <input
                    id="reg-roll"
                    name="rollNumber"
                    type="text"
                    placeholder="e.g. 23MCA001"
                    className="cc-input"
                    value={form.rollNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="cc-form-group">
                  <label className="cc-label">Email Address</label>
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="cc-input"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="cc-form-group">
                  <label className="cc-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="reg-password"
                      name="password"
                      type={showPwd ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      className="cc-input"
                      style={{ paddingRight: 48 }}
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--cc-text-muted)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <div className="cc-form-group">
                  <label className="cc-label">I am joining as</label>
                  <select
                    id="reg-role"
                    name="role"
                    className="cc-select"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="student">Student</option>
                    <option value="tic">TIC (Teacher In Charge)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="cc-btn cc-btn-primary"
                  style={{ width: "100%", marginTop: 8 }}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </>
            )}

            {/* Step 1 — Coding Profiles */}
            {step === 1 && (
              <>
                <div className="cc-form-group">
                  <label className="cc-label">
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#ffa116",
                        marginRight: 6,
                      }}
                    />
                    LeetCode Username
                  </label>
                  <input
                    id="reg-leetcode"
                    name="leetcode"
                    type="text"
                    placeholder="your_leetcode_username"
                    className="cc-input"
                    value={form.leetcode}
                    onChange={handleChange}
                  />
                </div>

                <div className="cc-form-group">
                  <label className="cc-label">
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#2f8d46",
                        marginRight: 6,
                      }}
                    />
                    GFG Username (optional)
                  </label>
                  <input
                    id="reg-gfg"
                    name="gfg"
                    type="text"
                    placeholder="your_gfg_username"
                    className="cc-input"
                    value={form.gfg}
                    onChange={handleChange}
                  />
                </div>

                <div className="cc-form-group">
                  <label className="cc-label">
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#1f8dd6",
                        marginRight: 6,
                      }}
                    />
                    Codeforces Handle (optional)
                  </label>
                  <input
                    id="reg-codeforces"
                    name="codeforces"
                    type="text"
                    placeholder="your_cf_handle"
                    className="cc-input"
                    value={form.codeforces}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="cc-btn cc-btn-secondary"
                    style={{ flex: "0 0 auto" }}
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="cc-btn cc-btn-primary"
                    style={{ flex: 1 }}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}

            {/* Step 2 — Class Code */}
            {step === 2 && (
              <>
                <div className="cc-form-group">
                  <label className="cc-label">Class Join Code</label>
                  <input
                    id="reg-classcode"
                    name="classCode"
                    type="text"
                    placeholder="e.g. RJJN6N"
                    className="cc-input"
                    style={{ textTransform: "uppercase", letterSpacing: "3px", fontSize: 18, fontWeight: 700 }}
                    value={form.classCode}
                    onChange={(e) =>
                      setForm({ ...form, classCode: e.target.value.toUpperCase() })
                    }
                  />
                  <p style={{ fontSize: 12, color: "var(--cc-text-muted)" }}>
                    Ask your TIC for the class code. You can skip and join later.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="cc-btn cc-btn-secondary"
                    style={{ flex: "0 0 auto" }}
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    id="reg-submit"
                    type="submit"
                    disabled={loading}
                    className="cc-btn cc-btn-primary"
                    style={{ flex: 1 }}
                  >
                    {loading ? (
                      <span className="cc-spinner" />
                    ) : (
                      <>
                        Create Account <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="cc-divider" style={{ margin: "28px 0" }} />
          <p style={{ textAlign: "center", fontSize: 14, color: "var(--cc-text-muted)" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "var(--cc-primary)", fontWeight: 600, textDecoration: "none" }}
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;