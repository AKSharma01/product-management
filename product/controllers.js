const helpers = require('./helpers')

function createProduct(req, res){
	// helpers.addProduct(req.body, function(callback){
	// 	res.status(callback.responseCode);
	// 	res.json(callback);
	// });
}

function getProduct(req, res) {
	// let productName = req.params.category;
	// helpers.getByParent(productName, function(callback){
	// 	res.status(callback.responseCode);
	// 	res.json(callback);
	// });
}

module.exports = {
	createProduct: createProduct,
	getProduct: getProduct
}