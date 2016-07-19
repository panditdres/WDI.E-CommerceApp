(function(){
	'use strict';

	angular
		.module('shopApp',['ui.router']);

	angular
		.module('shopApp')
		.config(function($stateProvider, $httpProvider, $urlRouterProvider){
			
			$urlRouterProvider.otherwise('/shop/home');

			$stateProvider
			.state('shop', {
				url:'/shop',
				templateUrl:'site/partials/shop.html', 
				controller:'ShopCtrl as ctrl'
			})

			.state('shop.main',{
				url:'/home',
				templateUrl:'site/partials/shop-main.html',
				controller:'ShopCtrl as ctrl',
				//TODO #3 resolve products before main page load
				resolve:{
					products: function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('shop.page', {
				url:'/page',
				templateUrl:'site/partials/shop-page.html',
				controller:'ShopPageCtrl as ctrl'
			})

			.state('shop.productPage', {
				url:'/productPage',
				templateUrl:'site/partials/product-page.html',
				controller:'ProductPageCtrl as ctrl'
			})

			.state('shop.checkout',{
				url:'/checkout',
				templateUrl:'site/partials/checkout.html',
				controller:'CheckoutCtrl as ctrl'
			})

			.state('admin',{
				url:'/admin',
				templateUrl:'site/partials/admin.html',
				controller:'AdminCtrl as ctrl',
				//TODO #2 Resolve Products before admin page load
				resolve:{
					products: function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('admin.dash',{
				url:'/dashboard',
				templateUrl:'site/partials/admin-dash.html',
				controller:'AdminCtrl as ctrl',
			})

			.state('admin.add_product',{
				url:'/add_product',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-add-product.html'
			})

			.state('admin.edit_product',{
				url:'/edit_product/:productId',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-edit-product.html',
			})

			.state('auth',{
				url:'/auth',
				templateUrl:'site/partials/auth-main.html',
				controller:'AuthCtrl as ctrl',
			});

			$httpProvider.interceptors.push(function(){
		       return {
		           request: function(config) {
		               return config;
		           },
		           response: function(response) {
		               var auth_token = response.headers('authentication');
		               if(localStorage.authToken == undefined && auth_token != null){
		               		localStorage.authToken = auth_token;
		               }
		               return response;
		           }
		       }
		   });
		});
})();

