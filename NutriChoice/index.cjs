const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const db = mysql.createConnection({
  host: '34.133.63.126',
  user: 'root',
  password: 'test1234',
  database: 'nutrichoice'
});

db.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//for logging in
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

//for creating accounts
app.post('/api/create-account', (req, res) => {
  const { email, password, name, age, height, weight } = req.body;

  const sqlQuery = 'INSERT INTO UserInfo (Email, Password, Name, Age, Height, Weight) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sqlQuery, [email, password, name, age, height, weight], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Database error' });
      return;
    }
    res.status(201).send({ message: 'Account created successfully', userId: result.insertId });
  });
});

//for recovering passwords
app.post('/api/recover-password', (req, res) => {
  const { email } = req.body;
  const sqlQuery = 'SELECT Password FROM UserInfo WHERE Email = ?';

  db.query(sqlQuery, [email], (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Database query error' });
      return;
    }
    if (results.length > 0) {
      res.status(200).send({ password: results[0].Password });
    } else {
      res.status(404).send({ message: 'Email not found' });
    }
  });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
