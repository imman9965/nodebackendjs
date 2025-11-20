const express = require('express');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  // create user via service directly
  const UserService = require('../services/user.service');
  try {
    const u = await UserService.createUser(req.body);
    res.status(201).json(u);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
