var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  id: String,
  author: String,
  name:String,
  gitUrl:String,
  description: String,
  published_year: { type: Number, min: 1945, max: 2019 },
  publisher: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);