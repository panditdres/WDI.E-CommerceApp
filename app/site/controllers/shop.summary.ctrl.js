(function(){
	angular
		.module('shopApp')
		.controller('SummaryCtrl',SummaryCtrl)

	function SummaryCtrl($scope,productSrv,products){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
	
		shopVm.addOrder = productSrv.addOrder;
		shopVm.newOrder = productSrv.newOrder;
		shopVm.products = products;
		shopVm.orders 	= productSrv.orders;
		shopVm.cart 	= productSrv.cart;
		shopVm.randomOrderNum = productSrv.randomOrderNum;
		shopVm.randomShipping = productSrv.randomShipping;
		// console.log("SHOP VM PRODUCTS",shopVm.products.category)
		console.log("order", shopVm.orders)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

		// function randomOrderNum() {
		// 	return Math.floor(Math.random() * 100000000)  + 1;
		// }

		// function randomShipping() {
		// 	var r = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789';
		// 	var s = '';
		// 	for (var i = 0; i < 9; i++) {
		// 		s += r.charAt(Math.floor(Math.random()*r.length));
		// 	}
		// 	return s;
		// }
	
	}

})();


