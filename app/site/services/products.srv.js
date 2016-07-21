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
		// self.calculate			= calculate;
		// self.removeCart 		= removeCart;

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

				// console.log("AFTER",self.products);


				// if(self.products.length == 0) {
				// 	self.products.push({
				// 		name: 'Micro',
				// 		image: 'https://i.s-jcrew.com/is/image/jcrew/35526_EF2368?$pdp_fs418$',
				// 		description: 'hello',
				// 		category: 'sunglasses',
				// 		price: '$40',
				// 		quantity: '1',
				// 		status:'avaiable'
				// 		})
				// 	self.products.push({
				// 		name: 'Doc',
				// 		image: 'http://www.opumo.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/h/a/han-kjobenhavn-timeless-black-clip-on-sunglasses.jpg',
				// 		description: 'hello',
				// 		category: 'sunglasses',
				// 		price: '$40',
				// 		quantity: '1',
				// 		status:'avaiable'
				// 		})
				// 	self.products.push({
				// 		name: 'State',
				// 		image: 'https://cdn.shopify.com/s/files/1/0491/9773/products/Sunglasses-April8-SS16-04-01_1024x1024.jpg?v=1460134232',
				// 		description: 'hello',
				// 		category: 'sunglasses',
				// 		price: '$40',
				// 		quantity: '1',
				// 		status:'avaiable'
				// 		})
				// 	self.products.push({
				// 		name: 'Snow',
				// 		image: 'http://www.opumo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/a/han_kjobenhavn_amber_doc_sunglasses1.jpg',
				// 		description: 'hello',
				// 		category: 'sunglasses',
				// 		price: '$40',
				// 		quantity: '1',
				// 		status:'avaiable'
				// 		})
				// }
				// console.log(self.products)

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
				
			console.log("TEST");
			console.log(self.cart);
			return self.cart;
		}



		// function addOrder(product, quantiy) {

		// }
		console.log('end of service')

























	}
})();