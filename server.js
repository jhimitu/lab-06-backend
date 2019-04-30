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
