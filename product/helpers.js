const repository = require('./repositories');

function addProduct(body, callback){
	// repository.get(body.name, function(err, product){
	// 	if (err || product.length) {
	// 		callback({
	// 			data: err ? [] : product,
	// 			type: err ? "error" : "success" ,
	// 			hint: err ? err : "Similar data found. Can't insert new data",
	// 			responseCode: err ? 500 : 200
	// 		})
	// 	} else if (!product.length) {
	// 		if (body.parent == body.name){
	// 			console.log('create parent product');
	// 			repository.create(body.name, function(err, product){
	// 				callback({
	// 					data: product,
	// 					type: "success",
	// 					hint: "Parent product Inserted.",
	// 					responseCode: 201
	// 				});
	// 			})
	// 		} else {
	// 			getByParent(body.parent, function(callback2){
	// 				if (callback2.data){
	// 					createAndUpdate(callback2.data[0]._id, body.name, function(callback3){
	// 						console.log('created: ', callback3);
	// 						callback({
	// 							data: callback3,
	// 							type: "success",
	// 							hint: "New Entity Inserted.",
	// 							responseCode: 201
	// 						});
	// 					})
	// 				} else{
	// 					callback({
	// 						data: [],
	// 						type: "failed",
	// 						hint: "Parent product not exist",
	// 						responseCode: 422
	// 					})
	// 				}
	// 			})
	// 		}				
	// 	}
	// });	
}

function createAndUpdate(parentId, name, callback){
	repository.create(name, function(err, product){
		repository.update(parentId, product, function(err, product){
		});
		callback(product);
	});
}

function getByParent(name, callback) {
	// repository.get(name, function(err, product){
	// 	if (err || !product.length) {
	// 		callback({
	// 			data: err ? "data not found" : [],
	// 			type: err ? "error" : "success" ,
	// 			hint: err ? err : "Data not found",
	// 			responseCode: err ? 500 : 200
	// 		})
	// 	} else{
	// 		callback({
	// 			data: product,
	// 			type: "success",
	// 			hint: "Data found",
	// 			responseCode: 200
	// 		});
	// 	}
	// })
}

module.exports = {
	addProduct: addProduct,
	getByParent: getByParent
}