import React from 'react';
// import ReactDOM from 'react-dom';

const CheckIn = function CheckInModule(props) {
  console.log({availability, pricing});
  const {availability, pricing} = props;
  const {base_price} = pricing;
  return (
    <div>
      <h3>${props.pricing.base_price}
        <span>    󰀄 4.95 (386)</span>
      </h3>
    </div>
  );
};

export default CheckIn;
