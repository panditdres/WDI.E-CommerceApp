(function(){
	'use strict';

	angular
		.module('shopApp')
		.controller('AdminCtrl',AdminCtrl);

	function AdminCtrl($scope,$state,productSrv){
		var adminVm = this;
		adminVm.addOrder = productSrv.addOrder;
		adminVm.newOrder = productSrv.newOrder;
		adminVm.orders 	= productSrv.orders;
		adminVm.cart 	= productSrv.cart;
		adminVm.randomOrderNum = productSrv.randomOrderNum;
		adminVm.randomShipping = productSrv.randomShipping;

		//check if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('auth');
		}
					
		adminVm.products;
		// if(adminVm.products.length > 0 ){
		// 	adminVm.is_products = true;
		// }
		console.log(adminVm.orders);

		//watch for updates to products object
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
			if(productSrv.products.length > 0){
			    adminVm.products = productSrv.products;
			    adminVm.is_products = true;
			}
		});

		//public functions
		adminVm.editProduct = editProduct;
		adminVm.logout = logout;

		function editProduct(product){
			$state.go('admin.edit_product',{productId:product.id});
		}

		function logout(){
			localStorage.removeItem('authToken');
			$state.go('auth');
		}

	}
})();


