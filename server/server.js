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
  const { name, measure, amount } = req.body;
  const food = {
    query: `${measure} ${amount} ${name}`
  };
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
    .then(res => {
      console.log(res.data.foods[0].nf_calories);
    });
});

// {
//   "query":"swam 3 miles",
//   "gender":"female",
//   "weight_kg":72.5,
//   "height_cm":167.64,
//   "age":30
//  }

app.post('/exercise', (req, res) => {
  const exercise = req.body;
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
    .then(res => {
      console.log(res.data.exercises[0].nf_calories);
      // do a query to insert the calories into the workout table

    });
});

app.get('/login', (req, res) => {
  const loginInfo = req.query;
  console.log(loginInfo);
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
  let today = new Date();
  today = today.toISOString().slice(0, 10);
  const query = `SELECT SUM(caloriesin) FROM food where userid = ${id} AND date = '${today}'`;
  db.connect((err, client, done) => {
    if (err) {
      console.log(err);
    } else {
      client.query(query, (err2, data) => {
        done();
        if (err2) {
          console.log(err2);
        } else {
          res.send(data.rows[0].sum);
        }
      });
    }
  });
});

app.get('/updateOut', (req, res) => {
  const id = Number(req.query.id);
  let today = new Date();
  today = today.toISOString().slice(0, 10);
  const query = `SELECT SUM(caloriesout) FROM workouts where userid = ${id} AND date = '${today}'`;
  db.connect((err, client, done) => {
    if (err) {
      console.log(err);
    } else {
      client.query(query, (err2, data) => {
        done();
        if (err2) {
          console.log(err2);
        } else {
          res.send(data.rows[0].sum);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});