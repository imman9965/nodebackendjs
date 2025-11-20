const bcrypt = require('bcryptjs');
const UserRepo = require('../repositories/user.repository');

class UserService {
  async createUser({ name, email, password }) {
    if (!name || !email || !password) throw new Error('name, email and password are required');
    const hashed = await bcrypt.hash(password, 10);
    await UserRepo.addUser(name, email, hashed);
    return { name, email };
  }

  async getAllUsers() {
    return await UserRepo.getAll();
  }

  async getUserById(id) {
    return await UserRepo.getById(id);
  }

  async updateUser(id, { name, email }) {
    await UserRepo.update(id, name, email);
    return true;
  }

  async deleteUser(id) {
    await UserRepo.delete(id);
    return true;
  }
}

module.exports = new UserService();
