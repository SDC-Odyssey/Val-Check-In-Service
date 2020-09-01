import React from 'react';

class Fields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkIn: 'Add date',
      checkOut: 'Add date',
      guests: '1 guest',
    };
  }

  render() {
    const {checkIn, checkOut, guests} = this.state;
    return (
      <div id="fieldGrid">
        <form>
          <div id="checkIn">
            <p>CHECK-IN</p>
            <p>{checkIn}</p>
          </div>
          <div id="checkOut">
            <p>CHECKOUT</p>
            <p>{checkIn}</p>
          </div>
          <div id="guests">GUESTS</div>
        </form>
      </div>
    );
  }
}

export default Fields;
