'use strict';

const request = require('request');
const fs = require('fs');
const path = require('path');
const config = require('../util/config');
const multer = require('../multer');
const { reader } = require('../util/reader');

const upload = multer.upload;

function _upload(req, res) {
  return new Promise((fullfill, reject) => {
    upload(req, res, err => {
      if (err) {
        reject(err);
      } else if (req.file === undefined) {
        reject('No hay foto');
      }

      console.log('Eso es toño, campeón, tqm');
      const file = req.file;
      fullfill(file);
    });
  });
}

async function uploadImage(req, res) {
  const file = await _upload(req);
  const emotions = await getEmotion(file.originalname);

  res.json(emotions);
}

function getEmotion(filename) {
  return new Promise(async (fulfill, reject) => {
    const subscriptionKey = config.SUBSCRIPTION_KEY;
    const imageUrl = await reader(path.join(__dirname, `/../public/images/${filename}`));
    const params = {
      returnFaceId: 'true',
      returnFaceLandmarks: 'false',
      returnFaceAttributes: 'emotion'
    };

    const options = {
      uri: config.uriBase,
      qs: params,
      body: imageUrl,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      }
    };

    request.post(options, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
      console.log('AQUI ESTA EL JSON: ', jsonResponse);
      fulfill(jsonResponse);
    });
  });
}

module.exports = { uploadImage };
