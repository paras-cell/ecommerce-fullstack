export const saveAddress = async (address) => {
  
    const baseURL =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_API_BASE_URL
    : "https://ecommerce-fullstack-q30o.onrender.com";

  const res = await fetch(`${baseURL}/api/address/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address),
  });
  return res.json();
};