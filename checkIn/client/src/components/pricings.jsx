import React from 'react';
import styles from './pricings.css';

class Pricings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { pricing, numberOfNights } = this.props;
    const {
      base_price,
      cleaning_fee,
      cost_additional_person,
      occupancy_fee,
      service_fee
    } = pricing;

    console.log(pricing);
    return (
      <div id={styles.pricing}>
        <p>
          ${base_price} x {numberOfNights} nights
        </p>

        {/* After documenting the base price,
        you will need to iterate through all fees greater than 0 */}
      </div>
    );
  }
}

export default Pricings;
