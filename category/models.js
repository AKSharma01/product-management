const mongoose = require('mongoose');
const mongoConnection = require('../setting');

var CategorySchema = new mongoose.Schema({
  child_category: [],
  product: [],
  name: {
    type: String,
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

module.exports = mongoose.model('category', CategorySchema);
