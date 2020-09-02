import React from 'react';
import styles from './firstModule.css';
import Fields from './fields';
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
    return (
      <div id={styles.checkInService}>
        <h3>${ base_price }
          <span>    󰀄 4.95 (386)</span>
        </h3>
        <div>
          <Fields />
          <div> { buttonAction } </div>
        </div>
        <div> Pricing Detail Component</div>
      </div>
    );
  }
}

export default CheckIn;
