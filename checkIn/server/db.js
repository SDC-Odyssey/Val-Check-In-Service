const {
  Sequelize,
  INTEGER,
  DECIMAL,
  DATEONLY,
  BOOLEAN,
} = require('sequelize');

const password = 'secret_Wilson10!';

const sequelize = new Sequelize('check_in', 'root', password, {
  host: 'localhost',
  dialect: 'mysql',
});

const Pricing = sequelize.define('pricing', {
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

const Availability = sequelize.define('availability', {
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
      model: Pricing,
    },
  },
  available: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  timestamps: false,
});

sequelize.sync({});

exports.Pricing = Pricing;
exports.Availability = Availability;
exports.sequelize = sequelize;
