const category = require('./models');

function get(callback, limit){
	category.find(callback).limit(limit);
}

function create(data, callback){
	category.create(data, callback);
}

module.exports = {
	get: get,
	create: create
}