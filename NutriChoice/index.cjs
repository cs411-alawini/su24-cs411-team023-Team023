const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const db = mysql.createConnection({
  host: '35.229.74.255',
  user: 'root',
  password: 'test1234',
  database: 'nutrichoicefinal'
});

db.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = ['http://localhost:3001', 'http://35.229.74.255'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//for logging in
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sqlQuery = 'SELECT * FROM UserInfo WHERE UserId = email AND Password = password'; //change
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

  const sqlQuery = 'INSERT INTO UserInfo (UserId, Customer_Name, Height, Weight, Age, Password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sqlQuery, [email, name, height, weight, age, password], (err, result) => {
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

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
