const request = require("request");
var pretty = require('pretty')

require('dotenv').config()
const blueLeadzID = process.env.BLUE_LEADZ_ID

var options = { method: 'POST',
  url: 'https://api.hubspot.com/ecosystem/public/v1/reviews/stats',
  qs: 
   { hs_static_app: 'ecosystem-marketplace-solutions-public-ui',
     hs_static_app_version: '1.1233' },
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: `{"profileId":${blueLeadzID},"reviewType":"PROFILE"}` };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  const parsedBody = JSON.parse(body)

  console.log(parsedBody.axes.OVERALL.distribution['5'])
});
