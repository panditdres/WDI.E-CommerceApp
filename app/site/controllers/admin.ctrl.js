(function(){
	'use strict';

	angular
		.module('shopApp')
		.controller('AdminCtrl',AdminCtrl);

	function AdminCtrl($scope,$state,productSrv){
		var adminVm = this;
		// adminVm.addOrder = productSrv.addOrder;
		// adminVm.newOrder = productSrv.newOrder;
		adminVm.orders 	= productSrv.orders;
		adminVm.cart 	= productSrv.cart;
		adminVm.removeOrder 	  = productSrv.removeOrder;
		adminVm.randomOrderNum = productSrv.randomOrderNum();
		adminVm.randomShipping = productSrv.randomShipping();
		//public functions
		adminVm.editProduct = editProduct;
		adminVm.logout = logout;

		//check if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('auth');
		}
					
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

		$scope.$watch(function(){
	    	return productSrv.orders;
		}, function (newValue) {
			if(productSrv.orders.length > 0){
			    adminVm.orders = productSrv.orders;
			    adminVm.is_orders = true;
			}
		});

		function editProduct(product){
			$state.go('admin.edit_product',{productId:product.id});
		}

		function logout(){
			localStorage.removeItem('authToken');
			$state.go('auth');
		}

	}
})();


