import React from 'react';
import styles from './CalendarContainer.css';
import fieldGridStyles from './Fields.css';

import CalendarGrid from './CalendarGrid';

class CalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // nights: 0,
    };
  }

  render() {
    const {availability, onClick, nights, checkIn, checkOut} = this.props;
    const checkInDateObject = new Date(`${checkIn} 00:00:00`);
    const checkOutDateObject = new Date(`${checkOut} 00:00:00`);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedCheckIn = `${monthNames[checkInDateObject.getMonth()]} ${checkInDateObject.getDate()}, ${checkInDateObject.getFullYear()}`;
    const formattedCheckOut = `${monthNames[checkOutDateObject.getMonth()]} ${checkOutDateObject.getDate()}, ${checkOutDateObject.getFullYear()}`;

    let header;
    if (nights === 'Select dates') {
      header = (
        <div id={styles.headerTitle}>
          <p id={styles.headerTitleText}>{nights}</p>
          <p>Add your travel dates for exact pricing</p>
        </div>
      );
    } else if (nights === 1) {
      header = (
        <div id={styles.headerTitle}>
          <p id={styles.headerTitleText}>
            {`${nights} night`}
          </p>
          <p>{`${formattedCheckIn} - ${formattedCheckOut}`}</p>
        </div>
      );
    } else {
      header = (
        <div id={styles.headerTitle}>
          <p id={styles.headerTitleText}>
            {`${nights} nights`}
          </p>
          <p>{`${formattedCheckIn} - ${formattedCheckOut}`}</p>
        </div>
      );
    }
    return (
      <div id={styles.calendarContainer}>
        <div id={styles.header}>
          {header}
          <div id={styles.fieldGrid}>
            <div id={styles.checkIn} className={styles.fields}>
              <p className={styles.label}>CHECK-IN</p>
              <p className={styles.subText}>{checkIn}</p>
            </div>
            <div id={styles.checkOut} className={styles.fields}>
              <p className={styles.label}>CHECKOUT</p>
              <p className={styles.subText}>{checkOut}</p>
            </div>
          </div>
        </div>
          {/* Check-In, CheckOut grid */}
        <CalendarGrid
          availability={availability}
          onClick={(event) => { onClick(event, 'date'); }}
          checkIn={checkIn}
          checkOut={checkOut}
        />
        <div id={styles.footer}>
          <button id={styles.clearDate} type="button" onClick={(event) => { onClick(event, 'clearDates'); }}>Clear Dates</button>
          <button id={styles.close} type="button" onClick={(event) => { onClick(event, 'toggleCalendar'); }}>Close</button>
        </div>
      </div>
    );
  }
}

export default CalendarContainer;
