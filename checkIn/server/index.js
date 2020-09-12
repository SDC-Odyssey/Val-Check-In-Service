const express = require('express');
const path = require('path');
const cors = require('cors');
const {
  Pricing,
  Availability,
} = require('./db');

const app = express();

app.use(cors());

app.listen('3003', () => {
  console.log('Server is listening at port 3003.');
});

app.use(express.static(path.join(__dirname, '..', 'client/public'), {
  index: 'index.html',
}));

app.get('/pricing/:room_id', async (req, res) => {
  const id = req.params.room_id;
  try {
    const pricingDataObject = await Pricing.findOne({
      where: {
        id,
      },
      raw: true,
    });
    const pricing = JSON.stringify(pricingDataObject);

    res.status(200);
    res.send(pricing);
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
    const availabilityDataObject = await Availability.findAll({
      where: {
        room_id: id,
        // date:
      },
      order: [
        ['date', 'ASC'],
      ],
      raw: true,
    });
    const availability = JSON.stringify(availabilityDataObject);

    res.status(200);
    res.send(availability);
  } catch {
    console.log('Issue with retrieving room availability from database');
    res.sendStatus(404);
    res.end();
  }
});
