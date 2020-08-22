const express = require('express');
const path = require('path');
const cors = require('cors');
const {
  Pricing,
  Availability,
} = require('./db');

const app = express();

app.use(cors());

app.listen('3000', () => {
  console.log('Server is listening at port 3000.');
});

app.use(express.static(path.join(__dirname, '..', 'client/public'), {
  index: 'index.html',
}));

app.get('/pricing/:room_id', async (req, res) => {
  const id = req.params.room_id;
  try {
    const pricingData = await Pricing.findOne({
      where: {
        id,
      },
      raw: true,
    });
    console.log(pricingData);

    res.status(200);
    res.send(pricingData);
    res.end();
  } catch {
    console.log('Issue with retrieving pricing information from the database');
    res.sendStatus(404);
    res.end();
  }
});

app.get('/availability/:room_id', async (req, res) => {
  const id = req.params.room_id;
  try {
    const availabilityData = await Availability.findAll({
      where: {
        room_id: id,
        // date:
      },
      order: [
        ['date', 'ASC'],
      ],
      raw: true,
    });

    res.status(200);
    res.send(availabilityData);
  } catch {
    console.log('Issue with retrieving room availability from database');
    res.sendStatus(404);
    res.end();
  }
});
