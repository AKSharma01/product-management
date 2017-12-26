const mongoose = require('mongoose');
const mongoConnection = require('../setting');

var ProductSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },
  price: {
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
  category: []
});

module.exports = mongoose.model('product', ProductSchema);