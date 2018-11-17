const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/gallery';

const db = mongoose.connect(mongoUri, (err) => {
  if (err) { console.log(err, 'trouble connecting to DB'); }
  console.log('success connecting to DB');
})

module.exports = db;
