const User = require('../models/User');

// Update Role Controller
exports.updateRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
  
    if (!['buyer', 'seller', 'farmer', 'landowner'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role selected.' });
    }
  
    try {
      const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
      console.error('Role update error:', error);
      res.status(500).json({ message: 'Server error during role update.' });
    }
  };