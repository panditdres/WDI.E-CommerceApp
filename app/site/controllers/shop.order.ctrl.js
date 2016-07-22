(function(){
	angular
		.module('shopApp')
		.controller('OrderFormCtrl',OrderFormCtrl)

	function OrderFormCtrl($scope,productSrv,products,$state){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.addOrder = productSrv.addOrder;
		shopVm.newOrder = productSrv.newOrder;
		shopVm.products = products;
		shopVm.submitOrder = submitOrder;
		
		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

		function submitOrder() {
			console.log("submot order")
			var OrderObject = {
				firstname: shopVm.firstname,
				lastname: shopVm.lastname,
				phoneNum: shopVm.phoneNum,
				email: shopVm.email,
				address: shopVm.address,
				creditcard: shopVm.creditcard,
				cardname: shopVm.cardname,
				cvv: shopVm.cvv
			}
			console.log("OrderObject", OrderObject)
			console.log("New order",productSrv.newOrder)
			productSrv.newOrder.buyerInfo = OrderObject;		
			return OrderObject;	
		}	

	}

})();


