var createRandomCheckInData = function() {
    var initArray = new Array(100);
    var newRecords = initArray.map((currentValue, currentIndex) => {
        var id = currentIndex;
        var basePrice = Math.floor((Math.random() * 150)) + 40;
        var cleaningFee = Math.floor((Math.random() * 30)) + 5;
        var occupancyFee = Math.floor((Math.random() * 10)) + 5;
        var costAdditionalPerson = Math.floor(Math.random() * 2) * 0.25 * basePrice;

        //the service fee is the base price * a random percentage between 3% and 15%.
        var serviceFee = basePrice * (Math.floor(Math.random() * 10) + 3) /100;

        //some random number between 0 and 15 nights.
        var minimumNights = Math.floor(Math.random() * 14);
        
        return {
            id: id,
            base_price: basePrice,
            cleaning_fee: cleaningFee,
            occupancy_fee: occupancyFee,
            cost_additional_person: costAdditionalPerson,
            service_fee: serviceFee,
            minimum_nights: minimumNights
        }
    });

    return newRecords;
}