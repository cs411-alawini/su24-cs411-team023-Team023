import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/search', (req, res) => {
  const { query } = req.query;
  const sqlQuery = 'SELECT * FROM VitMacroData WHERE shrt_desc LIKE ?';
  connection.query(sqlQuery, [`%${query}%`], (err, results) => {
    if (err) {
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
