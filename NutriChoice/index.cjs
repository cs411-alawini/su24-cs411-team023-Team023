const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
  host: '34.133.63.126',
  user: 'root',
  password: 'team1234',
  database: 'NutriChoice'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to database.');
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/search', (req, res) => {
  const { query } = req.query;
  const sqlQuery = 'SELECT * FROM VitMacroData WHERE shrt_desc LIKE ?';
  db.query(sqlQuery, [`%${query}%`], (err, results) => {
    if (err) {
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(80, function () {
  console.log(`Server is running on port 80`);
});
