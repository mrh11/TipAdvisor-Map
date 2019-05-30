const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const {getInfoById} = require('../db/index.js');

const app = express();
const port = process.env.PORT || 3006;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/hotels/:hotelID', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/locations/:hotelID', (req, res) => {
  getInfoById(req.query, (err, data) => {
    if (err) {
      console.log(err); res.status(500).send();
    } else {
      res.send(data);
    }
  });
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});