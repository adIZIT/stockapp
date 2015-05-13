/// <reference path="../typings/express/express.d.ts" />

var Stock = require('../models/stock');
var express = require('express');
var router = express.Router();

// GET: /stocks/
// Geeft een lijst van alle stock terug
router.route('/stocks').get(function(req, res) {	
	console.log('GET /stocks/');
	
	Stock.find(req.query, function(err, stocks) {
		if (err) {
			return res.send(err);
		}
		res.json(stocks);
	});
});

// POST: /stocks/
// Insert van een stock
router.route('/stocks').post(function(req, res) {
	console.log('POST /stocks/: ' + req.body);
	
	var stock = new Stock(req.body);
	
	stock.save(function(err) {
		if (err){
			return res.send(err);	
		}
		res.send({ message: 'stock inserted'});		
	});	
});

// PUT: /stocks/
// Update van een stock
router.route('/stocks/:id').put(function(req, res) {
	Stock.findOne({ _id: req.params.id }, function(err, stock) {
		if (err) {
			return res.send(err);
		}
		
		// Save the stock object
		stock.save(function(err){
			if (err) {
				return res.send(err);
			}
			
			res.json({ message: 'Stock updated' });
		});
	});
});

// GET: /stocks/:id
// Ophalen van een stock object a.d.h.v. het unieke ID
router.route('/stocks/:id').get(function(req, res) {
	Stock.findOne({ _id: req.params.id }, function(err, stock) {
		if (err) {
			return res.send(err);
		}
		res.json(stock);
	});
});

// DELETE: /stocks/:id
// Verwijderen van een stock object a.d.h.v. het unieke ID
router.route('/stocks/:id').delete(function(req, res) {
	Stock.remove({ 
		_id: req.params.id 
		}, 
		function(err) {
			if (err) {
				return res.send(err);
			}
			res.json({ message: 'delete stock' });
	});
});

module.exports = router;