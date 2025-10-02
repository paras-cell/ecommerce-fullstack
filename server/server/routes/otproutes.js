import express from 'express';
import { sendOtp, verifyOtp } from '../controllers/otpController.js';
import  {Address}  from '../models/otpModel.js'; // ✅ named import

const router = express.Router();

router.post('/send', sendOtp);
router.post('/verify', verifyOtp);

router.get('/all', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    await newAddress.save();
    res.status(201).json(newAddress); // ✅ return saved address
  } catch (err) {
    res.status(500).json({ error: 'Failed to save address' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

export default router;