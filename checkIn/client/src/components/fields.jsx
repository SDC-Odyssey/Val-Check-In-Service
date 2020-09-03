import React from 'react';
import styles from './fields.css';

class Fields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkIn: 'Add date',
      checkOut: 'Add date',
      guests: '1 guest',
    };
  }

  render() {
    const { checkIn, checkOut, guests } = this.state;
    return (
      <div id={styles.fieldGrid}>
        {/* <form> */}
        <div id={styles.checkIn} className={styles.fields}>
          <p>CHECK-IN</p>
          <p>{checkIn}</p>
        </div>
        <div id={styles.checkOut} className={styles.fields}>
          <p>CHECKOUT</p>
          <p>{checkOut}</p>
        </div>
        <div id={styles.guests} className={styles.fields}>
          <p>GUESTS</p>
          <p>{guests}</p>
        </div>
        {/* </form> */}
      </div>
    );
  }
}

export default Fields;
