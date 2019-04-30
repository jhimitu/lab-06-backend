'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./client'));

app.get('/location', (request, response) => {
  response.send('yes');
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
