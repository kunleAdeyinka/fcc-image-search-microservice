const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuerySchema = new Schema({
  search_term: String,
  created_at: Date,
}, {timestamp: true});

const ModelClass = mongoose.model('query', QuerySchema);

module.exports = ModelClass;
