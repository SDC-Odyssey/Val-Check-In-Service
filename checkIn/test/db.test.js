const {
  Pricing,
  Availability,
  sequelize,
} = require('../server/db');

const {
  generatePricing,
  generateAvailability,
} = require('../server/generateRandomData');

// integration test for database
describe('Check-in database', () => {
  it('Actually exists', async () => {
    const databaseName = sequelize.getDatabaseName();
    expect(databaseName).toBe('check_in');
  });

  it('Has a pricing table', async () => {
    const pricingTableName = Pricing.getTableName();
    expect(pricingTableName).toBe('pricings');
  });

  it('Has an availability table', async () => {
    const availabilityTableName = Availability.getTableName();
    expect(availabilityTableName).toBe('availabilities');
  });

  sequelize.close();
});

describe('Random data generator', () => {
  it('Generates a pricing array with an id, base price, and service fee', () => {
    const randomPricing = generatePricing();
    expect(Array.isArray(randomPricing)).toBe(true);
    expect(randomPricing.length).toBeGreaterThan(0);
    expect(randomPricing[0].id).toBeTruthy();
    expect(randomPricing[0].base_price).toBeTruthy();
    expect(randomPricing[0].service_fee).toBeTruthy();
  });
  it('Generates an availability array with an id, room_id, date, and available boolean', () => {
    const randomAvailability = generateAvailability();
    expect(Array.isArray(randomAvailability)).toBe(true);
    expect(randomAvailability.length).toBeGreaterThan(0);
    expect(randomAvailability[0].id).toBeTruthy();
    expect(randomAvailability[0].room_id).toBeTruthy();
    expect(randomAvailability[0].date).toBeTruthy();
    expect(randomAvailability[0].available).toBeTruthy();
  });
});
