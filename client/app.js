/// <reference path="typings/angularjs/angular.d.ts" />

var app = angular.module('stockApp', ['ui.bootstrap', 'smart-table']);

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
		return $http.get('http://localhost:3000/api/transactions').then(function(response) {
			return response.data;
		});
	};
	
	var add = function(transaction) {
		return $http.post('http://localhost:3000/api/transactions', transaction).then(function(response) {
			return response.data;
		});	
	};
	
	var getNumberOfTransactions = function() {
		return 6;
	};
	
	return { 
		getAll: getAll,
		add: add,
		getNumberOfTransactions: getNumberOfTransactions
	};
});

app.controller('TransactionsController', function($scope, $modal, TransactionService) {
	var myData = TransactionService.getAll();
	myData.then(function(result) {
		$scope.transactions = result;
	});
	
	$scope.add = function(result) {
		console.log($scope.transaction);
		TransactionService.add($scope.transaction);	
	};
	
	$scope.open = function(size) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'views/myModal.html',
			controller: 'ModalInstanceController',
			size: size		
		});	
		
		modalInstance.result.then(function(transaction) {			
			TransactionService.add(transaction);	
			$scope.transactions.push(transaction);
		});
		
	};
	
	var q = TransactionService.getNumberOfTransactions();
	$scope.quantity = q;
});

app.directive('saTransactionQuantity', function() {
	return {
		restrict: 'EA',
		template: '<p>Aantal: {{ quantity }}</p>',	
	};
});

app.controller('ModalInstanceController', function($scope, $modalInstance) {
	// Transactie object initialiseren
	$scope.transaction = {};
	
	// Als er OK geklikt wordt dan wordt het transactie object teruggegeven
	$scope.ok = function() {		
		$modalInstance.close($scope.transaction);
	}
});

app.filter('buyselltotal', function() {
	return function(transaction) {
		var t = (transaction.entryPrice * transaction.numberOfShares) + transaction.brokerFee + ((transaction.entryPrice * transaction.numberOfShares) * (transaction.taxPercentage / 100));
		if (transaction.transactionType == 'Buy') {
			return 0 - t;
		}
		return t;
	};
});