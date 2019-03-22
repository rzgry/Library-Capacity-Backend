const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO: Add library hours / other misc library data that can be useful to app
const librarySchema = new Schema({
  name: String,
});

const Library = mongoose.model('libraries', librarySchema);

module.exports = Library;
