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
    const {availability} = this.props;

    return (
      <div id={styles.calendarContainer}>
        {/* Header section */}
          {/* Header Text */}
          {/* Check-In, CheckOut grid */}
        <CalendarGrid availability={availability} />
        {/* Footer section */}
      </div>
    );
  }
}

export default CalendarContainer;
