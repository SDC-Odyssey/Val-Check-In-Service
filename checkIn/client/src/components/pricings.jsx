import React from 'react';
import styles from './Pricings.css';

class Pricings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricingToggle: 'Hide price details',
    };

    this.onPricingToggle = this.onPricingToggle.bind(this);
  }

  onPricingToggle(event) {
    const { target } = event;
    const { pricingToggle } = this.state;
    if (target.id === 'toggle' && pricingToggle === 'Hide price details') {
      this.setState({
        pricingToggle: 'Show price details',
      });
    } else if (target.id === 'toggle' && pricingToggle === 'Show price details') {
      this.setState({
        pricingToggle: 'Hide price details',
      });
    }
  }

  render() {
    const { pricing, nights } = this.props;
    const {
      base_price,
      cleaning_fee,
      cost_additional_person,
      occupancy_fee,
      service_fee
    } = pricing;
    const { pricingToggle } = this.state;
    let numberOfNights;

    if (nights === 'Select dates') {
      numberOfNights = 0;
    } else {
      numberOfNights = nights;
    }

    const baseTotal = (base_price * numberOfNights);
    const cleaningFeeTotal = Math.round(cleaning_fee);
    const serviceFeeTotal = Math.round(service_fee);
    const occupancyFeeTotal = Math.round(occupancy_fee);
    const total = baseTotal + cleaningFeeTotal + serviceFeeTotal + occupancyFeeTotal;

    let pricingDetails;

    if (pricingToggle === 'Show price details') {
      pricingDetails = '';
    } else {
      pricingDetails = (
        <div id={styles.pricingDetails}>
          <div className={styles.pricingRow}>
            <p>
              {`$${base_price} x ${numberOfNights} nights`}
            </p>
            <p>
              {`$${baseTotal}`}
            </p>
          </div>
          <div className={styles.pricingRow}>
            <p className={styles.fees}>
              Cleaning fee
            </p>
            <p>
              {`$${cleaningFeeTotal}`}
            </p>
          </div>
          <div className={styles.pricingRow}>
            <p className={styles.fees}>
              Service fee
            </p>
            <p>
              {`$${serviceFeeTotal}`}
            </p>
          </div>
          <div className={styles.pricingRow}>
            <p className={styles.fees}>
              Occupancy fee and taxes
            </p>
            <p>
              {`$${occupancyFeeTotal}`}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div id={styles.pricing}>
        <p id={styles.chargeNotification}>
          You won't be charged yet
        </p>
        {pricingDetails}
        <div className={styles.pricingRow}>
          <button type="button" id="toggle" onClick={this.onPricingToggle}>{pricingToggle}</button>
        </div>
        <div className={styles.pricingRow} id={styles.total}>
          <p>
            Total
          </p>
          <p>
            {`$${total}`}
          </p>
        </div>
      </div>
    );
  }
}

export default Pricings;
