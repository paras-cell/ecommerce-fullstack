const API_URL = "http://localhost:5000/api/auth";

export const authAPI = {
  // Registration
  sendRegistrationOtp: async (email) => {
    const response = await fetch(`${API_URL}/register/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  verifyRegistrationOtp: async (email, otp, username, fullName, password) => {
    const response = await fetch(`${API_URL}/register/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, username, fullName, password }),
    });
    return response.json();
  },

  // Login
  login: async (emailOrUsername, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrUsername, password }),
    });
    return response.json();
  },

  // Token
  refreshAccessToken: async (refreshToken) => {
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    return response.json();
  },

  // User
  getCurrentUser: async (token) => {
    const response = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  updateProfile: async (token, data) => {
    const response = await fetch(`${API_URL}/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  changePassword: async (token, oldPassword, newPassword) => {
    const response = await fetch(`${API_URL}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return response.json();
  },
};
