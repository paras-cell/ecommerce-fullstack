import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './otplogin.css';

const OtpLoginPage = () => {
  const [email, setEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(new Array(6).fill(''));
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // ⏳ Countdown effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOtp = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message); // "OTP sent" or "OTP sent again"
        setStep(2);
        setCountdown(60); // ⏳ Restart timer
        setOtpDigits(new Array(6).fill('')); // Clear previous input
      } else {
        setMessage(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setMessage('Server error while sending OTP');
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const verifyOtp = async () => {
    const otp = otpDigits.join('');
    if (otp.length < 6) {
      setMessage('Please enter all 6 digits');
      return;
    }

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
        localStorage.setItem('userEmail', email);
        navigate('/');
      } else {
        setMessage(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setMessage('Server error while verifying OTP');
    }
  };

  return (
    <div className='outer-container'>
      <div className='container-login'>
        <h2 className='title'>Login</h2>

        {step === 1 ? (
          <>
          <input className='input' type="text" placeholder="Enter your Username (Optional)"/>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input'
            />
            <button onClick={sendOtp} className='button-login'>Send OTP</button>
          </>
        ) : (
          <>
            <div className="otp-input-group">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="otp-box"
                />
              ))}
            </div>
            <button onClick={verifyOtp} className='button-login'>Verify OTP</button>

            {countdown > 0 ? (
              <p className="resend-disabled">Resend available in {countdown}s</p>
            ) : (
              <button onClick={sendOtp} className="resend-link">Send OTP again</button>
            )}
          </>
        )}

        {message && <p className='message'>{message}</p>}
      </div>
    </div>
  );
};

export default OtpLoginPage;