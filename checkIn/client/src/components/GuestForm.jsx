/* eslint-disable react/prop-types */
import React from 'react';
import styles from './GuestForm.css';

class GuestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { guests, onClick } = this.props;
    const {
      adults,
      children,
      infants,
    } = guests;
    return (
      <div id={styles.guestBox}>
        <div className={styles.guestFields}>
          <p className={styles.guestType} id={styles.adults}>Adults</p>
          <div className={styles.guestCount}>
            <button type="button" className={`${styles.guestCountAdjuster}`} data-action="decrement" onClick={(event) => { onClick(event, 'adults'); }}> – </button>
            <p>{adults}</p>
            <button type="button" className={`${styles.guestCountAdjuster}`} data-action="increment" onClick={(event) => { onClick(event, 'adults'); }}> + </button>
          </div>
        </div>
        <div className={styles.guestFields}>
          <div className={styles.guestType}>
            <p> Children</p>
            <p className={styles.ageGroups}> Ages 2-12</p>
          </div>
          <div className={styles.guestCount}>
            <button type="button" className={`${styles.guestCountAdjuster}`} data-action="decrement" onClick={(event) => { onClick(event, 'children'); }}> – </button>
            <p>{children}</p>
            <button type="button" className={`${styles.guestCountAdjuster}`} data-action="increment" onClick={(event) => { onClick(event, 'children'); }}> + </button>
          </div>
        </div>
        <div className={styles.guestFields}>
          <div className={styles.guestType}>
            <p>Infants</p>
            <p className={styles.ageGroups}> Under 2</p>
          </div>
          <div className={styles.guestCount}>
            <button type="button" className={`${styles.guestCountAdjuster}`} data-action="decrement" onClick={(event) => { onClick(event, 'infants'); }}> – </button>
            <p>{infants}</p>
            <button type="button" className={`${styles.guestCountAdjuster}`} data-action="increment" onClick={(event) => { onClick(event, 'infants'); }}> + </button>
          </div>
        </div>
        <p id={styles.infobox}>
          2 guests maximum. Infants don&apos;t count toward the number of guests
        </p>
        <button type="button" id={styles.close} onClick={(event) => { onClick(event, 'guest'); }}>Close</button>
      </div>
    );
  }
}

export default GuestForm;
