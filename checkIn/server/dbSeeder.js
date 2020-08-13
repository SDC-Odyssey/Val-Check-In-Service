const { Sequelize, INTEGER, DECIMAL, DATEONLY, BOOLEAN } = require('sequelize');

const init = async function() {
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

  await queryInterface.createTable('pricing', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    base_price: {
      type: DECIMAL(18, 2),
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

  await queryInterface.createTable('availability', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DATEONLY,
      allowNull: false,
    },
    unitId: {
      type: INTEGER,
      references: {
        model: 'pricing',
      },
    },
    available: {
      type: BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};

init();
