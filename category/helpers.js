const repository = require('./repositories');

function addCategory(body, callback){
	repository.get(body.name, function(err, category){
		if (err || category.length) {
			callback({
				data: err ? [] : category,
				type: err ? "error" : "success" ,
				hint: err ? err : "Similar data found. Can't insert new data",
				responseCode: err ? 500 : 200
			})
		} else if (!category.length) {
			if (body.parent == body.name){
				console.log('create parent category');
				repository.create(body.name, function(err, category){
					callback({
						data: category,
						type: "success",
						hint: "Parent Category Inserted.",
						responseCode: 201
					});
				})
			} else {
				getByParent(body.parent, function(callback2){
					if (callback2.data){
						createAndUpdate(callback2.data[0]._id, body.name, function(callback3){
							console.log('created: ', callback3);
							callback({
								data: callback3,
								type: "success",
								hint: "New Entity Inserted.",
								responseCode: 201
							});
						})
					} else{
						callback({
							data: [],
							type: "failed",
							hint: "Parent category not exist",
							responseCode: 422
						})
					}
				})
			}				
		}
	});	
}

function createAndUpdate(parentId, name, callback){
	repository.create(name, function(err, category){
		repository.updateChildCategory(parentId, category, function(err, category){
		});
		callback(category);
	});
}

function getByParent(name, callback) {
	repository.get(name, function(err, category){
		if (err || !category.length) {
			callback({
				data: err ? "data not found" : [],
				type: err ? "error" : "success" ,
				hint: err ? err : "Data not found",
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

module.exports = {
	addCategory: addCategory,
	getByParent: getByParent
}