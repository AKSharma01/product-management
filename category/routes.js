const express = require('express');
const controllers = require('./controllers')

let routes = express.Router();

routes.get('/', controllers.getCategory);

routes.post('/', controllers.createCategory);

module.exports = routes;