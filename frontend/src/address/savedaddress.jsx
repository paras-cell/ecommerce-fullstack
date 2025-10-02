import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/processbar';
import { useAddress } from './AddressContext';
import './address.css';

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setSelectedAddress } = useAddress();

    const baseURL =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_API_BASE_URL
    : "https://ecommerce-fullstack-q30o.onrender.com";

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${baseURL}/api/address/all`);
        const data = await res.json();
        console.log("Fetched addresses:", data);

        if (Array.isArray(data)) {
          setAddresses(data);
        } else {
          console.error("Unexpected response format:", data);
          setAddresses([]);
        }
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
        setAddresses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${baseURL}/api/address/delete/${id}`, {
        method: 'DELETE',
      });
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    const selected = addresses.find((addr) => addr._id === id);
    setSelectedAddress(selected);
  };

  return (
    <div style={{
      minHeight: "585px",
      background: 'linear-gradient(to right bottom, #F06292, #EF9A9A)',
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <ProgressBar />
      <h2>Saved Addresses</h2>

      <div style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        width: "60%",
        padding: "10px"
      }}>
        {loading ? (
          <p>Loading addresses...</p>
        ) : Array.isArray(addresses) && addresses.length > 0 ? (
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
                className='select'
                  onClick={() => handleSelect(addr._id)}
                  style={{
                    marginTop: '10px',
                    border: "1px solid",
                    cursor: "pointer",
                    width:"77px",
                  }}
                >
                  {selectedId === addr._id ? 'Selected' : 'Select'}
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
                  style={{
                    marginLeft: '10px',
                    color: 'red',
                    background: "#EEEEEE",
                    border: "1px solid",
                    cursor: "pointer",
                    width:"77px"
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No addresses found.</p>
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
        <button
          className='chosen'
          style={{ padding: "10px", cursor: "pointer", borderRadius: "50px" }}
          onClick={() => {
            if (!selectedId) {
              alert("⚠️ Please select a delivery address before proceeding.");
              return;
            }
            navigate('/payment');
          }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default SavedAddresses;