import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CheckIn from './components/CheckIn';

const checkInAWSAddress = 'http://ec2-13-56-20-100.us-west-1.compute.amazonaws.com';

const init = async function initializeApp() {
  const url = new URL(window.location);
  const idSplit = url.search.split('?');
  // This should send a request to the proxy server
  // The proxy server will then send a request to all other endpoints
  let id = idSplit[1];
  if (!id) {
    id = 1;
  }
  const pricingInformation = await axios.get(`${checkInAWSAddress}:3000/pricing/${id}`);
  const availabilityInformation = await axios.get(`${checkInAWSAddress}:3000/availability/${id}`);
  ReactDOM.render(<CheckIn pricing={pricingInformation.data} availability={availabilityInformation.data} />, document.getElementById('checkIn'));
};

init();

// {
//   responseType: 'json',
// }
