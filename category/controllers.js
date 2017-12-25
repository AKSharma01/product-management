const helpers = require('./helpers')

function createCategory(req, res){
	helpers.addCategory(req.body, function(callback){
		res.status(callback.responseCode);
		res.json(callback);
	});
}

function getCategory(req, res) {
	let categoryName = req.params.category;
	helpers.getByParent(categoryName, function(callback){
		res.status(callback.responseCode);
		res.json(callback);
	});
}

module.exports = {
	createCategory: createCategory,
	getCategory: getCategory
}