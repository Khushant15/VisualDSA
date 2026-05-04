import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, AlertCircle, CheckCircle, KeyRound } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useTheme } from "../ThemeContext";
import "./ForgotPassword.css";

const friendlyError = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many requests. Please wait a moment before trying again.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const ForgotPassword = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox (and spam folder).");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`forgot-password-container ${isDark ? "dark" : ""}`}>
      <Link to="/login" className="back-link" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "1.5rem", color: "inherit", textDecoration: "none", opacity: 0.7 }}>
        <ArrowLeft size={16} /> Back to Login
      </Link>

      <div className="main-container">
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", marginBottom: "1rem" }}>
            <KeyRound size={24} color="white" />
          </div>
          <h2><b>Forgot Password</b></h2>
          <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Enter your email and we'll send a reset link</p>
        </div>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <label className="label" htmlFor="fp-email">Email address</label>
          <div className="input-container" style={{ position: "relative" }}>
            <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <input
              type="email"
              id="fp-email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: "36px" }}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="success-message" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={16} /> {message}
          </p>
        )}
        {error && (
          <p className="error-message" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertCircle size={16} /> {error}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", opacity: 0.6 }}>
          Remembered it?{" "}
          <Link to="/login" style={{ color: "#6366f1", fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
