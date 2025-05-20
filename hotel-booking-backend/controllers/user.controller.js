// controllers/user.controller.js
const User = require('../models/UserModel');

// Get all users
const getAllUsers = async (req, res) => {
try {
const users = await User.find().select('-password');
res.status(200).json(users);
} catch (error) {
res.status(500).json({ message: 'Failed to retrieve users' });
}
};

// Delete a user
const deleteUser = async (req, res) => {
try {
const deleted = await User.findByIdAndDelete(req.params.id);
if (!deleted) return res.status(404).json({ message: 'User not found' });
res.status(200).json({ message: 'User deleted successfully' });
} catch (error) {
res.status(500).json({ message: 'Failed to delete user' });
}
};

module.exports = {
getAllUsers,
deleteUser,
};