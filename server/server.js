const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const api = require('../keys.js');

app.use(express.json());
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});