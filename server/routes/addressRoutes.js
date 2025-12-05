import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getAllAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getDefaultAddress,
  getAddress,
} from '../controllers/addressController.js';

const router = express.Router();

// All address routes require authentication
router.use(verifyToken);

// Get all addresses for user
router.get('/all', getAllAddresses);

// Get default address
router.get('/default', getDefaultAddress);

// Get single address
router.get('/:id', getAddress);

// Add new address
router.post('/add', addAddress);

// Update address
router.put('/:id', updateAddress);

// Delete address
router.delete('/delete/:id', deleteAddress);

export default router;
