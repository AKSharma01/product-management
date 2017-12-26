const helpers = require('./helpers')

function createProduct(req, res){
	helpers.addProduct(req.body, function(product){
		res.status(product.responseCode);
		res.json(product);
	});
}

function getProduct(req, res) {
	let productName = req.params.product;
	helpers.getByProduct(productName, function(product){
		res.status(product.responseCode);
		res.json(product);
	});
}

function modifyProduct(req, res) {
	let filterKey = req.body
	helpers.updateProduct(filterKey, function(product){
		res.status(product.responseCode);
		res.json(product);
	})
	// res.send(searchBy);
}

module.exports = {
	createProduct: createProduct,
	getProduct: getProduct,
	modifyProduct: modifyProduct
}