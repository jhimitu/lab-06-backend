'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./client'));

app.get('/location', (request, response) => {
  try {
    const data = require('./data/geo.json');
    let search_query = request.query.data;
    let formatted_query = data.results[0].formatted_address;
    let latitude = data.results[0].geometry.location.lat;
    let longitude = data.results[0].geometry.location.lng;
    let location = new Location(search_query, formatted_query, latitude, longitude);
    console.log(location);
    response.send(location);
  } catch (error) {
    response.status(500).send('Sorry, something went wrong');
  }
});

app.get('/weather', (request, response) => {
  try {
    const data = require('./data/darksky.json');
    let forecast = data.currently.summary;
    let time = new Date(data.currently.time).toString().slice(0, 15);
    let weather = new Weather(forecast, time);
    response.send(weather);
  } catch (error) {
    response.status(500).send('Sorry, something went wrong');
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

function Location(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.latitude = latitude;
  this.longitude = longitude;
}

function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = time;
}