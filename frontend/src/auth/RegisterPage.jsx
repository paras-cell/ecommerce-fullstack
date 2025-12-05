import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/authAPI";
import { useAuth } from "../context/AuthContext";
import "./register.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Step 1: Email & OTP
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Step 2: User Details
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(calculatePasswordStrength(pwd));
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authAPI.sendRegistrationOtp(email);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("OTP sent to your email");
        setOtpSent(true);
      }
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and move to details
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (otp.length !== 6) {
        setError("OTP must be 6 digits");
        setLoading(false);
        return;
      }

      // Just verify format for now, full verification happens on final submit
      setStep(2);
      setSuccess("OTP verified. Please enter your details.");
    } catch (err) {
      setError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete Registration
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation
      if (!username || !fullName || !password) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (passwordStrength < 2) {
        setError("Password is too weak");
        setLoading(false);
        return;
      }

      const result = await authAPI.verifyRegistrationOtp(
        email,
        otp,
        username,
        fullName,
        password
      );

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Registration successful!");
        login(result.user, result.accessToken, result.refreshToken);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep(1);
    setOtp("");
    setOtpSent(false);
  };

  const getPasswordStrengthText = () => {
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    return texts[passwordStrength] || "Very Weak";
  };

  const getPasswordStrengthColor = () => {
    const colors = ["#e74c3c", "#e67e22", "#f39c12", "#f1c40f", "#27ae60", "#16a085"];
    return colors[passwordStrength] || "#e74c3c";
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Create Account</h1>

        {/* Step 1: Email & OTP */}
        {step === 1 && (
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={otpSent}
                required
              />
            </div>

            {otpSent && (
              <div className="form-group">
                <label>OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  required
                />
                <small>Enter the OTP sent to {email}</small>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Loading..." : otpSent ? "Verify OTP" : "Send OTP"}
            </button>

            {otpSent && (
              <button
                type="button"
                onClick={goBack}
                className="btn-secondary"
              >
                Change Email
              </button>
            )}
          </form>
        )}

        {/* Step 2: User Details */}
        {step === 2 && (
          <form onSubmit={handleCompleteRegistration}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password (min 8 chars)"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="password-strength">
                <div
                  className="strength-bar"
                  style={{
                    width: `${(passwordStrength / 5) * 100}%`,
                    backgroundColor: getPasswordStrengthColor(),
                  }}
                ></div>
              </div>
              <small>
                Strength: <span style={{ color: getPasswordStrengthColor() }}>
                  {getPasswordStrengthText()}
                </span>
              </small>
              <small className="password-hint">
                • At least 8 characters
                <br />
                • Uppercase & lowercase letters
                <br />
                • Numbers
              </small>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Creating Account..." : "Complete Registration"}
            </button>

            <button
              type="button"
              onClick={goBack}
              className="btn-secondary"
            >
              Back
            </button>
          </form>
        )}

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
