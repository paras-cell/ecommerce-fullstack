export const saveAddress = async (address) => {
  const baseURL =
    window.location.hostname === "localhost"
      ? import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
      : "https://ecommerce-fullstack-q30o.onrender.com";

  const token = localStorage.getItem("token");
  
  const res = await fetch(`${baseURL}/api/address/add`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(address),
  });
  
  if (!res.ok) {
    // try to parse json error message
    let errText = `HTTP error! status: ${res.status}`;
    try {
      const errBody = await res.json();
      if (errBody && errBody.message) errText = errBody.message;
      else if (errBody && errBody.error) errText = errBody.error;
    } catch (e) {
      // ignore parse error
    }
    throw new Error(errText);
  }
  
  return res.json();
};

export const getAddresses = async () => {
  const baseURL =
    window.location.hostname === "localhost"
      ? import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
      : "https://ecommerce-fullstack-q30o.onrender.com";

  const token = localStorage.getItem("token");
  
  const res = await fetch(`${baseURL}/api/address/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
};

export const deleteAddress = async (id) => {
  const baseURL =
    window.location.hostname === "localhost"
      ? import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
      : "https://ecommerce-fullstack-q30o.onrender.com";

  const token = localStorage.getItem("token");
  
  const res = await fetch(`${baseURL}/api/address/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
};

export const updateAddress = async (id, address) => {
  const baseURL =
    window.location.hostname === "localhost"
      ? import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
      : "https://ecommerce-fullstack-q30o.onrender.com";

  const token = localStorage.getItem("token");
  
  const res = await fetch(`${baseURL}/api/address/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(address),
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
};

export const getAddress = async (id) => {
  const baseURL =
    window.location.hostname === "localhost"
      ? import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
      : "https://ecommerce-fullstack-q30o.onrender.com";

  const token = localStorage.getItem("token");
  
  const res = await fetch(`${baseURL}/api/address/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
};

export const getDefaultAddress = async () => {
  const baseURL =
    window.location.hostname === "localhost"
      ? import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
      : "https://ecommerce-fullstack-q30o.onrender.com";

  const token = localStorage.getItem("token");
  
  const res = await fetch(`${baseURL}/api/address/default`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
};