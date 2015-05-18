/// <reference path="typings/angularjs/angular.d.ts" />

var app = angular.module('stockApp', []);

app.service('StockService', function($http) {
	var getAll = function() {
			return $http.get('http://localhost:3000/api/stocks').then(function(response) {
				return response.data;
			});
		}
	return { getAll: getAll };
	
	this.calculateTotalPrice = function(a, b) { return a * b; };
});

app.controller('StockController', function($scope, StockService) {
	
	var myData = StockService.getAll();
	myData.then(function(result) {
		$scope.stocks = result;
	});
});

app.directive('stockitem', function() {
	return {
		scope: {
			stock: '=stockitem'	
		},
		restrict: 'EA',
		templateUrl: 'views/stockitem.html'
	};
});

app.service('TransactionService', function($http) {
	var getAll = function() {
		return $http.get('http://localhost:3000/api/transactionsoverview').then(function(response) {
			return response.data;
		});
	}
	
	var add = function(transaction) {
		return $http.post('http://localhost:3000/api/transactions', transaction).then(function(response) {
			return response.data;
		});	
	};
	
	return { 
		getAll: getAll,
		add: add 
	};
});

app.controller('TransactionsController', function($scope, TransactionService) {
	var myData = TransactionService.getAll();
	myData.then(function(result) {
		$scope.transactions = result;
	});
	
	$scope.add = function(result) {
		console.log($scope.transaction);
		TransactionService.add($scope.transaction);	
	};
});