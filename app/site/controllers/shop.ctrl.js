(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($scope,productSrv, $state){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products    = productSrv.getProducts();
		console.log("SHOP VM PRODUCTS",shopVm.products)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
		shopVm.goToProductPage = goToProductPage;

		function goToProductPage() {
			console.log("hello mitch, please work");
			$state.go('shop.productPage');
		}

	}

		

})();




