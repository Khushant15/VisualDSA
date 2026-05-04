import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Signup.css";

// Password strength rules
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("One number");
  return errors;
};

// Firebase error → friendly message
const friendlyError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    default:
      return "Signup failed. Please try again.";
  }
};

const Signup = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordErrors(validatePassword(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const pwdErrors = validatePassword(formData.password);
    if (pwdErrors.length > 0) {
      setError("Please fix password requirements before continuing.");
      return;
    }

    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // Store display name in Firebase profile
      await updateProfile(credential.user, { displayName: formData.name });
      setSuccess("Account created! Redirecting...");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`signup-container ${isDark ? "signup-dark" : "signup-light"}`}>
      <Link to="/" className="signup-back-button">
        <ArrowLeft className="back-icon" />
        Back to home
      </Link>

      <div className="signup-wrapper">
        <div className="signup-header">
          <div className="signup-icon-container">
            <UserPlus className="signup-icon" />
          </div>
          <h1 className="signup-title">Create an Account</h1>
          <p className="signup-subtitle">Join VisualDSA and start mastering algorithms</p>
        </div>

        <div className="signup-card">
          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-container">
                <div className="input-icon"><User className="icon" /></div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-container">
                <div className="input-icon"><Mail className="icon" /></div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <div className="input-icon"><Lock className="icon" /></div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>

              {/* Live password hint pills */}
              {formData.password.length > 0 && passwordErrors.length > 0 && (
                <ul className="password-errors">
                  {passwordErrors.map((err, idx) => (
                    <li key={idx} className="error-text">❌ {err}</li>
                  ))}
                </ul>
              )}
              {formData.password.length > 0 && passwordErrors.length === 0 && (
                <p style={{ color: "#10b981", fontSize: "0.78rem", marginTop: "4px" }}>✅ Strong password</p>
              )}
            </div>

            {/* Error / Success */}
            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="error-message" style={{ background: "rgba(16,185,129,0.1)", borderColor: "#10b981", color: "#10b981" }}>
                <CheckCircle size={16} />
                <span>{success}</span>
              </div>
            )}

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign up"}
            </button>

            <div className="login-link">
              <p className="login-text">
                Already have an account?{" "}
                <Link to="/login" className="login-action">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
