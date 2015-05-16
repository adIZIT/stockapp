/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />

// Load required packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var stocks = require('./routes/stocks');
var transactions = require('./routes/transactions');

// Express application initialize
var app = express();

// Connect to the database
var dbName = 'stockapp';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

// Use the body-parser package in the application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	next();
})

// Register routes with /api
app.use('/api', stocks);
app.use('/api', transactions);

var server = app.listen(3000, function() {
	console.log('Express server listening on port ' + server.address().port);
});