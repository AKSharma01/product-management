const mongoose = require('mongoose');
// mongodb connection using mongoose
mongoose.connect('mongodb://127.0.0.1/product_management');
mongoose.Promise = global.Promise;

module.exports = mongoose;