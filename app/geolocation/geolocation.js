const NodeGeocoder = require('node-geocoder')



const options = {
    provider: 'mapquest',
  
    // Optional depending on the providers
    apiKey: process.env.api_key, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
  
  const geocoder = NodeGeocoder(options);
  

  module.exports = geocoder
  // Using callback
  
  // output :
