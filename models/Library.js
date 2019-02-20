const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const librarySchema = new Schema({
  name: String,
  floors: [
    {
      name: String,
      access_points: [String],
    },
  ],
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
