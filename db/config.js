const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL || 'postgres://yvelinesay@localhost:5432/beeu_db');

module.exports = db;
