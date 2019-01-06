const aws = require('aws-sdk');
const fs = require('fs');
const { Readable, pipeline } = require('stream');
const { awsConfig } = require('../../config.js');
const sentences = JSON.parse(fs.readFileSync(`${__dirname}/random_sentences.json`, 'utf8')); 

console.time('photos-1-generation');

aws.config.update(awsConfig);
let s3 = new aws.S3();
let data = {
  Bucket: 'airjld-product-page'
}

const random = (max) => Math.floor(Math.random() * max);

class FakePhotoDataStream extends Readable {
  constructor(options){
    super(options);
    this.rowLimit = options.rowLimit;
    this.baseUrl = options.baseUrl;
    this.photoPaths = options.photoPaths
    this.listingId = 0;
    this.rowsPushed = 0;
  }
  _read(){
    if (this.rowsPushed%500000 === 0) console.log('generated ' + this.rowsPushed + ' photo records');
    if (this.rowsPushed >= this.rowLimit) this.push(null); 
    else {
      if (this.rowsPushed > 1 && this.rowsPushed%7 === 0) this.listingId += 1;
      this.rowsPushed += 1;
      let row = `${this.rowsPushed},${sentences[random(100000)]},${this.baseUrl + this.photoPaths[random(300)].Key},${this.listingId}`;
      if (this.rowsPushed < this.rowLimit) row += '\n';
      let result = this.push(row);
    }
  }
}

s3.listObjects(data, (s3_err, info) => {
  if (s3_err) return console.log('Error in s3.listObjects:', s3_err);
  let newPhotosFile = fs.createWriteStream(`${__dirname}/../fake_data/photos.csv`);

  const photoStream = new FakePhotoDataStream({
    rowLimit: 7*(10**7),
    basUrl: 'https://s3.amazonaws.com/airjld-product-page/',
    photoPaths: info.Contents
  });

  pipeline(
    photoStream,
    newPhotosFile,
    (err) => {
      if (err) console.log('Pipeline failed: ', err);
      else {
        console.log('Pipline successfully completed')
        console.timeEnd('photos-1-generation');
      }
    }
  );

});

