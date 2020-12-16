import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CheckIn from './components/CheckIn';

// const proxyAWSAddress = 'http://52.42.95.134';
// const localhost = 'http://127.0.0.1';
const ec2Service = 'http://ec2-3-17-173-179.us-east-2.compute.amazonaws.com';

const init = async function initializeApp() {
  const url = new URL(window.location);
  const idSplit = url.search.split('?');

  let id = idSplit[1];
  if (!id) {
    id = 1;
  }

  let pricingInformation;
  try {
    pricingInformation = await axios.get(
      `${ec2Service}/pricing/${id}`
      // `${localhost}:3003/pricing/${id}`
    );
    console.log(pricingInformation.data);
  } catch {
    console.log('Could not retrieve pricing information from the server');
  }

  let availabilityInformation;
  try {
    availabilityInformation = await axios.get(
      `${ec2Service}/availability/${id}`
      // `${localhost}:3003/availability/${id}`
    );
  } catch {
    console.log('Could not retrieve availability information from the server');
  }

  ReactDOM.render(
    <CheckIn
      pricing={pricingInformation.data}
      availability={availabilityInformation.data}
    />,
    document.getElementById('checkIn')
  );
};

init();

// {
//   responseType: 'json',
// }
