import mysql from 'mysql';

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_INSTANCE = process.env.DB_INSTANCE;

const connection = mysql.createConnection({
  host: `/cloudsql/${DB_INSTANCE}`,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  socketPath: `/cloudsql/${DB_INSTANCE}`,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

export default connection;
