const AuthService = require('../services/auth.service');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    const token = generateToken(user.email);
    res.status(201).json({ message: 'Registered', user, token });
  } catch (err) {
    console.error('REGISTER ERROR', err);
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await AuthService.login(req.body);
    // if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    // res.json({ user, token });
    res.json({token });

  } catch (err) {
    console.error('LOGIN ERROR', err);
    res.status(400).json({ error: err.message });
  }
};
