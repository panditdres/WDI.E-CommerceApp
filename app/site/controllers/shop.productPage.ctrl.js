(function(){
	angular
		.module('shopApp')
		.controller('ProductPageCtrl',ProductPageCtrl)

	function ProductPageCtrl($scope,productSrv){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products = productSrv.getProducts();
		console.log("SHOP VM PRODUCTS",shopVm.products)

		shopVm.quantities = [
			{number: '1', value: '1'},
			{number: '2', value: '2'},
			{number: '3', value: '3'},
			{number: '4', value: '4'},
			{number: '5', value: '5'}
		]

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
	}

})();
