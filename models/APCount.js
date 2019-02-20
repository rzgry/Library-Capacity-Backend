const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apCountSchema = new Schema({
  ap_name: String,
  count: Number,
  time: Date,
  library_name: String,
  floor_name: String,
});

const APCount = mongoose.model('APCount', apCountSchema);

module.exports = APCount;
