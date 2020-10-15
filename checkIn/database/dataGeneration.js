const faker = require('faker');
const fs = require('fs');

const writeDataToTable = fs.createWriteStream('availabilities-table.csv', { flags: 'a' });

const writeTenMillionUsers = (writer, encoding, callback) => {
  let i = 10000000;
  let id = 0;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const date = faker.date.soon();
      const roomId = faker.random.number(1, 101);
      const available = faker.random.boolean();
      const data = `${id},${date},${roomId},${available}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

writeDataToTable.write('id,date,room_id,available\n', 'utf8');
writeTenMillionUsers(writeDataToTable, 'utf-8', () => {
  writeDataToTable.end(err => {
    if (err) {
      console.log('Getting an error', err);
    } else {
      console.log('Hooray, 10M records in the file');
    }
  });
});
