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

		shopVm.check = function() {
			console.log(shopVm.sunCheck)
		}

		shopVm.selectFilter = selectFilter; 
		
		function selectFilter(products) {
			console.log(products);
				if (shopVm.sunCheck == true) {
					if (products.category == "Sun Glasses") {
						console.log('sunglass');
						return true
					}
				} else if (shopVm.eyeCheck == true) {
					if (products.category == "Eye Glasses") {
						console.log('eyeglass')
						return true
					}
				} else {
					console.log('none')
					return false
				}


		 }



	}

		

})();




