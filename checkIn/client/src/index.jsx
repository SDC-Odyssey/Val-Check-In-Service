import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Test from './components/firstModule';

const init = async function initializeApp() {
  const pricingInformation = await axios.get('http://127.0.0.1:3000/pricing/1');
  console.log(pricingInformation);
  ReactDOM.render(<Test pricing={pricingInformation} />, document.getElementById('app'));
};

init();

// {
//   responseType: 'json',
// }
