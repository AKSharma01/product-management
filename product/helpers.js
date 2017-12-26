const repository = require('./repositories');
const categoryRepo = require('../category/repositories');


/* ============================ Create Product ================================*/
function addProduct(body, callback){
	/*
		  This will create product object. If product object has already been created
		then it'll return the existing object. 
		  To map with the existing categories mapCategory() function has been called 
		which return the product object with mapped categories.
	*/
	repository.get(body.name, function(err, product){
		if(product.length || err){
			mapCategory(body, product, function(product){
				callback(product);
			})
		}else{
			searchAndCreate(body, function(product){
				callback(product);
			});
		}
	})
}

function mapCategory(body, product, callback){
	/*
		  In case of mapping with category, category go through categoryName() function
		If the category is already mapped with the product then it'll return "true" 
		otherwise it'll return false. 
		  It'll also update the "product field of Category" if the category is successfully
		mapped. 
	*/
	function categoryName(obj){
		return obj.name == body.category;
	}
	if(!product[0].category.find(categoryName)){
		categoryRepo.get(body.category, function(err, category){
			if(category.length){
				categoryRepo.updateByProduct(category[0]._id, product[0], function(err, category){
				});
				repository.update(product[0]._id, category[0], function(err, product){
					callback({
						data: product,
						type: "success",
						hint: "Updated",
						responseCode: 200
					});
				});		
			}else{
				callback({
					data: [],
					type: "failed",
					hint: "Category not exist. Please create category first",
					responseCode: 422
				})
			}
		})
	} else {
		callback({
			data:  product,
			type: "success",
			hint:  "Already exist",
			responseCode: 200
		})
	}
}

function searchAndCreate(body, callback){
	/*
		  In case of creating new Product Object, searchAndCreate() function search
		category present in body request. Only existing category can be allowed to 
		create new Product object.  
	*/
	categoryRepo.get(body.category, function(err, category){
		if(category.length){
			body['category'] = {
				id: category[0]._id,
				name: category[0].name
			}
			createProductAndUpdateCategory(body, function(product){
				callback(product);
			})
		} else {
			callback({
				data: [],
				type: "failed",
				hint: "Category not exist. Please create category first",
				responseCode: 422
			})
		}
	})
}

function createProductAndUpdateCategory(body, callback){
	/*
		  If new Product successfully created then it'll update category object.
	*/
	repository.create(body, function(err, product){
		if(err){
			callback({
				data: [],
				type: "failed",
				hint: "Not created",
				responseCode: 422
			})
		}else{
			updateCategory(body.category.id, product, function(product){
				callback(product);
			})
		}
	});
}

function updateCategory(categoryId, product, callback){
	categoryRepo.updateByProduct(categoryId, product, function(err, category){
	});
	callback({
		data: product,
		type: "success",
		hint: "New Product Entity Created",
		responseCode: 201
	})
}
/* ===========================================================================*/

/* ========================== Get product By Product name ====================*/
function getByProduct(name, callback) {
	/*
		  This function return the product object if Product has been created other-
		wise it'll return empty array as a response.
	*/
	repository.get(name, function(err, product){
		if (err || !product.length) {
			callback({
				data: [],
				type: err ? "error" : "success" ,
				hint: err ? "Something wrong" : "Data not found",
				responseCode: err ? 500 : 200
			})
		} else{
			callback({
				data: product,
				type: "success",
				hint: "Data found",
				responseCode: 200
			});
		}
	})
}
/* ============================================================================*/


/* ===================== Product update base on Search key ====================*/
function updateProduct(filterKey, callback) {
	/*
		  this function update the product property according to their filter keys
		if not exist then it return key error 
		  For filter repository.filter() function is call 
	*/
	let searchBy = {};
	let updateWith = {};
	searchBy[filterKey.search.key] = filterKey.search.value
	updateWith[filterKey.update.key] = filterKey.update.value;
	if ((filterKey.search.key == 'name' || filterKey.search.key == 'price') && filterKey.update.key != 'category'){
		repository.filterUpdate(searchBy, updateWith, function(err, product){
			if (err){
				callback({
					type: "failed",
					hint: "Something wrong",
					responseCode: 422
				})
			}else{
				callback({
					type: "success",
					hint: "Successfully Updated",
					responseCode: 200
				})
			}
		})
	}else if((filterKey.search.key == 'name' || filterKey.search.key == 'price') && filterKey.update.key == 'category'){
		categoryRepo.get(filterKey.update.value, function(err, category){
			if(category.length){
				updateWith[filterKey.update.key] = {
					id: category[0]._id,
					name: category[0].name
				}
				repository.filterUpdate(searchBy, updateWith, function(err, product){
					callback({
						type: "success",
						hint: "Successfully Updated",
						responseCode: 200
					})
				})
			}else{
				callback({
					data: [],
					type: "failed",
					hint: "category not found",
					responseCode: 422
				})
			}
		})
	}else{
		callback({
			data: [],
			type: "failed",
			hint: "key error",
			responseCode: 422
		})
	}
}
/* ===============================================================================*/

module.exports = {
	addProduct: addProduct,
	getByProduct: getByProduct,
	updateProduct: updateProduct
}