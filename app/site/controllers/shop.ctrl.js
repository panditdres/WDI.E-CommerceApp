(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)


	function ShopCtrl($scope,productSrv,products,$state){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = products;
		// shopVm.getProducts = productSrv.getProduct();
		
		console.log("SHOP VM PRODUCTS",shopVm.products)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

		shopVm.goToProductPage = goToProductPage;

		function goToProductPage(id) {
			console.log("hello mitch, please work");
			console.log(id);
			productSrv.getProduct(id)
				.then(function(result){
					console.log(result);

				});
			$state.go('shop.productPage',{'productId':id});
		}


		shopVm.check = function() {
			console.log(shopVm.sunCheck)
		}

		shopVm.selectFilter = selectFilter; 
		
		function selectFilter(item) {
			console.log(item);
				if (shopVm.sunCheck == true) {
					if (item.category == "Sun Glasses") {
						console.log('sunglass');
						return true
					}
				} else if (shopVm.eyeCheck == true) {
					if (item.category == "Eye Glasses") {
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




