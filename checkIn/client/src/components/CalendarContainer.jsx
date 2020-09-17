import React from 'react';
import styles from './CalendarContainer.css';

import CalendarGrid from './CalendarGrid';

class CalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nights: 0,
    };
  }

  render() {
    return (
      <div id={styles.calendarContainer}>
        {/* Header section */}
          {/* Header Text */}
          {/* Check-In, CheckOut grid */}
        <CalendarGrid />
        {/* Footer section */}
      </div>
    );
  }
}

export default CalendarContainer;
