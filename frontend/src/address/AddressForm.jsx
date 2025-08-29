import { useState } from 'react';
import MapPicker, { mapRef, resetToCurrentLocation } from './MapPicker.jsx';
import { saveAddress } from './address.js';
import { useNavigate } from 'react-router-dom';
import "./address.css";


const AddressForm = () => {
  const navigate = useNavigate();
  
  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    building: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    street: '',
    location: { lat: null, lng: null },
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = async (coords) => {
    setAddress((prev) => ({ ...prev, location: coords }));
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
            location: { lat: parseFloat(lat), lng: parseFloat(lon) },
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
    await saveAddress(address);
    alert('Address saved!');
    navigate('/savedaddress');

  };

  return (
    <form onSubmit={handleSubmit} style={{width:"100%" , display:"flex",margin:"60px"}}>
      <div className='form' >
      <input className='in' name="name" placeholder="Full Name" onChange={handleChange} required />
      <br />
      <input className='in' name="email" placeholder="Email" onChange={handleChange} required />
      <br />
      <input className='in' name="phone" placeholder="Phone Number" onChange={handleChange} required />
      <input className='in' name="building" placeholder="Building / Flat No." onChange={handleChange} required />
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
      <input className='in' name="street" placeholder="Street Address" value={address.street} onChange={handleChange} />
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