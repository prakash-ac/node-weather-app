const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirPath));

//const helpFilePath = path.join(__dirname, '../public/help.html')

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Prakash'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: "Prakash",
    age: 32
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Prakash',
    age: 32
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    res.send({
      error: 'No address was provided'
    });
    return;
  }
  const locationName = req.query.address;
  geocode(locationName, (error, data) => {
    if(error){
      res.send({
        error
      });
      return;
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if(error){
        res.send({
          error
        });
        return;
      }
      res.send({
        forecast: forecastData,
        location: locationName
      });
    });
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search){
    res.send({
      error: 'You must provide a search term'
    });
    return;
  } 

  req.query
  res.send({
    products: []
  });

});

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help article not found',
    name: 'Prakash'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    message: 'Page not found',
    name: 'Prakash'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});