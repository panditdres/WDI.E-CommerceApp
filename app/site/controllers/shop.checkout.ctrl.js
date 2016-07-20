(function(){
	angular
		.module('shopApp')
		.controller('CheckoutCtrl',CheckoutCtrl)

	function CheckoutCtrl($scope,productSrv,products){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = products;
		shopVm.cart 	= productSrv.cart;

		// shopVm.getItemAmount  = getItemAmount;
		// shopVm.cartItemAmount = shopVm.getItemAmount();
		console.log("Cart Item",shopVm.cart)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

		// function getItemAmount(){
		// 	for(var i=0; i<shopVm.cart.length; i++) {
		// 		var amount = shopVm.cart[i].amount;
		// 	}
		// 	return amount;
		// 	console.log(amount)
		// }

		// function getItemInfo(){
		// 	for(var i=0; i<shopVm.cart.length; i++) {
		// 		var productInfo = shopVm.cart[i].item;
		// 	}
		// 	return productInfo;
		// 	console.log(productInfo)
		// }
	}

})();


