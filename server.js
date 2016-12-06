const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/buoys', require('./api/route'));

module.exports = app;
