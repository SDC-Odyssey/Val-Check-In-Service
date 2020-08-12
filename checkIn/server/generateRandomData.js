exports.createRandomCheckInData = function () {
  const newRecords = [];
  for (let i = 1; i < 101; i += 1) {
    const id = i;
    const basePrice = Math.floor((Math.random() * 150)) + 40;
    const cleaningFee = Math.floor((Math.random() * 30)) + 5;
    const occupancyFee = Math.floor((Math.random() * 10)) + 5;
    const costAdditionalPerson = Math.floor(Math.random() * 2) * 0.25 * basePrice;

    // the service fee is the base price * a random percentage between 3% and 15%.
    const serviceFee = (basePrice * (Math.floor(Math.random() * 10) + 3)) / 100;

    // some random number between 0 and 15 nights.
    const minimumNights = Math.floor(Math.random() * 14);

    newRecords.push({
      id,
      base_price: basePrice,
      cleaning_fee: cleaningFee,
      occupancy_fee: occupancyFee,
      cost_additional_person: costAdditionalPerson,
      service_fee: serviceFee,
      minimum_nights: minimumNights,
    });
  }

  return newRecords;
};

exports.createAvailabilityDates = function () {
  const newDates = [];
  
};
