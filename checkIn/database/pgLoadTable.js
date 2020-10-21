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

const query = `DROP TABLE IF EXISTS checkin.availability;
CREATE TABLE checkin.availability(
  id SERIAL PRIMARY KEY,
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