const express = require('express');
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

app.use(express.static('../client/public'));

app.get('/pricing/:room_id', async (req, res) => {
  console.log(req.params.room_id);
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
    console.log('Issue with the database');
    res.sendStatus(404);
    res.end();
  }
});
