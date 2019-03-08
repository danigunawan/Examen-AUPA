'use strict';

const express = require('express');
const FaceController = require('../controllers/FaceController');

const api = express.Router();

api.post('/upload', FaceController.uploadImage);

module.exports = api;
