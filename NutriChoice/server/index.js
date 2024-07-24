import express from 'express';
import connection from './db.js';

const app = express();

app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      res.status(500).send('Database query error');
      return;
    }
    res.send(`The solution is: ${results[0].solution}`);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
