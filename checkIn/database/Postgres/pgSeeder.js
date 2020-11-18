var { Pool } = require('pg')

// create a new connection pool to the database
const pool = new Pool({
  // host: "localhost",
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});
// Availability
const query = `\COPY checkin.availability (id,date,room_id,available) FROM '/home/valeriia/rpt22/SDC/Check-In-Service/checkIn/database/availabilities-table.csv' WITH DELIMITER ',' CSV HEADER`;
//Pricing
// const query = `COPY checkin.pricing (id,base_price,cleaning_fee,occupancy_fee,cost_additional_person,service_fee,minimum_nights) FROM '/home/valeriia/rpt22/SDC/Check-In-Service/checkIn/database/pricing-table.csv' WITH DELIMITER ',' CSV HEADER`;

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
