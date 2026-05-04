import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { useTheme } from "../ThemeContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import "../styles/AuthModal.css";

// Firebase error → friendly message
const friendlyError = (code) => {
  switch (code) {
    case "auth/user-not-found":       return "No account found with this email.";
    case "auth/wrong-password":
    case "auth/invalid-credential":   return "Incorrect password. Please try again.";
    case "auth/invalid-email":        return "Please enter a valid email address.";
    case "auth/email-already-in-use": return "An account with this email already exists.";
    case "auth/weak-password":        return "Password must be at least 6 characters.";
    case "auth/too-many-requests":    return "Too many attempts. Please wait and try again.";
    default:                          return "Something went wrong. Please try again.";
  }
};

const AuthModal = ({ onClose, initialMode = "login" }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setIsLogin(initialMode === "login");
    setError("");
    setSuccess("");
  }, [initialMode]);

  // Login form state
  const [loginData, setLoginData] = useState({ email: "", password: "", rememberMe: false });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // ── Login ──────────────────────────────────────────────
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      setSuccess("Signed in! Redirecting...");
      setTimeout(() => { onClose(); navigate("/"); }, 700);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  // ── Signup ─────────────────────────────────────────────
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (signupData.password !== signupData.confirmPassword) {
      return setError("Passwords don't match.");
    }
    if (!signupData.agreeToTerms) {
      return setError("Please agree to the Terms and Privacy Policy.");
    }

    setIsLoading(true);
    try {
      const displayName = `${signupData.firstName} ${signupData.lastName}`.trim();
      const credential = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
      await updateProfile(credential.user, { displayName });
      setSuccess("Account created! Redirecting...");
      setTimeout(() => { onClose(); navigate("/"); }, 700);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`auth-modal-overlay ${isDark ? "dark" : "light"}`}>
      <div className="auth-modal">
        {/* Close */}
        <button className="close-button" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="auth-modal-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Sign in to continue your learning journey"
              : "Join VisualDSA and start mastering algorithms"}
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={`tab ${isLogin ? "active" : ""}`} onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}>
            Login
          </button>
          <button className={`tab ${!isLogin ? "active" : ""}`} onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}>
            Sign Up
          </button>
        </div>

        {/* ── Login Form ── */}
        {isLogin ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="am-email">Email</label>
              <div className="input-container">
                <Mail className="input-icon" size={18} />
                <input id="am-email" name="email" type="email" required value={loginData.email} onChange={handleLoginChange} placeholder="you@example.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="am-password">Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input id="am-password" name="password" type={showPassword ? "text" : "password"} required value={loginData.password} onChange={handleLoginChange} placeholder="Enter your password" />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input id="rememberMe" name="rememberMe" type="checkbox" checked={loginData.rememberMe} onChange={handleLoginChange} />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            </div>

            {error   && <div className="error-message"><AlertCircle size={16} /><span>{error}</span></div>}
            {success && <div className="error-message" style={{ background: "rgba(16,185,129,0.1)", borderColor: "#10b981", color: "#10b981" }}><CheckCircle size={16} /><span>{success}</span></div>}

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

        ) : (
          /* ── Signup Form ── */
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="am-firstName">First Name</label>
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input id="am-firstName" name="firstName" type="text" required value={signupData.firstName} onChange={handleSignupChange} placeholder="First name" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="am-lastName">Last Name</label>
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input id="am-lastName" name="lastName" type="text" required value={signupData.lastName} onChange={handleSignupChange} placeholder="Last name" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="am-signupEmail">Email</label>
              <div className="input-container">
                <Mail className="input-icon" size={18} />
                <input id="am-signupEmail" name="email" type="email" required value={signupData.email} onChange={handleSignupChange} placeholder="you@example.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="am-signupPassword">Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input id="am-signupPassword" name="password" type={showPassword ? "text" : "password"} required value={signupData.password} onChange={handleSignupChange} placeholder="Create a password" />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="am-confirmPassword">Confirm Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input id="am-confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} required value={signupData.confirmPassword} onChange={handleSignupChange} placeholder="Confirm your password" />
              </div>
            </div>

            <div className="form-options">
              <div className="agree-terms">
                <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={signupData.agreeToTerms} onChange={handleSignupChange} />
                <label htmlFor="agreeToTerms">I agree to the Terms and Privacy Policy</label>
              </div>
            </div>

            {error   && <div className="error-message"><AlertCircle size={16} /><span>{error}</span></div>}
            {success && <div className="error-message" style={{ background: "rgba(16,185,129,0.1)", borderColor: "#10b981", color: "#10b981" }}><CheckCircle size={16} /><span>{success}</span></div>}

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;