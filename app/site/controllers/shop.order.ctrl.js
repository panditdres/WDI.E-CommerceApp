(function(){
	angular
		.module('shopApp')
		.controller('OrderFormCtrl',OrderFormCtrl)

	function OrderFormCtrl($scope,productSrv,products,$uiModal){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = products;
		// console.log("SHOP VM PRODUCTS",shopVm.products.category)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
	
	}

})();


