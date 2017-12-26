const repository = require('./repositories');
const productRepo = require('../product/repositories');

function addCategory(body, callback){
	repository.get(body.name, function(err, category){
		if (err || category.length) {
			callback({
				data: err ? [] : category,
				type: err ? "failed" : "success" ,
				hint: err ? err : "Similar data found. Can't insert new data",
				responseCode: err ? 500 : 200
			})
		} else {
			searchParentAndCreate(body, function(category){
				callback(category);
			});	
		}
	});	
}

function searchParentAndCreate(body, callback){
	if (body.parent == body.name){
		repository.create(body.name, function(err, category){
			callback({
				data: category,
				type: "success",
				hint: "Parent Category Inserted.",
				responseCode: 201
			});
		})
	} else {
		repository.get(body.parent, function(err, category){
			if (category.length){
				createAndUpdate(category[0]._id, body.name, function(category){
					callback(category);
				})
			} else{
				callback({
					data: [],
					type: "failed",
					hint: "Parent category "+ body.parent +" not exist",
					responseCode: 422
				})
			}
		})
	}
}

function createAndUpdate(parentId, name, callback){
	repository.create(name, function(err, category){
		repository.updateByCategory(parentId, category, function(err, category){
		});
		callback({
			data: category,
			type: "success",
			hint: "New Entity Inserted.",
			responseCode: 201
		});
	});
}

function getByParent(name, callback) {
	repository.get(name, function(err, category){
		if (err || !category.length) {
			callback({
				data: [],
				type: err ? "failed" : "success" ,
				hint: err ? "error" : "Data not found",
				responseCode: err ? 500 : 200
			})
		} else{
			callback({
				data: category,
				type: "success",
				hint: "Data found",
				responseCode: 200
			});
		}
	})
}

function getAllProducts(category, callback){
	repository.get(category, function(err, category){
		if (err || !category.length) {
			callback({
				data: [],
				type: err ? "failed" : "success" ,
				hint: err ? "error" : "Data not found",
				responseCode: err ? 500 : 200
			})
		} else{
			getProductObject(category, function(updatedCategory){
				callback(updatedCategory)
			})
		}
	});
}

function getProductObject(categoryObject, callback){
	let productArr = categoryObject[0].product;
	let productArrObject = [];
	for(var i=0; i<productArr.length; i++){
	// console.log('categoryObject: ', productArr[i].id);
		let productId = {
			_id: productArr[i].id
		}
		productRepo.filter(productId, function(err, product){
			productArrObject.push(product[0]);
		})
		
	}
	console.log('productArrObject: ', productArrObject);
	callback({
		data: productArr,
		type: "success",
		hint: "All products according to category",
		responseCode: 200
	});
}

module.exports = {
	addCategory: addCategory,
	getByParent: getByParent,
	getAllProducts: getAllProducts
}