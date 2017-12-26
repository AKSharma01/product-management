const helpers = require('./helpers')

function createCategory(req, res){
	helpers.addCategory(req.body, function(category){
		res.status(category.responseCode);
		res.json(category);
	});
}

function getCategory(req, res) {
	let categoryName = req.params.category;
	helpers.getByParent(categoryName, function(category){
		res.status(category.responseCode);
		res.json(category);
	});
}

function getProducts(req, res){
	let category = req.params.category;
	helpers.getAllProducts(category, function(category){
		res.status(category.responseCode);
		res.json(category);
	})
}

module.exports = {
	createCategory: createCategory,
	getCategory: getCategory,
	getProducts: getProducts
}