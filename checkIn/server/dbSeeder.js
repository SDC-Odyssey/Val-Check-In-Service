const {
  Sequelize,
  INTEGER,
  DECIMAL,
  DATEONLY,
  BOOLEAN,
} = require('sequelize');

const {
  generatePricing,
  generateAvailability,
} = require('./generateRandomData');

const init = async function initializeNewDatabase() {
  const newConnection = new Sequelize('', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });
  await newConnection.query('CREATE DATABASE IF NOT EXISTS check_in;');
  await newConnection.close();

  const sequelize = new Sequelize('check_in', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable('pricings', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    base_price: {
      type: INTEGER,
      allowNull: false,
    },
    cleaning_fee: {
      type: DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    occupancy_fee: {
      type: DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    cost_additional_person: {
      type: DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    service_fee: {
      type: INTEGER,
      allowNull: false,
    },
    minimum_nights: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    timestamps: false,
  });

  await queryInterface.createTable('availabilities', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DATEONLY,
      allowNull: false,
    },
    room_id: {
      type: INTEGER,
      references: {
        model: 'pricings',
      },
    },
    available: {
      type: BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  const newPricingData = generatePricing();
  const newAvailabilityData = generateAvailability();

  await queryInterface.bulkInsert('pricings', newPricingData);

  try {
    await queryInterface.bulkInsert('availabilities', newAvailabilityData);
  } catch {
    console.log('insertion into availability table failed');
  }
};

init();
