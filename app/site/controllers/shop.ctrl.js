(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)


	function ShopCtrl($scope,productSrv,products,$state){
		var shopVm = this;

		shopVm.products = products;

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
		shopVm.showAll = true;
		shopVm.sunCheck = true;
		shopVm.eyeCheck = true;
		shopVm.filterCheck = 'all';

		function selectFilter(item) {
			console.log(item);
			if (shopVm.showAll == true) {
					return true
				}
			// else if (shopVm.sunCheck == true || shopVm.eyeCheck == true) {
			else if (item.category == "Sun Glasses" && shopVm.sunCheck == true) {
					console.log('sunglass');
					return true
				}
			// } else if (shopVm.eyeCheck == true) {
			else if (item.category == "Eye Glasses" && shopVm.eyeCheck == true) {
					console.log('eyeglass')
					return true
				
			} else {
				console.log('none') //nothing will show up on page
				return false
			}
		}

		shopVm.CollectionSelect = CollectionSelect;

		function CollectionSelect(item) {
			if (shopVm.selectedCollection == item) {
				shopVm.selectedCollection = '';
			} else {
				shopVm.selectedCollection = item;
				console.log(shopVm.selectedCollection)
			}
		 }

		shopVm.sortOptions = [
		    {label: 'Low to High', sortField: 'price', reverse: false},
		    {label: 'High to Low', sortField: 'price', reverse: true}
		];
		shopVm.selected = shopVm.sortOptions[0];
	}
})();




