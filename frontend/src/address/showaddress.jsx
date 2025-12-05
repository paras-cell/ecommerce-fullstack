import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAddresses, deleteAddress, updateAddress } from './address.js';
import './address.css';

const ShowAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAddresses();
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch addresses:', err.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this address?')) return;
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error('Failed to delete address:', err.message || err);
      alert('Failed to delete address: ' + (err.message || 'Unknown error'));
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await updateAddress(id, { isDefault: true });
      // refresh list
      await load();
    } catch (err) {
      console.error('Failed to set default:', err.message || err);
      alert('Failed to set default address: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="show-address-root">
      <h1>Saved Addresses</h1>

      <div className="addresses-container">
        {loading ? (
          <p>Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <div>
            <p>No addresses found.</p>
          </div>
        ) : (
          <ul className="address-list">
            {addresses.map((addr) => (
              <li key={addr._id} className={`address-item ${addr.isDefault ? 'default' : ''}`}>
                <div className="address-main">
                  <strong>{addr.fullName}</strong>
                  <div className="address-meta">📧 {addr.email || '—'} | 📞 {addr.phone}</div>
                  <div className="address-line">{addr.street}{addr.city ? ', ' + addr.city : ''}{addr.state ? ', ' + addr.state : ''}{addr.pincode ? ', ' + addr.pincode : ''}</div>
                </div>
                <div className="address-actions">
                  {!addr.isDefault && (
                    <button className="small" onClick={() => handleSetDefault(addr._id)}>Set Default</button>
                  )}
                  <button className="small" onClick={() => navigate('/addresss', { state: { editId: addr._id } })}>Edit</button>
                  <button className="small danger" onClick={() => handleDelete(addr._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="addresses-footer">
        <button className='new-add' onClick={() => navigate('/addresss')}>➕ Add New Address</button>
      </div>
    </div>
  );
};

export default ShowAddresses;