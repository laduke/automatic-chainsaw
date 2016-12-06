const express = require('express');
const app = express();

app.use('/api/buoys', require('./route'));

module.exports = app;
