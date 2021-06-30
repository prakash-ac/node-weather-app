const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b17999347b22ce3a32d648074f4a207e&query=${lat}, ${long}&units=f`;
  request({ url: url, json: true }, (error, response) => {
    if(error){
      callback('Unable to connect to weather services', undefined);
    } else if(response.body.error){
      callback('Unable to find weather information. Try another search.', undefined);
    } else {
      callback(undefined, { location: { name: response.body.location.name, country: response.body.location.country, region: response.body.location.region }, 
        weather_info: { description: response.body.current.weather_descriptions[0], temperature: response.body.current.temperature, feelslike: response.body.current.feelslike 
      }});
    }
  });
} 

module.exports = forecast;