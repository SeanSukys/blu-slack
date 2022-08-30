const request = require("request");
var pretty = require('pretty')
require('dotenv').config()
const blueLeadzID = process.env.BLUE_LEADZ_ID

//Get the number of 5 star reatings
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
    //parse so it is a searcheable object
  const parsedBody = JSON.parse(body)

  console.log(parsedBody.axes.OVERALL.distribution['5'])
});


//get the comments 
var options = { method: 'POST',
  url: 'https://api.hubspot.com/ecosystem/public/v1/reviews/search',
  qs: 
   { hs_static_app: 'ecosystem-marketplace-solutions-public-ui',
     hs_static_app_version: '1.1233' },
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: 
   { profileId: blueLeadzID,
     reviewType: 'PROFILE',
     limit: 100,
     page: 1,
     sortFields: [ 'NEWEST' ],
     offset: 100 },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  //returns as an object so no need to parse

  console.log(body.reviews[1].answers.REVIEW)
});
