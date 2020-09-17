import React from 'react';
import styles from './CalendarGrid.css';

function getDate(dateInput) {
  const date = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return {
    currentDay: date.getDay(),
    currentMonth: monthNames[date.getMonth()],
    currentYear: date.getFullYear(),
  };
}

class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);
    const {currentDay, currentMonth, currentYear} = getDate();
    this.state = {
      currentMonth,
      currentYear,
      nextMonth: 'placeholder next month',
    };
  }

  render() {
    const weeks = [];
    const { currentDay, currentMonth, currentYear } = this.state;
    for (let i = 0; i < 5; i += 1) {
      const week = (
        <tr className={styles.calendarWeek} key={i}>
          <td className={styles.calendarDay}>
            {(i * 7) + 1}
          </td>
          <td className={styles.calendarDay}>
            {(i * 7) + 2}
          </td>
          <td className={styles.calendarDay}>
            {(i * 7) + 3}
          </td>
          <td className={styles.calendarDay}>
            {(i * 7) + 4}
          </td>
          <td className={styles.calendarDay}>
            {(i * 7) + 5}
          </td>
          <td className={styles.calendarDay}>
            {(i * 7) + 6}
          </td>
          <td className={styles.calendarDay}>
            {(i * 7) + 7}
          </td>
        </tr>
      );
      weeks.push(week);
    }

    const calendarHead = (
      <tr className={styles.calendarHead}>
        <th className={styles.calendarHeadDay}>Su</th>
        <th className={styles.calendarHeadDay}>Mo</th>
        <th className={styles.calendarHeadDay}>Tu</th>
        <th className={styles.calendarHeadDay}>We</th>
        <th className={styles.calendarHeadDay}>Th</th>
        <th className={styles.calendarHeadDay}>Fr</th>
        <th className={styles.calendarHeadDay}>Sa</th>
      </tr>
    );

    const calendarCore = (
      <table id={styles.calendarCore}>
        <thead>
          {calendarHead}
        </thead>
        <tbody>
          {weeks}
        </tbody>
      </table>
    );

    return (
      <div id={styles.calendarGrid}>
        <div id={styles.dateScroller}>
          <div id="currentMonth" className={styles.month}>
            <div id={styles.scrollLeft}>{`< ${currentMonth} ${currentYear}`}</div>
            {calendarCore}
          </div>
          <div id="nextMonth" className={styles.month}>
            <div className="scrollRight">{`${currentMonth} ${currentYear} >`}</div>
            {calendarCore}
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarGrid;
