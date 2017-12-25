const express = require('express');
const controllers = require('./controllers')

let routes = express.Router();

routes.get('/', controllers.getProduct);

routes.post('/', controllers.createProduct);

module.exports = routes;