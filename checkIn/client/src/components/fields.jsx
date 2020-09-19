/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './Fields.css';
import GuestForm from './GuestForm';
import CalendarContainer from './CalendarContainer';
import Pricings from './Pricings';

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
      displayCalendar: false,
      checkInDom: '',
      checkOutDom: '',
      nights: 'Select dates',
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event, target) {
    const { displayGuestForm, displayCalendar } = this.state;
    let { checkIn, checkOut } = this.state;
    const eventTargetClass = event.target.className;
    const date = event.target.getAttribute('date');

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
    } else if (target === 'date') {
      let newCheckout;
      let nights;
      if (checkIn !== 'Add date' && checkOut !== 'Add date') {
        if (Date.parse(date) > Date.parse(checkOut)) {
          newCheckout = 'Add date';
          nights = 'Select dates';
        } else {
          newCheckout = checkOut;
          nights = Math.round((new Date(`${newCheckout} 00:00:00`).getTime() - new Date(`${date} 00:00:00`).getTime()) / (24 * 3600 * 1000));
        }
        this.setState({
          nights,
          checkIn: date,
          checkOut: newCheckout,
        });
      } else if (checkIn === 'Add date') {
        this.setState({
          checkIn: date,
          checkOut: 'Add date',
        });
      } else if (checkIn !== 'Add date') {
        if (Date.parse(date) > Date.parse(checkIn)) {
          this.setState({
            checkOut: date,
            nights: Math.round((new Date(`${date} 00:00:00`).getTime() - new Date(`${checkIn} 00:00:00`).getTime()) / (24 * 3600 * 1000)),
          });
        } else {
          this.setState({
            checkIn: date,
            checkOut: 'Add date',
          });
        }
      }
    } else if (target === 'clearDates') {
      this.setState({
        checkIn: 'Add date',
        checkOut: 'Add date',
        nights: 'Select dates',
      });
    } else if (target === 'toggleCalendar') {
      this.setState({
        displayCalendar: !displayCalendar,
        displayGuestForm: false,
      });
    }
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
    const {
      checkIn,
      checkOut,
      adults,
      children,
      infants,
      displayGuestForm,
      displayCalendar,
      nights,
    } = this.state;

    const { availability, pricing } = this.props;
    let guestForm;
    let calendarForm;
    let reserveButton;
    let pricingModule;
    const infantDisplay = this.infantRender();
    const guestDisplay = this.guestRender();

    if (displayGuestForm) {
      guestForm = <GuestForm guests={{ adults, children, infants }} onClick={this.onClick} />;
    } else {
      guestForm = '';
    }

    if (displayCalendar) {
      calendarForm = (
        <CalendarContainer
          availability={availability}
          onClick={this.onClick}
          nights={nights}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      );
    } else {
      calendarForm = '';
    }

    if (nights === 'Select dates') {
      reserveButton = (
        <div id={styles.buttonWrapper}>
          <button type="button" id={styles.reserveButton} onClick={(event) => { this.onClick(event, 'toggleCalendar'); }}>
            Check Availability
          </button>
        </div>
      );

      pricingModule = '';
    } else {
      reserveButton = (
        <div id={styles.buttonWrapper}>
          <button type="button" id={styles.reserveButton}>
            Reserve
          </button>
        </div>
      );

      pricingModule = <Pricings pricing={pricing} nights={nights} />;
    }

    return (
      <div>
        <div id={styles.fieldGrid}>
          {/* <form> */}
          <div id={styles.checkIn} className={styles.fields} onClick={(event) => { this.onClick(event, 'toggleCalendar'); }}>
            <p className={styles.label}>CHECK-IN</p>
            <p className={styles.subText}>{checkIn}</p>
          </div>
          <div id={styles.checkOut} className={styles.fields} onClick={(event) => { this.onClick(event, 'toggleCalendar'); }}>
            <p className={styles.label}>CHECKOUT</p>
            <p className={styles.subText}>{checkOut}</p>
          </div>
          <div id={styles.guests} className={styles.fields} onClick={(event) => { this.onClick(event, 'guest'); }}>
            <p className={styles.label}>GUESTS</p>
            <p className={styles.subText}>
              {guestDisplay}
              {infantDisplay}
            </p>
          </div>
          {/* </form> */}
        </div>
        {calendarForm}
        {guestForm}
        {reserveButton}
        {pricingModule}
      </div>
    );
  }
}

export default Fields;
