const { Pool } = require('pg');
require('dotenv').config('../../.env');

const pool = new Pool({
  // host: 'localhost',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});
console.log('pool', process.env.DB_HOST);

const query = `
DROP TABLE IF EXISTS checkin.availability;
DROP TABLE IF EXISTS checkin.pricing;
CREATE TABLE checkin.pricing(
  id SERIAL,
  base_price INT,
  cleaning_fee NUMERIC(18, 2),
  occupancy_fee NUMERIC(18, 2),
  cost_additional_person NUMERIC(18, 2),
  service_fee NUMERIC,
  minimum_nights INT
);
CREATE TABLE checkin.availability(
  id SERIAL,
  date TEXT,
  room_id INT,
  available BOOLEAN
);
CREATE INDEX id_idx ON availability (id);`;

pool.connect()
  .then((client) => {
    client.query(query)
      .then(() => {
        client.release();
        console.log('Table is successfully created');
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  })
  .catch(err => {
    console.error('Error: ', err);
  });

pool.end().then(() => console.log('Pool has ended'))
