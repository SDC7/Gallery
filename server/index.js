const express = require('express');
const bodyParser = require('body-parser');
const Listing = require('../database/Listing.js');
const path = require('path');

const app = express();
const port = process.env.PORT || 1128;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/listings', (req, res) => {
  Listing.find((err, listing) => {
    if (err) {
      throw err;
    } else {
      return res.send(listing);
    }
  });
});

app.get('/listings/:id', (req, res) => {
  Listing.find({photoId: req.params.id}, (err, listing) => {
    if (err) {
      throw err;
    } else {
      return res.send(listing)
    }
  })
})

app.delete('/listings/:id', (req, res) => {
  Listing.deleteOne({id: req.params.id}, (err) => {
    if (err) console.log(err);
  })
});

app.put('/listings/:id', (req, res) => {
  Listing.updateOne({}, (err) => {
    if (err) console.log(err);
  })
});

app.post('/listings', (req, res) => {
   const listing = new Listing(req.body.listing);
   listing.save((err) => {
     if (err) console.log(err);
   })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

