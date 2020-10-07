/* eslint-disable class-methods-use-this */
import React from 'react';
import _ from 'underscore';
import styles from './CalendarGrid.css';

// to do: you'll need to add a "current month" pointer and a "next month" pointer.
// Create a function to pre-render & store months in an array.

class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonthIndex: 1,
      nextMonthIndex: 2,
      // hardcoding this in temporarily. Need to refactor to make dynamic
      validMonths: [
        'August 2020',
        'September 2020',
        'October 2020',
        'November 2020',
        'December 2020',
        'January 2021',
        'February 2021',
        'March 2021',
        'April 2021',
        'May 2021',
        'June 2021',
        'July 2021',
      ],
    };

    this.renderMonth = this.renderMonth.bind(this);
    this.monthGroup = this.groupMonths();
    this.clickScroll = this.clickScroll.bind(this);
  }

  clickScroll(target) {
    const { currentMonthIndex, nextMonthIndex } = this.state;
    const canGoBackwards = currentMonthIndex > 1;
    const canGoForwards = nextMonthIndex < 11;

    if (target === '<' && canGoBackwards) {
      this.setState({
        currentMonthIndex: currentMonthIndex - 1,
        nextMonthIndex: currentMonthIndex,
      });
    } else if (target === '>' && canGoForwards) {
      this.setState({
        currentMonthIndex: nextMonthIndex,
        nextMonthIndex: nextMonthIndex + 1,
      });
    }
  }

  groupMonths() {
    const { availability } = this.props;
    const monthGroups = {};
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    _.each(availability, (dateRow) => {
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

    _.each(monthGroups, (month, key) => {
      const { firstDay } = month;
      const lastDay =
        32 -
        new Date(firstDay.getFullYear(), firstDay.getMonth(), 32).getDate();
      monthGroups[key].lastDay = lastDay;
    });

    return monthGroups;
  }

  renderMonth(month) {
    const { onClick, checkIn, checkOut } = this.props;
    let { firstDay } = month;
    const { lastDay, serverData } = month;

    firstDay = firstDay.getDay();

    const weeks = [];

    let serverDataPointer = 0;
    for (let i = 0; i < 5; i += 1) {
      const days = [];
      for (let x = 0; x < 7; x += 1) {
        let day;
        if (i === 0 && x < firstDay) {
          day = <td className={styles.calendarDay} key={x + i * 6} />;
        } else if (serverDataPointer >= lastDay) {
          day = <td className={styles.calendarDay} key={x + i * 6} />;
        } else if (serverDataPointer < serverData.length) {
          const serverDataDay = serverData[serverDataPointer];
          const isSelected =
            serverDataDay.date === checkIn || serverDataDay.date === checkOut;
          const isBetween =
            checkOut !== 'Add date' &&
            serverDataDay.date > checkIn &&
            serverDataDay.date < checkOut;

          let selected;
          if (isSelected) {
            selected = styles.selected;
          } else if (isBetween) {
            selected = styles.betweenSelected;
          } else {
            selected = '';
          }

          if (serverDataDay.available) {
            day = (
              <td
                className={`${styles.calendarDay} ${styles.available}`}
                key={x + i * 6}
              >
                <button
                  type="button"
                  onClick={onClick}
                  date={serverDataDay.date}
                  id={serverDataDay.id}
                  className={selected}
                >
                  {serverDataPointer + 1}
                </button>
              </td>
            );
          } else {
            day = (
              <td
                className={`${styles.calendarDay} ${styles.unavailable}`}
                key={x + i * 6}
              >
                <button
                  type="button"
                  date={serverDataDay.date}
                  id={serverDataDay.id}
                  disabled
                >
                  {serverDataPointer + 1}
                </button>
              </td>
            );
          }
          serverDataPointer += 1;
        }
        days.push(day);
      }

      const week = (
        <tr className={styles.calendarWeek} key={i}>
          {days}
        </tr>
      );

      weeks.push(week);
    }
    return weeks;
  }

  render() {
    const { currentMonthIndex, nextMonthIndex, validMonths } = this.state;
    this.months = _.map(this.monthGroup, (month) => this.renderMonth(month));

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

    const currentMonth = (
      <table id={styles.calendarCore}>
        <thead>{calendarHead}</thead>
        <tbody>{this.months[currentMonthIndex]}</tbody>
      </table>
    );

    const nextMonth = (
      <table id={styles.calendarCore}>
        <thead>{calendarHead}</thead>
        <tbody>{this.months[nextMonthIndex]}</tbody>
      </table>
    );

    return (
      <div id={styles.calendarGrid}>
        <div id={styles.dateScroller}>
          <div id="currentMonth" className={styles.month}>
            <div id={styles.scrollLeft} className={styles.scroll}>
              <button
                type="button"
                onClick={() => {
                  this.clickScroll('<');
                }}
              >
                {'<'}
              </button>
              <p>{validMonths[currentMonthIndex]}</p>
            </div>
            {currentMonth}
          </div>
          <div id="nextMonth" className={styles.month}>
            <div id={styles.scrollRight} className={styles.scroll}>
              <p>{validMonths[nextMonthIndex]}</p>
              <button
                type="button"
                onClick={() => {
                  this.clickScroll('>');
                }}
              >
                {'>'}
              </button>
            </div>
            {nextMonth}
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarGrid;
