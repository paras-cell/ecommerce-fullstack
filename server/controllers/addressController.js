import Address from '../models/addressModel.js';

// Get all addresses for a user
export const getAllAddresses = async (req, res) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
};

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { fullName, phone, email, street, city, state, pincode, country, isDefault, latitude, longitude, notes } = req.body;

    // Validate required fields
    if (!fullName || !phone || !street || !city || !state || !pincode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const address = new Address({
      userId,
      fullName,
      phone,
      email,
      street,
      city,
      state,
      pincode,
      country: country || 'India',
      isDefault: isDefault || false,
      latitude,
      longitude,
      notes,
    });

    await address.save();
    res.status(201).json(address);
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Failed to add address' });
  }
};

// Update an address
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { isDefault, ...updateData } = req.body;

    // Verify ownership
    const address = await Address.findOne({ _id: id, userId });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await Address.updateMany({ userId, _id: { $ne: id } }, { isDefault: false });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { ...updateData, isDefault: isDefault !== undefined ? isDefault : address.isDefault },
      { new: true }
    );

    res.json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const address = await Address.findOne({ _id: id, userId });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await Address.findByIdAndDelete(id);

    // If deleted address was default, set another as default
    if (address.isDefault) {
      const nextAddress = await Address.findOne({ userId });
      if (nextAddress) {
        await Address.findByIdAndUpdate(nextAddress._id, { isDefault: true });
      }
    }

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
};

// Get default address
export const getDefaultAddress = async (req, res) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const defaultAddress = await Address.findOne({ userId, isDefault: true });
    
    if (!defaultAddress) {
      return res.status(404).json({ error: 'No default address found' });
    }

    res.json(defaultAddress);
  } catch (error) {
    console.error('Error fetching default address:', error);
    res.status(500).json({ error: 'Failed to fetch default address' });
  }
};

// Get single address
export const getAddress = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const address = await Address.findOne({ _id: id, userId });
    
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.json(address);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ error: 'Failed to fetch address' });
  }
};
