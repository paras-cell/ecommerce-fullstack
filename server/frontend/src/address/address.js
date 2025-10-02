export const saveAddress = async (address) => {
  const res = await fetch('http://localhost:5000/api/address/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address),
  });
  return res.json();
};