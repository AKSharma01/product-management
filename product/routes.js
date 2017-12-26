const express = require('express');
const controllers = require('./controllers')

let routes = express.Router();

routes.get('/:product', controllers.getProduct);

routes.post('/', controllers.createProduct);

routes.put('/', controllers.modifyProduct);

module.exports = routes;