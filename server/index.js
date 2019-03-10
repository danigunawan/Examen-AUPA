'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./util/config');

const app = express();
const api = require('./routes');

// eslint-disable-next-line func-names
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://localhost:${config.port} 🚀`);
});
