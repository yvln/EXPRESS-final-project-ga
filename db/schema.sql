DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS knowledge;
DROP TABLE IF EXISTS flags;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname VARCHAR,
  lname VARCHAR,
  email VARCHAR,
  username VARCHAR,
  password_digest VARCHAR,
  token VARCHAR,
  date_registr VARCHAR,
  max_score_game_1 INTEGER,
  max_score_game_2 INTEGER,
  max_score_game_3 INTEGER,
  max_score_game_4 INTEGER,
  max_score_game_5 INTEGER,
  max_score_game_6 INTEGER,
  last_try VARCHAR,
  number_try_game INTEGER,
  level INTEGER,
  picture VARCHAR
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  rules VARCHAR,
  hint VARCHAR,
  points_to_reach_level_1 INTEGER,
  points_to_reach_level_2 INTEGER,
  points_to_reach_level_3 INTEGER,
  nb_try_max_level_1 INTEGER,
  nb_try_max_level_2 INTEGER,
  nb_try_max_level_3 INTEGER
);

CREATE TABLE knowledge (
  id SERIAL PRIMARY KEY,
  level INTEGER,
  question VARCHAR,
  response VARCHAR,
  possible_res_1 VARCHAR,
  possible_res_2 VARCHAR,
  possible_res_3 VARCHAR
);

CREATE TABLE flags (
  id SERIAL PRIMARY KEY,
  level INTEGER,
  question VARCHAR,
  response VARCHAR,
  possible_res_1 VARCHAR,
  possible_res_2 VARCHAR,
  possible_res_3 VARCHAR
);
