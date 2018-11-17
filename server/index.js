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
  Listing.find({id: req.params.id}, (err, listing) => {
    if (err) console.log('Error GET/ listings/:id', err)
    else res.send(listing)
  })
})

app.delete('/listings/:id', (req, res) => {
  console.log('delete fired, params:', req.params.id)
  Listing.deleteOne({id: req.params.id}, (err) => {
    if (err) console.log('error DELETE /listings/:id', err);
    else res.send('listing successfully deleted');
  })
});

app.put('/listings/:id', (req, res) => {
  Listing.updateOne(req.body.listing, (err) => {
    if (err) console.log(err);
    else res.send('listing successfully updated')
  })
  res.send('completed');
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

