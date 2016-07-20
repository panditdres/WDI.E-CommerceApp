(function(){

	angular
	.module('shopApp')
	.controller('ProductCtrl',ProductCtrl);

	function ProductCtrl($stateParams,api,productSrv){
		var productVm = this;

		productVm.categories = [
			{label:'Eye Glasses',value:'Eye Glasses'},
			{label:'Sun Glasses',value:'Sun Glasses'},
		];
		productVm.quantities = [
			{number: '1', value: '1'},
			{number: '2', value: '2'},
			{number: '3', value: '3'},
			{number: '4', value: '4'},
			{number: '5', value: '5'}
		]
		productVm.product = {};
		productVm.product_update_btn = 'Update Product';
		productVm.product_delete_btn = 'Remove Product';
		
		if($stateParams.productId != undefined){
			productSrv.getProduct($stateParams.productId)
			.then(function(res){
				console.log(res);
				productVm.product = res.data.product;

				productVm.name 			= productVm.product.name;
				productVm.image 		= productVm.product.image;
				productVm.description 	= productVm.product.description;
				productVm.category 		= productVm.product.category;
				productVm.price 		= productVm.product.price;
				productVm.quantity		= productVm.product.quantity;
				productVm.ID    		= productVm.product.id;


				console.log(productVm.ID)
				//TODO #2 set category based on edit form based on 
				//product category
				console.log(productVm.product);
				for(var index in productVm.categories){
					if(productVm.product.category == productVm.categories[index].value){
						productVm.set_category = productVm.categories[index].value;
					}
				}
				
			})
		}

		//public functions
		productVm.addProduct    = addProduct;
		productVm.updateProduct = updateProduct;
		productVm.deleteProduct = deleteProduct;

		function addProduct(){
			//TODO #2
			//create product object, pass to product service
			//Update text in button

			var description = {
					collection: productVm.collection,
					details: productVm.details
				}

			var stringifiedDesc = JSON.stringify(description)

			var glasses = {
				name: productVm.name,
				image: productVm.image,
				description: stringifiedDesc,
				category: productVm.category,
				price: productVm.price,
				quantity: productVm.quantity,
				//status:
			}
			// console.log("Product added");
			// console.log(glasses)
			productSrv.addProduct(glasses);
		}

		function updateProduct(productId){
			//TODO #2
			//create product object, pass to product service
			//Update text in button

			var description = {
					collection: productVm.collection,
					details: productVm.details
				}

			var stringifiedDesc = JSON.stringify(description)
			
			var updateGlasses = {
				name: productVm.name,
				image: productVm.image,
				description: stringifiedDesc, 
				category: productVm.category,
				price: productVm.price,
				quantity: productVm.quantity,
			}
			console.log("UPDATE",updateGlasses)
			productSrv.updateProduct(updateGlasses, productId);
		}

		function deleteProduct(productId){
			//TODO #2
			//remove product, pass to product service
			//update text in button
			productSrv.deleteProduct(productId);
		}
	}

})();




