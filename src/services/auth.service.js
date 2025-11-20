const bcrypt = require('bcryptjs');
const UserRepo = require('../repositories/user.repository');

class AuthService {
  async register({ name, email, password }) {
    if (!name || !email || !password) throw new Error('name, email and password are required');

    const existing = await UserRepo.loginUser(email);
    if (existing) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(password, 10);
    await UserRepo.registerUser(name, email, hashed);
    return { name, email };
  }

  async login({ email, password }) {
    if (!email || !password) throw new Error('email and password are required');

    const user = await UserRepo.loginUser(email);
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;

    return { id: user.id, name: user.name, email: user.email };
  }
}

module.exports = new AuthService();
