"use strict";

var express = require('express');

var connectDB = require('./config/db');

var path = require('path');

var app = express();

var bodyParser = require('body-parser'); // connect to db


connectDB(); // Init middleware

var buildPath = path.join(__dirname, '..', 'build');
app.use(express["static"](buildPath)); // app.use(express.json({extended : false}))
// app.use(express.bodyParser({limit: '2mb'}))

app.use(bodyParser.json({
  limit: "1mb"
}));
app.use(bodyParser.urlencoded({
  limit: "1mb",
  extended: true,
  parameterLimit: 50000
})); // app.get('/', (req, res) => {
//     res.send('API RUNNING')
// }) 
// Define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/homeWork', require('./routes/api/homeWork')); // app.use('/api/profile', require('./routes/api/profile'))
// app.use('/api/posts', require('./routes/api/posts'))

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server started on ".concat(PORT));
});