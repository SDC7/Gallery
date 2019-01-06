const { Pool } = require('pg');
const connectionString = process.env.CON_STRING|| 'postgresql://postgres:@127.0.0.1:5432/airjld';
const pool = new Pool({ connectionString });

//const listingsPartition = 5000000; 

pool.connect()
.then((seedClient) => {
  return seedClient.client.query(
    `CREATE TABLE IF NOT EXISTS listings (
      id INTEGER,
      title VARCHAR(250)
    )`
  ).then(() => seedClient.client.query(
    `CREATE TABLE IF NOT EXISTS photos (
      id INTEGER,
      alt VARCHAR(250),
      url TEXT,
      listing_id INTEGER
    )`
  ));
});

module.exports.dbPool = pool;

//   )).then(() => {
//     return seedClient.query(`COPY listings FROM '${__dirname}/seed/listings.csv' WITH (FORMAT csv)`)
//       .then(() => seedClient.query(`COPY photos FROM '${__dirname}/seed/photos.csv' WITH (FORMAT csv)`))
//       .catch((e) => console.log('error with COPY: ', e))
//       .then(() => {
//         console.log('Seeding completed');
//         seedClient.client.end();
//       })
//       .then(() => pool.end());
//   });
// });
// pool.query(`
//   CREATE TABLE IF NOT EXISTS listings (
//     id INTEGER,
//     title VARCHAR(250)
//   ) PARTITION BY RANGE (id)
// `)
// .then(() => {
//   return pool.query(`
//     CREATE TABLE IF NOT EXISTS listings_0 PARTITION OF listings
//       FOR VALUES FROM (0) TO (${listingsPartition});
//     CREATE TABLE IF NOT EXISTS listings_1 PARTITION OF listings
//       FOR VALUES FROM (${listingsPartition}) TO (${listingsPartition*2+1});
//   `)
// })
// .catch(error => console.log('error connectin/querying postgreSQL: ', error));

// const photosPartition = 3000;
// pool.query(`
//   CREATE TABLE IF NOT EXISTS photos (
//     id INTEGER, 
//     alt VARCHAR(250),
//     url TEXT,
//     listing_id INTEGER
//   ) PARTITION BY RANGE (listing_id)
// `).then(() => {
//     return pool.query(`
//       CREATE TABLE IF NOT EXISTS photos_0 PARTITION OF photos
//         FOR VALUES FROM (0) TO (${photosPartition});
//       CREATE TABLE IF NOT EXISTS photos_1 PARTITION OF photos
//         FOR VALUES FROM (${photosPartition}) TO (${photosPartition*2});
//       CREATE TABLE IF NOT EXISTS photos_2 PARTITION OF photos
//         FOR VALUES FROM (${photosPartition*2}) TO (${photosPartition*3});
//       CREATE TABLE IF NOT EXISTS photos_3 PARTITION OF photos
//         FOR VALUES FROM (${photosPartition*3}) TO (${photosPartition*4+1});
//     `)
// })
// .catch(error => console.log('error connectin/querying postgreSQL: ', error));


