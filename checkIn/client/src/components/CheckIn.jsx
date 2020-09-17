import React from 'react';
import styles from './CheckIn.css';
import Fields from './Fields';
import Pricings from './Pricings';
// import ReactDOM from 'react-dom';

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDetailedPricing: false,
      buttonAction: 'Check availability',
    };
  }

  render() {
    const { availability, pricing } = this.props;
    const { displayDetailedPricing, buttonAction } = this.state;
    const { base_price } = pricing;
    console.log(pricing);
    console.log(availability[0]);
    console.log(new Date('2020-08-30 00:00'));
    return (
      <div id={styles.checkInService}>
        <div id={styles.heading}>
          ${base_price}
          <span id={styles.nightText}> / night</span>
          <span id={styles.ratings}>  4.95 (386)</span>
        </div>
        <div>
          <Fields />
          <div>
            {buttonAction }
          </div>
        </div>
        {/* The number of nights is hardcoded temporarily */}
        <Pricings pricing={pricing} numberOfNights={5} />
      </div>
    );
  }
}

export default CheckIn;
