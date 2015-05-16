/// <reference path="../typings/mongoose/mongoose.d.ts" />

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema({
	code: String,
	entryPrice: Number,
	quantity: Number,
	brokerFee: Number,
	tax: Number
});

module.exports = mongoose.model('Stock', stockSchema);