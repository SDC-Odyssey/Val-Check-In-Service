import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Test from './components/firstModule';

const init = async function initializeApp() {
  const url = new URL(window.location);
  const endpoints = url.pathname.split('/');
  // This should send a request to the proxy server
  // The proxy server will then send a request to all other endpoints
  let roomId;
  if (endpoints[1] === '') {
    roomId = 1;
  } else {
    roomId = endpoints[1];
  }
  const pricingInformation = await axios.get(`http://127.0.0.1:3003/pricing/${roomId}`);
  const availabilityInformation = await axios.get(`http://127.0.0.1:3003/availability/${roomId}`);
  console.log(pricingInformation.data);
  console.log(availabilityInformation.data);
  ReactDOM.render(<Test pricing={pricingInformation} availability={availabilityInformation} />, document.getElementById('app'));
};

init();

// {
//   responseType: 'json',
// }
