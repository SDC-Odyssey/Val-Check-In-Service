import React from 'react';
import styles from './CalendarGrid.css';

// to do: you'll need to add a "current month" pointer and a "next month" pointer.
// Create a function to pre-render & store months in an array.

class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: 'pointer',
      nextMonth: 'pointer',
    };
  }

  groupMonths() {
    const { availability } = this.props;
    const monthGroups = {};
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    availability.forEach((dateRow) => {
      const dateObject = new Date(`${dateRow.date} 00:00:00`);
      const monthIndex = dateObject.getMonth();
      const monthText = monthNames[monthIndex];
      const month = `${monthText} ${dateObject.getFullYear()}`;

      if (!monthGroups[month]) {
        monthGroups[month] = {
          firstDay: dateObject,
          serverData: [dateRow],
        };
      } else {
        monthGroups[month].serverData.push(dateRow);
      }
    });
    return monthGroups;
  }

  renderMonth(month) {
    const {currentMonth, nextMonth} = this.state;
    const firstDay = month.firstDay.getDay();
    console.log(firstDay);

    const weeks = [];

    // const generateDay = function generateDynamicDay(week, day) {
    //   if ((day + (week * 6)) < firstDay) {
    //     return '';
    //   }

    //   return month.serverData[day + (week * 6)];
    // };

    // You will likely need to refactor this to dynamically render every single day. This way, you can actually set a valid start date to begin incrementing.
    for (let i = 0; i < 5; i += 1) {
      const week = (
        <tr className={styles.calendarWeek} key={i}>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
        </tr>
      );
      weeks.push(week);
    }
    return weeks;
  }

  // two ways to approach:
  // 1. Render the month empty to start. Then iterate over the month comparing the ids 
  // 2. Render the month using the data to start.
  // Key: Use "first day" as first index of the array to start adding values.

  render() {
    const months = this.groupMonths();
    console.log(this.groupMonths());

    console.log(this.renderMonth(months['August 2020']));
    const weeks = [];
    for (let i = 0; i < 5; i += 1) {
      const week = (
        <tr className={styles.calendarWeek} key={i}>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
          </td>
          <td className={styles.calendarDay}>
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
            <div id={styles.scrollLeft}>{`< placeholder month year`}</div>
            {calendarCore}
          </div>
          <div id="nextMonth" className={styles.month}>
            <div className="scrollRight">{`placeholder month year >`}</div>
            {calendarCore}
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarGrid;
