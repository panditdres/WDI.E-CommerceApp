(function(){
	angular
		.module('shopApp')
		.controller('ProductPageCtrl',ProductPageCtrl)

	function ProductPageCtrl($scope,productSrv,product,$stateParams){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.getID = $stateParams.productId;
		console.log(shopVm.getID);
		shopVm.product = product;
		shopVm.addCart = addCart;
		shopVm.description = JSON.parse(shopVm.product.data.product.description);

		console.log(shopVm.description)
		// shopVm.addCart  = productSrv.addCart(products);

		shopVm.quantities = [
			{number: '1', value: 1},
			{number: '2', value: 2},
			{number: '3', value: 3},
			{number: '4', value: 4},
			{number: '5', value: 5}
		]

		console.log("SHOP VM PRODUCTS",shopVm.product.data.product)

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

		// function addCart(product) {
		// 	productSrv.addCart(shopVm.product.data.product, shopVm.quantity);
  //           toastr.success(text,"Wunderbar!" {{item.name}} "has been added to your cart");
		// }

	}

})();

