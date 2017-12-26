const category = require('./models');

function get(name, callback){
	category.find({
		name: name
	}, callback);
}

function create(name, callback){
	category.create({
		name: name
	}, callback);
}

function updateByCategory(parentId, categoryObj, callback){
	let childCategory = {
		categoryId: categoryObj._id,
		category_name: categoryObj.name
	}
	category.findOneAndUpdate({
		"_id": parentId
	},{
		"$push": { 
			"child_category": childCategory
		}
	}, callback);
}

function updateByProduct(parentId, productObj, callback){
	let product = {
		name: productObj.name,
		id: productObj.id
	}
	category.findOneAndUpdate({
		"_id": parentId
	},{
		"$push": {
			"product": product
		}
	}, callback);
}

module.exports = {
	get: get,
	create: create,
	updateByCategory: updateByCategory,
	updateByProduct: updateByProduct
}