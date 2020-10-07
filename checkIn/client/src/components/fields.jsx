/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './fields.css';
import GuestForm from './GuestForm';
import CalendarContainer from './CalendarContainer';
import Pricings from './pricings';

const dateDiff = function dateDifference(laterDateString, earlierDateString) {
  const differenceInMilliseconds =
    Date.parse(laterDateString) - Date.parse(earlierDateString);
  const differenceInDays = Math.round(
    differenceInMilliseconds / (24 * 3600 * 1000)
  );
  return differenceInDays;
};

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
    this.toggleGuest(target);
    this.alterGuestCount(target, event);
    this.toggleCalendar(target);
    this.clearDates(target);
    this.changeDate(target, event);
  }

  // next step is to test when checkIn is empty
  changeDate(target, event) {
    if (target === 'date') {
      const { checkIn, checkOut } = this.state;
      const { target: eventTarget } = event;
      const targetDate = eventTarget.getAttribute('date');

      const isCheckInPopulated = checkIn !== 'Add date';
      const isCheckOutPopulated = checkOut !== 'Add date';
      const areBothDatesPopulated = isCheckInPopulated && isCheckOutPopulated;
      const isTargetDateAfterCheckOut = dateDiff(targetDate, checkOut) > 0;
      const isTargetDateAfterCheckIn = dateDiff(targetDate, checkIn) > 0;

      if (areBothDatesPopulated && isTargetDateAfterCheckOut) {
        this.setState({
          nights: 'Select date',
          checkIn: targetDate,
          checkOut: 'Add date',
        });
      } else if (areBothDatesPopulated && !isTargetDateAfterCheckOut) {
        this.setState({
          checkIn: targetDate,
          nights: dateDiff(checkOut, targetDate),
        });
      } else if (
        isCheckInPopulated &&
        !isCheckOutPopulated &&
        isTargetDateAfterCheckIn
      ) {
        this.setState({
          checkOut: targetDate,
          nights: dateDiff(targetDate, checkIn),
        });
      } else if (
        isCheckInPopulated &&
        !isCheckOutPopulated &&
        !isTargetDateAfterCheckIn
      ) {
        this.setState({
          checkIn: targetDate,
          checkOut: 'Add date',
        });
      } else if (!isCheckInPopulated) {
        this.setState({
          checkIn: targetDate,
          checkOut: 'Add date',
        });
      }
    }
  }

  clearDates(target) {
    if (target === 'clearDates') {
      this.setState({
        checkIn: 'Add date',
        checkOut: 'Add date',
        nights: 'Select dates',
      });
    }
  }

  toggleCalendar(target) {
    const { displayCalendar } = this.state;

    if (target === 'toggleCalendar') {
      this.setState({
        displayCalendar: !displayCalendar,
        displayGuestForm: false,
      });
    }
  }

  toggleGuest(target) {
    const { displayGuestForm } = this.state;
    if (target === 'guest') {
      this.setState({
        displayGuestForm: !displayGuestForm,
      });
    }
  }

  alterGuestCount(target, event) {
    const { target: eventTarget } = event;
    const action = eventTarget.getAttribute('data-action');
    if (action === 'increment') {
      this.setState((prevState) => ({ [target]: prevState[target] + 1 }));
    } else if (action === 'decrement') {
      this.setState((prevState) => ({ [target]: prevState[target] - 1 }));
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
    let calendarForm;
    let reserveButton;
    let pricingModule;
    const infantDisplay = this.infantRender();
    const guestDisplay = this.guestRender();

    let guestForm;
    if (displayGuestForm) {
      guestForm = (
        <GuestForm
          guests={{ adults, children, infants }}
          onClick={this.onClick}
        />
      );
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

    const areNightsSelected = nights !== 'Select dates';
    if (areNightsSelected) {
      reserveButton = (
        <div id={styles.buttonWrapper}>
          <button type="button" id={styles.reserveButton}>
            Reserve
          </button>
        </div>
      );

      pricingModule = <Pricings pricing={pricing} nights={nights} />;
    } else {
      reserveButton = (
        <div id={styles.buttonWrapper}>
          <button
            type="button"
            id={styles.reserveButton}
            onClick={(event) => {
              this.onClick(event, 'toggleCalendar');
            }}
          >
            Check Availability
          </button>
        </div>
      );

      pricingModule = '';
    }

    return (
      <div>
        <div id={styles.fieldGrid}>
          {/* <form> */}
          <div
            id={styles.checkIn}
            className={styles.fields}
            onClick={(event) => {
              this.onClick(event, 'toggleCalendar');
            }}
            role="button"
            tabIndex={0}
          >
            <p className={styles.label}>CHECK-IN</p>
            <p className={styles.subText}>{checkIn}</p>
          </div>
          <div
            id={styles.checkOut}
            className={styles.fields}
            onClick={(event) => {
              this.onClick(event, 'toggleCalendar');
            }}
            role="button"
            tabIndex={0}
          >
            <p className={styles.label}>CHECKOUT</p>
            <p className={styles.subText}>{checkOut}</p>
          </div>
          <div
            id={styles.guests}
            className={styles.fields}
            onClick={(event) => {
              this.onClick(event, 'guest');
            }}
            role="button"
            tabIndex={0}
          >
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

Fields.propTypes = {
  availability: PropTypes.array.isRequired,
  pricing: PropTypes.object.isRequired,
};

export default Fields;
