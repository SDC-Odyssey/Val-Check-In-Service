// const faker = require('faker');
// const fs = require('fs');

// const writeDataToTable = fs.createWriteStream('availabilities-table.csv', { flags: 'a' });

// const generateRecords = (writer, enc, cb) => {
//   let i = 10000000;
//   let id = 0;
//   const write = () => {
//     let flag = true;
//     do {
//       i -= 1;
//       id += 1;
//       const date = faker.date.soon().toISOString();
//       const roomId = faker.random.number({ min: 1, max: 101 });
//       const available = faker.random.boolean();
//       const data = `${id},${date},${roomId},${available}\n`;
//       if (i === 0) {
//         writer.write(data, enc, cb);
//       } else {
//         flag = writer.write(data, enc);
//       }
//     } while (i > 0 && flag);
//     if (i > 0) {
//       writer.once('drain', write);
//     }
//   };
//   write();
// };

// writeDataToTable.write('id,date,room_id,available\n', 'utf8');

// generateRecords(writeDataToTable, 'utf-8', () => {
//   writeDataToTable.end(err => {
//     if (err) {
//       console.log('Getting an error', err);
//     } else {
//       console.log('Hooray, 10M records in the file');
//     }
//   });
// });

// Pricing table
const faker = require('faker');
const fs = require('fs');

const writeDataToTable = fs.createWriteStream('pricing-table.csv', { flags: 'a' });

const generateRecords = (writer, enc, cb) => {
  let i = 1000;
  let id = 0;
  const write = () => {
    let flag = true;
    do {
      i -= 1;
      id += 1;
      const basePrice = Math.floor((Math.random() * 150)) + 40;
      const cleaningFee = Math.floor((Math.random() * 30)) + 5;
      const occupancyFee = Math.floor((Math.random() * 10)) + 5;
      const costAdditionalPerson = Math.floor(Math.random() * 2) * 0.25 * basePrice;
      const serviceFee = (basePrice * (Math.floor(Math.random() * 10) + 3)) / 100;
      const minimumNights = Math.floor(Math.random() * 14);
      const data = `${id},${basePrice},${cleaningFee},${occupancyFee},${costAdditionalPerson}, ${serviceFee}, ${minimumNights}\n`;
      if (i === 0) {
        writer.write(data, enc, cb);
      } else {
        flag = writer.write(data, enc);
      }
    } while (i > 0 && flag);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

writeDataToTable.write('id,base_price,cleaning_fee,occupancy_fee,cost_additional_person,service_fee,minimum_nights\n', 'utf8');

generateRecords(writeDataToTable, 'utf-8', () => {
  writeDataToTable.end(err => {
    if (err) {
      console.log('Getting an error', err);
    } else {
      console.log('Hooray, records in the file');
    }
  });
});
