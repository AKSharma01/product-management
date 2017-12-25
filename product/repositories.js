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

function update(parentId, categoryObj, callback){
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

module.exports = {
	get: get,
	create: create,
	update: update
}