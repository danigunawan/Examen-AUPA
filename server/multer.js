'use strict';

const multer = require('multer');

const Storage = multer.diskStorage({
  destination: './public/images/',
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: Storage
}).single('file');

module.exports = { upload };
