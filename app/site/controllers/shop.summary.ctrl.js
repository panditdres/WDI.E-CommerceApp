(function(){
	angular
		.module('shopApp')
		.controller('SummaryCtrl',SummaryCtrl)

	function SummaryCtrl($scope,productSrv,products){
		var shopVm = this;

		shopVm.addOrder 	  = productSrv.addOrder;
		shopVm.newOrder 	  = productSrv.newOrder;
		shopVm.products 	  = products;
		shopVm.orders 		  = productSrv.orders;
		shopVm.cart 		  = productSrv.cart;
		shopVm.randomOrderNum = productSrv.randomOrderNum;
		shopVm.randomShipping = productSrv.randomShipping;

		console.log("order", shopVm.orders)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

	}

})();


