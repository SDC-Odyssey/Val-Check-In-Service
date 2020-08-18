const {
  Pricing,
  Availability,
  sequelize,
} = require('../server/db');

describe('Check-in database', () => {
  it('actually exists', async () => {
    const databaseName = sequelize.getDatabaseName();
    expect(databaseName).toBe('check_in');
  });

  it('has an availability table', async () => {
    const pricingTableName = Pricing.getTableName();
    expect(pricingTableName).toBe('pricings');
  });

  it('has an availability table', async () => {
    const availabilityTableName = Availability.getTableName();
    expect(availabilityTableName).toBe('availabilities');
  });

  sequelize.close();
});
