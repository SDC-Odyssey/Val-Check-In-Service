const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
// const router = express.Router();

app.use(cors());

app.listen('3000', () => {
  console.log('Server is listening at port 3000.');
});

app.use(express.static(path.join(__dirname, '/proxyClient'), {
  index: 'index.html',
}));

app.get('/:room_id', async (req, res) => {
  const roomId = req.params.room_id;

  // try {
  const pricingResponseObject = await axios.get(`http://127.0.0.1:3003/pricing/${roomId}`);
  const pricingResponseString = JSON.stringify(pricingResponseObject.data);

  const availabilityResponseObject = await axios.get(`http://127.0.0.1:3003/availability/${roomId}`);
  const availabilityResponseString = JSON.stringify(availabilityResponseObject.data);

  const responseData = {
    pricing: pricingResponseString,
    availability: availabilityResponseString,
  };
  res.status(200);
  res.send(responseData);
  res.end();
  // } catch {
  //   res.sendStatus(404);
  //   res.end();
  // }
});
