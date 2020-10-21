const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const {
  Pricing,
  Availability,
} = require('../database/db');

const app = express();

app.use(cors());

app.listen('3003', () => {
  console.log('Server is listening at port 3003.');
});
app.use(express.json());

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

// create
app.post('/availability', async (req, res) => {
  const newRoom = {
    id: req.body.id,
    date: req.body.date,
    room_id: req.body.room_id,
    available: req.body.available,
  };
  console.log('newRoom from server', newRoom);
  try {
    const availabilityDataObject = await Availability.create(newRoom);
    res.status(202);
    res.json(availabilityDataObject);
  } catch (err) {
    console.log('Issue with retrieving room availability from database', err);
    res.sendStatus(404);
    res.end();
  }
});

// read
app.get('/availability/:room_id', async (req, res) => {
  const id = req.params.room_id;
  try {
    const availabilityDataObject = await Availability.findAll({
      where: {
        room_id: id,
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
// update
app.put('/availability/:room_id', async (req, res) => {
  const id = req.params.room_id;
  const updateRoom = { available: req.body.available };
  try {
    const availabilityDataObject = await Availability.update(
      updateRoom,
      {
        where: {
          room_id: id,
        },
      });
    res.status(202);
    res.json(availabilityDataObject);
  } catch (err) {
    console.log('Issue with retrieving room availability from database', err);
    res.sendStatus(404);
    res.end();
  }
});

// delete
app.delete('/availability/:room_id', async (req, res) => {
  const id = req.params.room_id;
  try {
    const availabilityDataObject = await Availability.destroy(
      { where: { room_id: id } },
    );
    res.status(202);
    res.json(availabilityDataObject);
  } catch (err) {
    console.log('Issue with retrieving room availability from database', err);
    res.sendStatus(404);
    res.end();
  }
});