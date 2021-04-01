const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const api = require('../keys.js');
const db = require('../DB/db.js');

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


// {
//   "query":"for breakfast i ate 2 eggs, bacon, and french toast",
//  }

app.post('/food', (req, res) => {
  const food = req.query.query;
  const foodText = JSON.parse(food).query;
  const userid = req.query.userid;
  const date = req.query.date;
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': api.id,
      'x-app-key': api.key,
    },
    data: food,
    url: 'https://trackapi.nutritionix.com/v2/natural/nutrients/'
  };
  axios(options)
    .then(response => {
      const calories = response.data.foods[0].nf_calories;
      const query = `INSERT INTO
      food( userid, foodname, caloriesin, date)
      VALUES( ${userid}, '${foodText}', ${calories}, '${date}')`;
      db.connect((err, client, done) => {
        if (err) {
          console.log(err);
        } else {
          client.query(query, (err2, data) => {
            done();
            if (err2) {
              console.log(err2);
            } else {
              // console.log(data)
              res.send('success');
            }
          });
        }
      });
    })
    .catch(err => {
      res.send('error');
    });
});

app.post('/exercise', (req, res) => {
  const exercise = req.query.workout;
  const exerciseText = JSON.parse(exercise).query;
  const userid = req.query.userid;
  const date = req.query.date;
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': api.id,
      'x-app-key': api.key,
    },
    data: exercise,
    url: 'https://trackapi.nutritionix.com/v2/natural/exercise/'
  };
  axios(options)
    .then(response => {
      const calories = (response.data.exercises[0].nf_calories);
      const query = `INSERT INTO
      workouts(id, userid, exercise, caloriesout, date)
      VALUES(default, ${userid}, '${exerciseText}', ${calories}, '${date}')`;
      db.connect((err, client, done) => {
        if (err) {
          console.log('hi');
        } else {
          client.query(query, (err2, data) => {
            done();
            if (err2) {
              res.send('error');
            } else {
              // console.log(data)
              res.send('success');
            }
          });
        }
      });
    })
    .catch(err => {
      res.send('error');
    })
});

app.get('/login', (req, res) => {
  const loginInfo = req.query;
  const query = `SELECT * FROM users WHERE username = '${loginInfo.userName}' AND password = '${loginInfo.password}'`;
  db.connect((err, client, done) => {
    if (err) {
      console.log(err);
    } else {
      client.query(query, (err2, data) => {
        done();
        if (err2) {
          console.log(err2);
        } else {
          res.send(data.rows[0]);
        }
      });
    }
  });
});

app.get('/updateIn', (req, res) => {
  const id = Number(req.query.id);
  const date = (req.query.date);
  // let today = new Date();
  // console.log(req)
  // today = today.toLocaleDateString().slice(0, 10);
  const query = `SELECT * FROM food where userid = ${id} AND date = '${date}'`;
  db.connect((err, client, done) => {
    if (err) {
      console.log(err);
    } else {
      client.query(query, (err2, data) => {
        done();
        if (err2) {
          console.log(err2);
        } else {
          // console.log(data.rows)
          res.send(data.rows);
        }
      });
    }
  });
});

app.get('/updateOut', (req, res) => {
  const id = Number(req.query.id);
  const date = (req.query.date);
  // let today = new Date();
  // console.log('hi' + date)
  // today = today.toLocaleDateString().slice(0, 10);
  const query = `SELECT * FROM workouts where userid = ${id} AND date = '${date}'`;
  db.connect((err, client, done) => {
    if (err) {
      console.log(err);
    } else {
      client.query(query, (err2, data) => {
        done();
        if (err2) {
          console.log(err2);
        } else {
          // console.log(data.rows)
          res.send(data.rows);
        }
      });
    }
  });
});

// userName VARCHAR(30),
// password VARCHAR(30),
// height SMALLINT,
// weight SMALLINT,
// age SMALLINT,
// gender VARCHAR,
// fName VARCHAR(20),
// lName VARCHAR(20),
// maxCals SMALLINT

app.post('/newUser', (req, res) => {
  const newUserData = req.query;
  const query = `INSERT INTO
  users(username, password, height, weight, age, gender, fname, lname, maxcals)
  VALUES ('${newUserData.userName}', '${newUserData.password}', ${newUserData.height}, ${newUserData.weight}, ${newUserData.age}, '${newUserData.gender}', '${newUserData.fName}', '${newUserData.lName}', ${newUserData.maxcals})
  RETURNING *`;
  db.connect((err, client, done) => {
    if (err) {
      console.log(err);
    } else {
      client.query(query, (err2, data) => {
        done();
        if (err2) {
          res.send('error');
        } else {
          // console.log(data)
          res.send(data.rows[0]);
        }
      });
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});