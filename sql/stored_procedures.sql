-- Run this file on your target database.
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION sp_register_user(p_name VARCHAR,p_email VARCHAR,p_password VARCHAR)
RETURNS VOID AS $$
BEGIN
  INSERT INTO users(name,email,password) VALUES(p_name,p_email,p_password);
END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_login_user(p_email VARCHAR)
RETURNS TABLE(id INT,name VARCHAR,email VARCHAR,password VARCHAR)
AS $$ BEGIN
  RETURN QUERY SELECT id,name,email,password FROM users WHERE email=p_email LIMIT 1;
END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_add_user(p_name VARCHAR,p_email VARCHAR,p_password VARCHAR)
RETURNS VOID AS $$ BEGIN
  INSERT INTO users(name,email,password) VALUES(p_name,p_email,p_password);
END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_get_users()
RETURNS TABLE(id INT,name VARCHAR,email VARCHAR)
AS $$ BEGIN
  RETURN QUERY SELECT id,name,email FROM users ORDER BY id;
END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_get_user(p_id INT)
RETURNS TABLE(id INT,name VARCHAR,email VARCHAR)
AS $$ BEGIN
  RETURN QUERY SELECT id,name,email FROM users WHERE id=p_id;
END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_update_user(p_id INT,p_name VARCHAR,p_email VARCHAR)
RETURNS VOID AS $$ BEGIN
  UPDATE users SET name=p_name,email=p_email WHERE id=p_id;
END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sp_delete_user(p_id INT)
RETURNS VOID AS $$ BEGIN
  DELETE FROM users WHERE id=p_id;
END; $$ LANGUAGE plpgsql;
