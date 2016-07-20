(function(){
	angular
		.module('shopApp')
		.controller('ProductPageCtrl',ProductPageCtrl)

	function ProductPageCtrl($scope,productSrv){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = productSrv.getProducts();
		console.log("SHOP VM PRODUCTS",shopVm.products)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
	}

})();
