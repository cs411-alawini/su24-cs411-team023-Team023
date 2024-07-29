const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const db = mysql.createConnection({
  host: '34.133.63.126',
  user: 'root',
  password: 'team1234',
  database: 'NutriChoice'
});

db.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', (req, res) => {
  const { query } = req.query;
  const sqlQuery = 'SELECT * FROM FoodItems WHERE FoodName LIKE ?';
  db.query(sqlQuery, [`%${query}%`], (err, results) => {
    if (err) {
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sqlQuery = 'SELECT * FROM UserInfo WHERE Email = ? AND Password = ?'; //change
  db.query(sqlQuery, [email, password], (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Database query error' });
      return;
    }
    if (results.length > 0) {
      res.status(200).send({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  });
});

app.listen(3000, function () {
  console.log(`Server is running on port 3000`);
});
