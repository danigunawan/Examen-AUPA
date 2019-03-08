const fs = require('fs');

function reader(filename) {
  return new Promise((fulfill, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      fulfill(data);
    });
  });
}

module.exports = { reader };
