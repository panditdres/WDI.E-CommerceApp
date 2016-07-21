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




		// shopVm.check = function() {
		// 	console.log(shopVm.sunCheck)
		// }

		shopVm.selectFilter = selectFilter;
		shopVm.sunCheck = true;
		shopVm.eyeCheck = true;

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

		 shopVm.CollectionFilter = CollectionFilter;
			
			function CollectionFilter(item) {
				console.log(item);
					if (shopVm.DocCheck == true) {
						if (item.description.collection == "Doc") {
							console.log('Doc');
							return true
						}
					} else if (shopVm.MicroCheck == true) {
						if (item.description.collection == "Micro") {
							console.log('Micro')
							return true
						}
					} else if (shopVm.StateCheck == true) {
						if (item.description.collection == "State") {
							console.log('State')
							return true
						}

					} else if (shopVm.SnowCheck == true) {
						if (item.description.collection == "Snow") {
							console.log('Snow')
							return true
						}	

					} else {
						console.log('none')
						return false
					}
		 }

		 //Sort options by price

		 shopVm.sortOptions = [
		    {label: 'Low to High', sortField: 'Price', reverse: false},
		    {label: 'High to Low', sortField: 'Price', reverse: true}
		]


			shopVm.selected = shopVm.sortOptions[0];
	}

		 

		

})();




