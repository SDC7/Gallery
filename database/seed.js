const mongoose = require('mongoose');
const Listing = require('./Listing.js');
const aws = require('aws-sdk');
const faker = require('faker');
const { awsConfig } = require('../config.js');

aws.config.update(awsConfig);

let s3 = new aws.S3();

let data = {
  Bucket: 'airjld-product-page'
}

const random = () => Math.floor(Math.random() * 300);

s3.listObjects(data, (err, info) => {
  if (err) {
    console.log('Error s3.listObjects', err);
  } else {
    let baseURL = 'https://s3.amazonaws.com/airjld-product-page/';
    for (var x = 1; x < 500; x++) {
      let sampleListing = {};
      SAMPLElISTING.TITLE = FAKER.LOREM.SENTENCE();
      sampleListing.photoId = x;
      sampleListing.id = Math.floor(Math.random() * 100) + 1;
      sampleListing.urls = [
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        },
        {
          url: baseURL + info.Contents[random()].Key,
          alt: faker.lorem.sentence()
        }
      ];
      console.log('sampleListing', sampleListing);
      Listing.create(sampleListing).then(() => mongoose.disconnect());
      // const newListing = new Listing(sampleListing);
      // newListing.save((err) => {
      //   if (err) console.log('err saving instance', err);
      // })
    }
   }     
});

// const insertListings = () => {
//   Listing.create(listingSample)
//     .then(() => mongoose.disconnect());
// };

// insertListings();
