const helpers = require('./helpers')

function createCategory(req, res){
	let data = '';
	try{
		helpers.addCategory(req.body, function(callback){
			// console.log('result: ', callback);
			let data = {
				id: callback._id
			}
			res.json(data);
		});
	} catch(err){
		console.log('err', err);
		res.json({
			err: str(err)
		});
		res.status =  500;
	}
	// res.json(data);
}

function getCategory(req, res) {
	let data = '';
	try{
		data = helpers.getByParent();
	} catch(err) {
		res.json({
			error: err
		});
	}
	console.log('data: ', data);
	res.json(data);
}

module.exports = {
	createCategory: createCategory,
	getCategory: getCategory
}