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
  it('Generates a pricing array with an id', () => {
    const randomPricing = generatePricing();
    expect(Array.isArray(randomPricing)).toBe(true);
    expect(randomPricing[0].id).toBeTruthy();
  });
});
