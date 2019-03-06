'use strict';

const request = require('request');
const config = require('../util/config');

function getEmotion(req, res) {
  const subscriptionKey = config.SUBSCRIPTION_KEY;
  // const imageUrl = req.image;
  const imageUrl =
    'https://soyespiritual.com/wp-content/uploads/2015/10/recobroexpress-mujer-feliz.jpg';

  const params = {
    returnFaceId: 'true',
    returnFaceLandmarks: 'false',
    returnFaceAttributes: 'emotion'
  };

  const options = {
    uri: config.uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    }
  };

  request.post(options, (err, response, body) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    res.status(200).send({ jsonResponse });
    return jsonResponse;
  });
}

module.exports = { getEmotion };
