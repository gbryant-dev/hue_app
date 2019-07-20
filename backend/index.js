const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const device = {name: "New Device!", type: "bridge"};

app.use(bodyParser.json());

app.listen(8080, () => {console.log('Listening on port 8080')});

app.use((err, req, res, next) => {
  // console.log('------------ERROR---------');
  console.log(err.stack);
  res.status(500);
  res.json({message: err.message});
  next();
});

app.use((req, res, next) => {
  console.log(`${req.originalUrl}, ${req.headers}, ${JSON.stringify(req.body)}`);
  next();
});

app.use('/', (req, res, next) => {
  res.status(200).json({message: 'success', value: device});

});
