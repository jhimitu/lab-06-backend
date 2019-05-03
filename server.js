'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
app.use(cors());
app.use(express.static('./client'));
// location constructor------------------------------------------------------------>
function Location(query, formatted_query, latitude, longitude) {
  this.search_query = query;
  this.formatted_query = formatted_query;
  this.latitude = latitude;
  this.longitude = longitude;
}
//location route-------------------------------------------------------------------->
app.get('/location', (request, response) => {
  try {
    const data = require('./data/geo.json');
    let city = new Location(request.query.data, data.results[0].formatted_address, data.results[0].geometry.location.latitude, data.results[0].geometry.location.lng);
    response.send(city);
  } catch (error) {
    response.send(handleError);
  }
});
// weather constructor-------------------------------------------------------------->
function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = time;
}
// weather route--------------------------------------------------------------->
app.get('/weather', (request, response) => {
  try {
    const data = require('./data/darksky.json');
    let daily = Object.entries(data)[6];
    let dailyData = daily[1].data;
    let myForecast = [];
    dailyData.forEach(element => {
      let date = new Date(element.time * 1000).toDateString();
      let temp = new Weather(element.summary, date);
      myForecast.push(temp);
    });
    response.send(myForecast);
  } catch (error) {
    response.send(handleError);
  }
});

function handleError() {
  return { 'status': 500, 'responseText': 'Sorry, something went wrong' };
}
app.use('*', (request, response) => response.send('Sorry, that route does not exist.'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
