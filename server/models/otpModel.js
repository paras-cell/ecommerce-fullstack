import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  street: String,
  building: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  location: {
    lat: Number,
    lng: Number,
  },
}, { timestamps: true });

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
});

export const Address = mongoose.model('Address', addressSchema);
export const OTP = mongoose.model('OTP', otpSchema);

