const express = require('express');
const controllers = require('./controllers')

let routes = express.Router();

routes.get('/:parent', function(req, res) {
	let parent = req.params.parent;
	try{
		console.log('controllers: ', controllers.getByParent(parent));
	} catch(err) {
		res.send('err: ', err);
	}
	res.send('Success');
});

module.exports = routes;