/// <reference path="../typings/mongoose/mongoose.d.ts" />

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	code: String, 			// De code waarop het bedrijf beursgenoteerd staat
	entryPrice: Number, 	// De prijs per aandeel waarop deze aangekocht is
	numberOfShares: Number,	// Aantal aandelen die aangekocht geweest zijn
	brokerFee: Number,		// Kost die moet betaald worden aan de broker
	taxPercentage: Number,	// BTW percentage dat op de aankoop/verkoop moet worden aangerekend
	taxValue: Number,		// De waarde van de BTW kost
	// Datum waarop de transactie uitgevoerd geweest is
	transactionDate: {
		type: Date,
		default: Date.now
	},	
	transactionType: String,// Type transactie: Buy, Sell
	notes: String,			// Notities bij de transactie
	currency: String,		// Indien de aandelen met een andere munt verhandeld worden 
	currenyValue: Number	// De waarde van de munt bij aankoop van de aandelen
});

module.exports = mongoose.model('Transaction', transactionSchema);