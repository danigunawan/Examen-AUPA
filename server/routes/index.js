'use strict';

const express = require('express');

const FaceController = require('../controllers/FaceController');

const api = express.Router();

api.get('/', FaceController.getEmotion);

module.exports = api;
