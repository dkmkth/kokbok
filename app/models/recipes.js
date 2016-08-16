var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  name: String,
  ingredients: [{name: String, amount: String}],
  description: String,
  tags: [String],
  comments: [{poster: String,
              comment: String,
              replies: [{poster: String,
                         reply: String}]}],
  date: Date
});

module.exports = mongoose.model('Recipe', RecipeSchema);
