/// <reference path="../typings/express/express.d.ts" />

var Transaction = require('../models/transaction');
var express = require('express');
var router = express.Router();

// GET: /transactions/
// Geeft een lijst van alle transacties terug
router.route('/transactions').get(function(req, res) {	
	console.log('GET /transactions/');

	Transaction.find(req.query, function(err, transactions) {
		if (err) {
			return res.send(err);
		}
		res.json(transactions);
	});
});

// POST: /transactions/
// Insert van een transaction
router.route('/transactions').post(function(req, res) {
	console.log('POST /transactions/: ' + req.body);
	
	var transaction = new Transaction(req.body);
	
	transaction.save(function(err) {
		if (err){
			return res.send(err);	
		}
		res.send({ message: 'transaction inserted'});		
	});	
});

// PUT: /transactions/
// Update van een transaction
router.route('/transactions/:id').put(function(req, res) {
	Transaction.findOne({ _id: req.params.id }, function(err, transaction) {
		if (err) {
			return res.send(err);
		}
		
		// Save the transaction object
		transaction.save(function(err){
			if (err) {
				return res.send(err);
			}
			
			res.json({ message: 'transaction updated' });
		});
	});
});

// GET: /transactions/:id
// Ophalen van een transaction object a.d.h.v. het unieke ID
router.route('/transactions/:id').get(function(req, res) {
	Transaction.findOne({ _id: req.params.id }, function(err, transaction) {
		if (err) {
			return res.send(err);
		}
		res.json(transaction);
	});
});

// DELETE: /transactions/:id
// Verwijderen van een transaction object a.d.h.v. het unieke ID
router.route('/transactions/:id').delete(function(req, res) {
	Transaction.remove({ 
		_id: req.params.id 
		}, 
		function(err) {
			if (err) {
				return res.send(err);
			}
			res.json({ message: 'delete transaction' });
	});
});

router.route('/transactionsoverview').get(function(req, res) {
	console.log('/transactions/?overview');	 	
	Transaction.aggregate([
		{ $group: {
			_id: "$code",
			totalShares: { $sum: "$numberOfShares" },
			totalTaxCost: { $sum: "$taxValue" },
			totalCost: { $sum: { $add: [ "$taxValue", "$brokerFee" ] } },
			totalSharesPrice: { $sum: { $multiply: ["$numberOfShares", "$entryPrice"] } }
		}}
	], function(err, result) {
		if (err) {
			return res.send(err);
		}
		res.json(result);
	});
});

module.exports = router;