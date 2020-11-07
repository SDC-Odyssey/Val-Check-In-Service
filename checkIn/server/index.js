const express = require('express');
const path = require('path');
const port = 3003;
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client/public'), {
  index: 'index.html',
}));

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "testdb",
  password: "student",
  port: 5432
});
// GET ALL
app.get('/availability', (req, res) => {
  const query = 'SELECT COUNT(*) FROM checkin.availability';
  pool.query(query)
    .then((data) => {
      console.log('Successfully got all data from database');
      res.send(data);
    })
    .catch(err => {
      console.error('Error: ', err);
    });
});

// READ
app.get('/availability/:room_id', (req, res) => {
  const id = req.params.room_id;
  const query = `SELECT * FROM checkin.availability WHERE room_id=${id}`;
  pool.query(query)
    .then((data) => {
      console.log('Got data by ID --->', data);
      res.send(data[0]);
    })
    .catch(err => {
      res.status(500).send();
      console.error('Error: ', err);
    });
});

// delete
app.delete('/availability/:room_id', (req, res) => {
  const id = parseInt(req.params.room_id);
  const query = `DELETE FROM checkin.availability WHERE room_id=${id}`
  pool.query(query)
    .then((data) => {
      console.log(`Successfully removed ${data}`);
      res.status(200).send();
    })
    .catch(err => {
      console.error('Error: ', err);
      res.status(500).send();
    });
});

app.listen('3003', () => {
  console.log(`Server is listening at http://localhost:${port}`);
});