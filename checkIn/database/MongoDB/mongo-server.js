const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'records';

let db;

// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to the database");
  db = client.db(dbName);
});

module.exports = db;