exports.up = function(knex) {
    const csv = require('csv-parser');
    const fs = require('fs');
  
    return new Promise((resolve, reject) => {
      const results = [];
  
      // Use csv-parser to parse the CSV file
      fs.createReadStream('./src/disciplinas.csv')
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          // Use Knex to insert the data into the table
          return knex.batchInsert('disciplinas', results)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
    });
  };
  
  exports.down = function(knex) {
    // Rollback the insertion of data
    return knex('disciplinas').del();
  };
  