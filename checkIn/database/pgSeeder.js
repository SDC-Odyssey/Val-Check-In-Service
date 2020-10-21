var { Pool } = require('pg')

// create a new connection pool to the database
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "testdb",
  password: "student",
  port: 5432
});

const query = `COPY checkin.availability (id,date,room_id,available) FROM '/home/valeriia/rpt22/SDC/Check-In-Service/checkIn/database/availabilities-table.csv' WITH DELIMITER ',' CSV HEADER`;

pool.connect()
  .then((client) => {
    client.query(query)
      .then(() => {
        client.release();
        console.log('Done');
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  })
  .catch(err => {
    console.error('Error: ', err);
  });

pool.end().then(() => console.log('Pool has ended'))