DROP DATABASE IF EXISTS calorieCounter;

CREATE DATABASE calorieCounter;

\c calorieCounter;


CREATE TABLE users (
 id SERIAL,
 userName VARCHAR(30),
 password VARCHAR(30),
 height SMALLINT,
 weight SMALLINT,
 age SMALLINT,
 gender VARCHAR(10),
 fName VARCHAR(20),
 lName VARCHAR(20),
 maxCals SMALLINT
);

ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (id);

CREATE TABLE food (
 id BIGSERIAL,
 userId SMALLINT,
 foodName VARCHAR(30),
 amount SMALLINT,
 unit VARCHAR(20),
 caloriesIn SMALLINT,
 date DATE
);


ALTER TABLE food ADD CONSTRAINT food_pkey PRIMARY KEY (id);


CREATE TABLE workouts (
 id BIGSERIAL,
 userId SMALLINT,
 exercise VARCHAR(20),
 duration SMALLINT,
 caloriesOut SMALLINT,
 date DATE
);


ALTER TABLE workouts ADD CONSTRAINT workouts_pkey PRIMARY KEY (id);

ALTER TABLE food ADD CONSTRAINT food_userId_fkey FOREIGN KEY (userId) REFERENCES users(id);
ALTER TABLE workouts ADD CONSTRAINT workouts_userId_fkey FOREIGN KEY (userId) REFERENCES users(id);