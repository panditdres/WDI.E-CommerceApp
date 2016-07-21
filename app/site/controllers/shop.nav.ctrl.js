(function(){
	angular
		.module('shopApp')
		.controller('NavCtrl',NavCtrl)

	function NavCtrl($scope,productSrv){
		var navVm = this;
		console.log('nav ctrl')
		navVm.cart = productSrv.cart;
		console.log(navVm.cart.length);
	}

})();
