import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress } from "./AddressContext";
import "./address.css";

const showAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

    const baseURL =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_API_BASE_URL
    : "https://ecommerce-fullstack-q30o.onrender.com";

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${baseURL}/api/address/all`);
        const data = await res.json();
        setAddresses(data);
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
      }
    };
    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/address/delete/${id}`, {
        method: 'DELETE',
      });
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  return (
    <div style={{
      minHeight: "585px",
      background: 'linear-gradient(to right bottom, #F06292, #EF9A9A)',
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{marginTop:"10px"}}>Saved Addresses</h1>
      <div style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        width: "60%",
        padding: "10px"
      }}>
        {addresses.length === 0 ? (
          <div>
            <p>No addresses found.</p>
          </div>
        ) : (
          <ul style={{ listStyle: "none" }}>
            {addresses.map((addr) => (
              <li key={addr._id} style={{
                marginBottom: '1rem',
                border: selectedId === addr._id ? '2px solid blue' : '1px solid #ccc',
                padding: '10px'
              }}>
                <strong>{addr.name}</strong> — 📧 {addr.email} | 📞 {addr.phone}
                <br />
                {addr.building}, {addr.street}, {addr.city}, {addr.state}, {addr.pincode}
                <br />
                <button
                  onClick={() => handleDelete(addr._id)}
                  style={{
                    marginLeft: '10px',
                    color: 'red',
                    position: "relative",
                    left: "45%",
                    width: "77px",
                    background: "#EEEEEE",
                    border: "1px solid",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{
        margin: '12px',
        display: "flex",
        justifyContent: "space-between",
        width: "61%"
      }}>
        <button
          className='new-add'
          style={{ padding: "10px", cursor: "pointer", borderRadius: "50px" }}
          onClick={() => navigate('/addresss')}
        >
          ➕ Add New Address
        </button>
      </div>
    </div>
  );
};

export default showAddresses;