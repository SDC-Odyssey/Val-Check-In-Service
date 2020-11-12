const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'student',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

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
);`;

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
