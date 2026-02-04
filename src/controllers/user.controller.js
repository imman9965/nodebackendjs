const UserService = require('../services/user.service');

exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    // remove password field for safety
    const safe = users.map(u => {
      const { password, ...rest } = u;
      return rest;
    });
    res.json(safe);
  } catch (err) {
    console.error('GET USERS ERROR', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { password, ...rest } = user;
    res.json(rest);
  } catch (err) {
    console.error('GET USER ERROR', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await UserService.updateUser(req.params.id, req.body);
    res.json({ message: 'User updated' });
  } catch (err) {
    console.error('UPDATE USER ERROR', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('DELETE USER ERROR', err);
    res.status(500).json({ error: err.message });
  }
};
