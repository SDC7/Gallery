const fs = require('fs');

console.time('listings-generation');
const random = (max) => Math.floor(Math.random() * max);
let sentences = JSON.parse(fs.readFileSync(`${__dirname}/random_sentences.json`, 'utf8'));
let listingsFile = fs.createWriteStream('./database/seed/listings.csv');
let numberOfRecords = 10000000 - 1;
// let numberOfRecords = 10000 - 1;
for (let i = 0; i <= numberOfRecords; i += 1) {
  if (i % 500000 === 0) console.log('completed listings: ', i);
  if (i === numberOfRecords) listingsFile.write(`${i},${sentences[random(100000)]}`); 
  else listingsFile.write(`${i},${sentences[random(100000)]}\n`);
}

listingsFile.on('error', (error) => console.log('error listingsFile: ', error));
console.timeEnd('listings-generation');
listingsFile.end();
// listingsFile.on('finish', () => {
//   process.exit(0);
//   sentences = null;
//   listingsFile = null;
// });
