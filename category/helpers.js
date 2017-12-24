const repository = require('./repositories');

function addCategory(body, callback){
	repository.create(body, function(err, category){
		if (err) {
			throw err
		}
		callback(category);
	});
}

function getByParent() {
	return repository.get(function(err, category){
		if (err) {
			throw err
		}
		return category
	})
}

module.exports = {
	addCategory: addCategory,
	getByParent: getByParent
}