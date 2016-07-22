(function(){

	angular
		.module('shopApp')
		.service('productSrv',ProductService);

	function ProductService($state,api){
		var self = this;

		console.log('loading service')
		//public variables
		self.products 	= [];
		self.cart 		= [];
		self.orders 	= [];
		//public functions
		self.getProduct 		= getProduct;
		self.getProducts 		= getProducts;
		self.addProduct 		= addProduct;
		self.updateProduct 		= updateProduct;
		self.updateProductList 	= updateProductList;
		self.removeProduct 		= removeProduct;
		self.deleteProduct 		= deleteProduct;
		self.addCart 			= addCart;
		self.addOrder			= addOrder;
		self.randomOrderNum 	= randomOrderNum;
		self.randomShipping 	= randomShipping;

		self.newOrder = {
			buyerInfo: {},// form info
			purchaseDetails: []//Cart
		}

		if(localStorage.cart) {
			self.cart = JSON.parse(localStorage.cart);
			console.log("Load localStorage")
		}
		if(localStorage.orders) {
			self.orders = JSON.parse(localStorage.orders);
		}

		console.log('test')
		function getProducts(){
			return api.request('/products',{},'GET')
			.then(function(res){
				//success callback
				console.log(res);
				self.products = res.data.products;

				for (var i=0; i< self.products.length; i++) {
					console.log(self.products[i].description);
					self.products[i].description = JSON.parse(self.products[i].description);
					// console.log(JSON.parse(self.products[i].description))
				}
				return self.products;
				// return res.data.products;
			},function(err){
				//error callback
				console.log(err);
				return;
			})
		}

		console.log('addproduct in service')
		function addProduct(product){
			console.log(product);
			api.request('/products',product,'POST')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was added successfully
					self.products.push(res.data.product);
					console.log("RES DATA", res.data.product);
					console.log("SELF PROD",self.products);
					$state.go('admin.dash')
					// do a force reload here when going back to admin.dash
					.then(function(){
						$state.reload();
					})
				}
				// localStorage.setItem("Storage", JSON.stringify(product));
			},function(err){
				console.log(err)
			})
			
		}

		function updateProduct(product,productId){
			api.request('/products/'+productId,product,'PUT')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was updated successfully
					self.updateProductList(product,productId);
					console.log("product update")
					$state.go('admin.dash')
					.then(function(){
						$state.reload();
					})
				}
			})
		}

		function deleteProduct(productId){
			api.request('/products/'+productId,{},'DEL')
			.then(function(res){
				console.log(res);
				if(res.status === 200){
					//product was deleted successfully
					self.removeProduct(productId);
					$state.go('admin.dash')
					.then(function(){
						$state.reload();
					})
				}
			})
		}

		function getProduct(productId){
			return api.request('/products/'+productId,{},'GET');
		}

		function updateProductList(product,productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					self.products[i].name = product.name;
					self.products[i].image = product.image;
					self.products[i].description = product.description;
					self.products[i].category = product.category;
					self.products[i].price = product.price;
					self.products[i].quantity = product.quantity;
				}
			}
		}

		function removeProduct(productId){
			for(var i=0;i < self.products.length;i++){
				if(self.products[i].id == productId){
					delete self.products[i];
				}
			}
		}

		function addCart(product, quantity) {
			console.log(quantity)	
			var cartItem = {
				item: product,
				amount: quantity
			}
			self.cart.push(cartItem);				
			localStorage.cart = JSON.stringify(self.cart);
			console.log("TEST");
			console.log(self.cart);
			return self.cart;
		}

		function addOrder(newOrder) {
			console.log("execute add Order")
			self.orders.push(newOrder);
			self.cart = [];
			localStorage.cart = JSON.stringify(self.cart);
			localStorage.orders = JSON.stringify(self.orders);
			console.log("Order",self.orders)
			return self.orders;		
		}
		console.log('end of service')

		function randomOrderNum() {
			return Math.floor(Math.random() * 100000000)  + 1;
		}

		function randomShipping() {
			var r = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789';
			var s = '';
			for (var i = 0; i < 9; i++) {
				s += r.charAt(Math.floor(Math.random()*r.length));
			}
			return s;
		}
	}
})();