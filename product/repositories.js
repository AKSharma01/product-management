const product = require('./models');

function get(name, callback){
	product.find({
		name: name
	}, callback);
}

function filter(filterKey, callback){
	product.find(filterKey, callback);
}

function create(body, callback){
	product.create({
		name: body.name,
		price: body.price,
		category: [{
			id: body.category.id,
			name: body.category.name
		}]
	}, callback);
}

function update(parentId, categoryObj, callback){
	let category = {
		id: categoryObj._id,
		name: categoryObj.name
	}
	product.findOneAndUpdate({
		"_id": parentId
	},{
		"$push": { 
			"category": category
		}
	}, callback);
}

function filterUpdate(filterKeys, updateWith, callback){
	product.findOneAndUpdate(filterKeys, updateWith, callback);
}

module.exports = {
	get: get,
	create: create,
	update: update,
	filter: filter,
	filterUpdate: filterUpdate
}