import { useState } from 'react';
import MapPicker, { mapRef, resetToCurrentLocation } from './MapPicker.jsx';
import { saveAddress } from './address.js';
import { useNavigate } from 'react-router-dom';
import "./address.css";
import { useAuth } from '../context/AuthContext.jsx';


const AddressForm = () => {
  const navigate = useNavigate();
  
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: false,
    latitude: null,
    longitude: null,
  });

  const { isAuthenticated } = useAuth();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = async (coords) => {
    setAddress((prev) => ({ ...prev, latitude: coords.lat, longitude: coords.lng }));
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
      );
      const data = await res.json();
      const addr = data.address || {};
      setAddress((prev) => ({
        ...prev,
        street: data.display_name || '',
        city: addr.city || addr.town || addr.village || '',
        state: addr.state || '',
        pincode: addr.postcode || '',
      }));
    } catch (err) {
      console.error('Reverse geocoding failed:', err);
    }
  };

  const centerMapToPincode = async (pincode) => {
    if (/^\d{6}$/.test(pincode)) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await res.json();
        const postOffice = data[0]?.PostOffice?.[0];
        if (postOffice) {
          const city = postOffice.District;
          const state = postOffice.State;

          setAddress((prev) => ({
            ...prev,
            city,
            state,
            pincode,
          }));

          const query = `${city}, ${state}, India`;
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
          const geoData = await geoRes.json();
          if (geoData[0]) {
            const { lat, lon } = geoData[0];
            setAddress((prev) => ({
              ...prev,
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
            }));
            if (mapRef.current) {
              mapRef.current.setView([lat, lon], 14);
            }
          }
        }
      } catch (err) {
        console.error('Failed to center map from pincode:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!address.fullName || !address.email || !address.phone || !address.street || !address.city || !address.state || !address.pincode) {
      alert('Please fill all required fields');
      return;
    }
    // require authentication
    if (!isAuthenticated) {
      alert('Please log in to save an address');
      navigate('/login');
      return;
    }

    // Build payload; include coordinates only if available
    const payload = {
      fullName: address.fullName,
      email: address.email,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      isDefault: address.isDefault,
    };
    if (address.latitude != null && address.longitude != null) {
      payload.latitude = address.latitude;
      payload.longitude = address.longitude;
    }

    try {
      await saveAddress(payload);
      alert('Address saved successfully!');
      navigate('/savedaddress');
    } catch (error) {
      console.error('Error saving address:', error.message || error);
      alert('Failed to save address: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{width:"100%" , display:"flex",margin:"60px"}}>
      <div className='form' >
      <input className='in' name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} required />
      <br />
      <input className='in' name="email" placeholder="Email" value={address.email} onChange={handleChange} required />
      <br />
      <input className='in' name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} required />
      <input className='in' name="street" placeholder="Street Address" value={address.street} onChange={handleChange} required />
      <br />
      <input className='in'
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={(e) => {
          handleChange(e);
          centerMapToPincode(e.target.value);
        }}
        required/>
      <input className='in' name="city" placeholder="City" value={address.city} onChange={handleChange} required />
      <br />
      <input className='in' name="state" placeholder="State" value={address.state} onChange={handleChange} required />
      <input className='in' name="country" placeholder="Country" value={address.country} onChange={handleChange} />
      <br />
      <label style={{marginRight: "10px"}}>
        <input type="checkbox" name="isDefault" checked={address.isDefault} onChange={(e) => setAddress({...address, isDefault: e.target.checked})} />
        Set as default address
      </label>
      <br />
      <div style={{display:"flex",justifyContent: "space-between", paddingRight: "32px",}}>
      <button className='crr' type="button" onClick={resetToCurrentLocation}>📍 Reset to Current Location</button>
      <button className='crr' type="submit">Save Address</button>
      </div>
      </div>
      <MapPicker onLocationSelect={handleLocationSelect} />
    </form>
  );
};

export default AddressForm;