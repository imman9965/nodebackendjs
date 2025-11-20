const pool = require('../config/db');

class UserRepository {

  async registerUser(name, email, hashedPassword) {
    return pool.query(
      'SELECT sp_register_user($1, $2, $3)',
      [name, email, hashedPassword]
    );
  }

  async loginUser(email) {
    const { rows } = await pool.query(
      'SELECT * FROM sp_login_user($1)',
      [email]
    );

    if (!rows.length) return null;

    const row = rows[0];

    return {
      id: row.out_id,
      name: row.out_name,
      email: row.out_email,
      password: row.out_password
    };
  }

  async addUser(name, email, hashedPassword) {
    return pool.query(
      'SELECT sp_add_user($1, $2, $3)',
      [name, email, hashedPassword]
    );
  }

  async getAll() {
    const { rows } = await pool.query('SELECT * FROM sp_get_users()');
    return rows;
  }

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM sp_get_user($1)', [id]);
    return rows[0] || null;
  }

  async update(id, name, email) {
    return pool.query(
      'SELECT sp_update_user($1, $2, $3)',
      [id, name, email]
    );
  }

  async delete(id) {
    return pool.query(
      'SELECT sp_delete_user($1)',
      [id]
    );
  }
}

module.exports = new UserRepository();
