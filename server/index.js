'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./util/config');

const app = express();
const api = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://localhost:${config.port} 🚀`);
});
