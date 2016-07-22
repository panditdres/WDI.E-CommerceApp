(function(){
	angular
		.module('shopApp')
		.controller('NavCtrl',NavCtrl)

	function NavCtrl($scope,productSrv,products){
		var navVm = this;
		console.log('nav ctrl')

		navVm.products = products;
		navVm.cart = productSrv.cart;
		navVm.getTotalAmount = getTotalAmount;

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    navVm.products = productSrv.products;
		});

		$scope.$watch(function(){
	    	return productSrv.cart;
		}, function (newValue) {
		    navVm.cart = productSrv.cart;
		});

		function getTotalAmount(){
			navVm.amount = 0;
			for(var i=0; i<navVm.cart.length; i++) {
				navVm.amount += navVm.cart[i].amount;
			}

			return navVm.amount;
			console.log("Amount",navVm.amount)
		}
		getTotalAmount();
	}

})();
