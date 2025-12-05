import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { authAPI } from '../services/authAPI.js';
import './profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, token, updateUser, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ fullName: '', username: '', phone: '', profileImage: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        username: user.username || '',
        phone: user.phone || '',
        profileImage: user.profileImage || '',
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(token, form);
      if (res && res.user) {
        updateUser(res.user);
        alert('Profile updated successfully');
        navigate('/');
      } else {
        alert(res?.message || 'Unable to update profile');
      }
    } catch (err) {
      console.error('Profile update error', err);
      alert('An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form" style={{ maxWidth: 700, margin: '40px auto' }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>
          Full Name
          <input name="fullName" value={form.fullName} onChange={handleChange} className="in" required />
        </label>

        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} className="in" required />
        </label>

        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} className="in" />
        </label>

        <label>
          Profile Image URL
          <input name="profileImage" value={form.profileImage} onChange={handleChange} className="in" />
        </label>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="crr" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" className="crr" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
