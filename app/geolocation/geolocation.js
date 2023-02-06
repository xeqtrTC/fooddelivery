const NodeGeocoder = require('node-geocoder')



const options = {
    provider: 'mapquest',
  
    apiKey: process.env.api_key,
    formatter: null 
  };
  
  const geocoder = NodeGeocoder(options);
  

  module.exports = geocoder