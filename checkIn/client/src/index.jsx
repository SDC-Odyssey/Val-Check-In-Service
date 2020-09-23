import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CheckIn from './components/CheckIn';

// const proxyAWSAddress = 'http://ec2-13-56-20-100.us-west-1.compute.amazonaws.com';
const localhost = 'http://127.0.0.1';

const init = async function initializeApp() {
  const url = new URL(window.location);
  const idSplit = url.search.split('?');

  let id = idSplit[1];
  if (!id) {
    id = 1;
  }

  let pricingInformation;
  try {
    pricingInformation = await axios.get(`${localhost}:3003/pricing/${id}`);
  } catch {
    console.log('Could not retrieve pricing information from the server');
  }

  let availabilityInformation;
  try {
    availabilityInformation = await axios.get(`${localhost}:3003/availability/${id}`);
  } catch {
    console.log('Could not retrieve pricing information from the server');
  }

  ReactDOM.render(<CheckIn pricing={pricingInformation.data} availability={availabilityInformation.data} />, document.getElementById('checkIn'));
};

init();

// {
//   responseType: 'json',
// }
