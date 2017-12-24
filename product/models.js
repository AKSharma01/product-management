const mongoose = require('mongoose');
// const mongoConnection = require('../setting');

var ProductSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },
  prod_price: {
  	type: Number,
  	required: true
  },
  created_at: {
  	type: Date,
  	default: Date.now
  },
  updated_at: { 
  	type: Date, 
  	default: Date.now 
  },
});

module.exports = mongoose.model('Product', ProductSchema);