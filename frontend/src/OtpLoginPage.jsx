import React, { useState } from 'react';

const OtpLoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setStep(2);
      } else {
        setMessage(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setMessage('Server error while sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        // Redirect or show success
      } else {
        setMessage(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setMessage('Server error while verifying OTP');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>OTP Login</h2>

      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button onClick={sendOtp} style={styles.button}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={verifyOtp} style={styles.button}>Verify OTP</button>
        </>
      )}

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #aaa',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '15px',
    color: '#333',
  },
};

export default OtpLoginPage;