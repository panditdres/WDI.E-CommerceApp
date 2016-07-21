(function(){
	angular
		.module('shopApp')
		.controller('CheckoutCtrl',CheckoutCtrl)

	function CheckoutCtrl($scope,productSrv,products,$state){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = products;
		shopVm.cart 	= productSrv.cart;
		shopVm.calculate = calculate;
		shopVm.removeCart = removeCart;
		shopVm.getTotalAmount = getTotalAmount;

		console.log('shopVm.calculate', shopVm.calculate)

		// shopVm.getItemAmount  = getItemAmount;
		// shopVm.cartItemAmount = shopVm.getItemAmount();
		console.log("Cart Item",shopVm.cart)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
		
		function getTotalAmount(){
			shopVm.amount = 0;
			for(var i=0; i<shopVm.cart.length; i++) {
				shopVm.amount += shopVm.cart[i].amount;
			}
			return shopVm.amount;
			console.log("Amount",shopVm.amount)
		}

		getTotalAmount();

		function calculate() {
			shopVm.subtotal = 0;
			shopVm.hst 		= 0;
			shopVm.total 	= 0;
			for (var i = 0; i < shopVm.cart.length; i++) {

				shopVm.subtotal = shopVm.subtotal + shopVm.cart[i].item.price*shopVm.cart[i].amount;
				shopVm.hst 		= shopVm.subtotal*0.13;
				shopVm.total 	= shopVm.subtotal*1.13;
			}
			// return self.hst;
			// return self.total;
		}


		function removeCart(productId) {
			console.log("remove cart early")
			for (var i = 0; i < shopVm.cart.length; i++) {
				if(shopVm.cart[i].item.id == productId) {
					shopVm.cart.splice(i,1);
				}
			}
			calculate()
				// .then(function(){
				// 	$state.reload();
				// })
			console.log("execute removeCart")
			console.log("Cart", shopVm.cart)
		}


		calculate();


		// function getItemInfo(){
		// 	for(var i=0; i<shopVm.cart.length; i++) {
		// 		var productInfo = shopVm.cart[i].item;
		// 	}
		// 	return productInfo;
		// 	console.log(productInfo)
		// }
	}

})();


