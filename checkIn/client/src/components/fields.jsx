/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './Fields.css';
import GuestForm from './GuestForm';
import CalendarContainer from './CalendarContainer';

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
    const { displayGuestForm } = this.state;
    const eventTargetClass = event.target.className;

    if (target === 'guest') {
      this.setState({
        displayGuestForm: !displayGuestForm,
      });
    } else if (eventTargetClass.includes('increment')) {
      const newCount = this.state[target] + 1;
      this.setState({ [target]: newCount });
    } else if (eventTargetClass.includes('decrement')) {
      const newCount = this.state[target] - 1;
      this.setState({ [target]: newCount });
    }
    // new route for calendar module goes here
  }

  infantRender() {
    const { infants } = this.state;
    let result;
    if (infants > 1) {
      result = `, ${infants} infants`;
    } else if (infants === 1) {
      result = `, ${infants} infant`;
    } else {
      result = '';
    }

    return result;
  }

  guestRender() {
    const { adults, children } = this.state;
    let result;
    const guests = adults + children;
    if (guests > 1) {
      result = `${guests} guests`;
    } else if (guests === 1) {
      result = `${guests} guest`;
    } else {
      result = '';
    }

    return result;
  }

  render() {
    const { checkIn, checkOut, adults, children, infants, displayGuestForm } = this.state;
    const { availability } = this.props;
    let guestForm;
    const infantDisplay = this.infantRender();
    const guestDisplay = this.guestRender();

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
            <p>
              {guestDisplay}
              {infantDisplay}
            </p>
          </div>
          {/* </form> */}
        </div>
        {guestForm}
        <CalendarContainer availability={availability}/>
      </div>
    );
  }
}

export default Fields;
