const db = require('../db/config');
const bcrypt = require('bcryptjs');
const User = {};

// Authentication

User.generateToken = (callback, ...params) => {
  const token = bcrypt.hashSync(Math.random().toString(), 10);
  return db.oneOrNone('SELECT id FROM users WHERE token = $1', [token])
    .then((res) => { 
      if(res){ 
        return generateToken();
      }
      return callback(...params, token);
    })
};
	
User.updateToken = (id, token) => {
  return db.one(`UPDATE users SET token = $1
    WHERE id = $2 RETURNING *`, [token, id]);
};

User.create = (fname, lname, email, username, date_registr, 
  max_score_game_1,
  max_score_game_2,
  max_score_game_3,
  max_score_game_4,
  max_score_game_5,
  max_score_game_6,
  password, level, number_try_game, picture, token) => {
  const password_digest = bcrypt.hashSync(password, 10);
  return db.one(`INSERT INTO users
    (fname, lname, email, username, date_registr, 
      max_score_game_1,
      max_score_game_2,
      max_score_game_3,
      max_score_game_4,
      max_score_game_5,
      max_score_game_6,
      password_digest, level, number_try_game, picture, token)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *`,
    [fname, lname, email, username, date_registr, 
      max_score_game_1,
      max_score_game_2,
      max_score_game_3,
      max_score_game_4,
      max_score_game_5,
      max_score_game_6,
      password_digest, level, number_try_game, picture, token]);
};

User.findByEmail = (email) => {
	return db.oneOrNone('SELECT * FROM users WHERE email = $1', [email])
};

User.findByToken = (token) => {
	return db.one('SELECT * FROM users WHERE token = $1', [token])
};

User.findById = (req, res, next) => {
  const { user_id } = req.params 
  db.one('SELECT * FROM users WHERE id = $1', [user_id])
  .then ( data => {
    res.locals.data = data;
    next();
  })
}

module.exports = User;
