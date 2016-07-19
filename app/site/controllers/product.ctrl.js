(function(){

	angular
	.module('shopApp')
	.controller('ProductCtrl',ProductCtrl);

	function ProductCtrl($stateParams,api,productSrv){
		var productVm = this;

		productVm.categories = [
			{label:'Shirts',value:'shirts'},
			{label:'Pants',value:'pants'},
			{label:'Shoes',value:'shoes'},
			{label:'Outerwear',value:'outerwear'},
			{label:'Accessories',value:'accessories'},
		];
		productVm.product = {
			name:'',
			description:'',
			category: '',
			price:'',
			quantity:'',
			status:''
		};
		productVm.product_update_btn = 'Update Product';
		productVm.product_delete_btn = 'Remove Product';
		
		if($stateParams.productId != undefined){
			productSrv.getProduct($stateParams.productId)
			.then(function(res){
				console.log(res);
				productVm.product = res.data.product;
				//TODO #2 set category based on edit form based on 
				//product category
				for(var index in productVm.categories){
					if(productVm.product.category == productVm.categories[index].value){
						productVm.set_category = productVm.categories[index].value;
					}
				}
				
			})
		}

		//public functions
		productVm.addProduct = addProduct;
		productVm.updateProduct = updateProduct;
		productVm.deleteProduct = deleteProduct;

		function addProduct(product){
			//TODO #2
			//create product object, pass to product service
			//Update text in button
			productSrv.addProduct(product);
		}

		function updateProduct(product, productId){
			//TODO #2
			//create product object, pass to product service
			//Update text in button
			productSrv.updateProduct(product, productId);
		}

		function deleteProduct(productId){
			//TODO #2
			//remove product, pass to product service
			//update text in button
			productSrv.deleteProduct(productId);
		}
	}

})();




