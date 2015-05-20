/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts" />

// Load required packages
var express = require('express');
var path = require('path');

// Express application initialize
var app = express();

// Configuration Express server
//app.set('view engine', 'jade');
//app.set('views', __dirname + '/views');
//app.set('view option', {
//	layout: false
//});
app.use(express.static(__dirname + '/'));

// Routes
app.get('/', function(req, res) {
	//res.render('index');
	res.sendFile(path.join(__dirname + '/views/transactions.html'));
});

var server = app.listen(3001, function() {
	console.log('Express server listening on port ' + server.address().port);
});