/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './Fields.css';
import GuestForm from './GuestForm';

class Fields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkIn: 'Add date',
      checkOut: 'Add date',
      adults: 1,
      children: 0,
      infants: 0,
      displayGuestForm: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event, target) {
    console.log(target);

    const { displayGuestForm } = this.state;
    const eventTargetClass = event.target.className;

    if (target === 'guest') {
      this.setState({
        displayGuestForm: !displayGuestForm,
      });
    } else if (event.target.className.includes('increment')) {
      const newCount = this.state[target] + 1;
      this.setState({ [target]: newCount });
    } else if (event.target.className.includes('decrement')) {
      const newCount = this.state[target] - 1;
      this.setState({ [target]: newCount });
    }
  }

  render() {
    const { checkIn, checkOut, adults, children, infants, displayGuestForm } = this.state;
    let guestForm;
    if (displayGuestForm) {
      guestForm = <GuestForm guests={{ adults, children, infants }} onClick={this.onClick} />;
    } else {
      guestForm = '';
    }
    return (
      <div>
        <div id={styles.fieldGrid}>
          {/* <form> */}
          <div id={styles.checkIn} className={styles.fields} onClick={(event) => { this.onClick(event, 'checkIn'); }}>
            <p>CHECK-IN</p>
            <p>{checkIn}</p>
          </div>
          <div id={styles.checkOut} className={styles.fields} onClick={(event) => { this.onClick(event, 'checkOut'); }}>
            <p>CHECKOUT</p>
            <p>{checkOut}</p>
          </div>
          <div id={styles.guests} className={styles.fields} onClick={(event) => { this.onClick(event, 'guest'); }}>
            <p>GUESTS</p>
            <p>{adults + children} guests</p>
          </div>
          {/* </form> */}
        </div>
        {guestForm}
      </div>
    );
  }
}

export default Fields;
