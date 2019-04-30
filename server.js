'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./client'));

app.get('/location', (request, response) => {
  const data = require('./data/geo.json');
  let search_query = request.query.data;
  let formatted_query = data.results[0].formatted_address;
  let latitude = data.results[0].geometry.location.lat;
  let longitude = data.results[0].geometry.location.lng;
  let location = new Location(search_query, formatted_query, latitude, longitude);
  console.log(location);
  response.send(location);
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
