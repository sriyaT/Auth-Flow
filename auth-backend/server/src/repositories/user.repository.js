const pool = require("../db/db");

const findByEmail = async (email) => {
  const existingEmail = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (existingEmail.rowCount == 0) {
    return null;
  } else if (existingEmail.rowCount == 1) {
    return existingEmail.rows[0];
  }
};

const createUser = async (username, email, password_hash) => {
  const result = await pool.query(
    `INSERT INTO users ( username, email, password_hash ) VALUES ( $1, $2, $3 ) 
     RETURNING id, username, email, created_at`,
    [username, email, password_hash]
  );
  return result.rows[0];
};
const findById = async (id) => {
  const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

  if (user.rowCount == 0) {
    return null;
  }
  return user.rows[0];
};

const saveRefreshToken = async (userId, refresh_token) => {
  await pool.query(`UPDATE users SET refresh_token= $1 where id = $2`, [
    refresh_token,
    userId,
  ]);
};

const resetPassword = async (reset_token, reset_token_expiry, userEmail) => {
  await pool.query(
    `UPDATE users SET reset_token= $1, reset_token_expiry =$2 where email= $3`,
    [reset_token, reset_token_expiry, userEmail]
  );
};

const findByResetToken = async (reset_token) => {
  const user = await pool.query(`SELECT * FROM users WHERE reset_token = $1`, [
    reset_token,
  ]);
  if (user.rowCount === 0) {
    return null;
  } else {
    return user.rows[0];
  }
};
const updatePassword = async (password_hash, id) => {
  await pool.query(
    `UPDATE users SET reset_token= $1, reset_token_expiry =$2, password_hash =$3 where id= $4`,
    [null, null, password_hash, id]
  );
};

module.exports = {
  findByEmail,
  createUser,
  findById,
  saveRefreshToken,
  resetPassword,
  findByResetToken,
  updatePassword,
};
