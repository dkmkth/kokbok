angular.module('cookbook.services', [])


.factory('recipeFactory', function($http) {
  var recipes = [
    {"Namn": "Recept 1",
    "Ingredients": [
      {"Namn": "Mjöl", "Mängd": "2 dl"},
      {"Namn": "Vatten", "Mängd": "2 ml"},
    ],
    "Description": "Rör om",
    "Tags": ["asd", "aa", "p"],
    "Comments": [
      {"Poster": "Emil",
      "Comment": "Det här var ju gott",
      "Replies": [{"Poster": "Paul", "Comment": "absolut inte"}, {"Poster": "Paul", "Comment": "absolut inte"}]},
      {"Poster": "Emil",
      "Comment": "Det här var ju gott",
      "Replies": [{"Poster": "Paul", "Comment": "absolut inte"}, {"Poster": "Paul", "Comment": "absolut inte"}]}
    ]},
    {"Namn": "Recept 2",
    "Ingredients": [
      {"Namn": "Botten", "Mängd": "670 dl"},
      {"Namn": "Topping", "Mängd": "2 liter"},
    ],
    "Description": "Lägg på Topping",
    "Tags": ["asd", "aa", "p"],
    "Comments": [
      {"Poster": "Emil",
      "Comment": "Det här var ju gott",
      "Replies": [{"Poster": "Malle", "Comment": "Fuck you"},]}
    ]},
    {"Namn": "Ägg",
    "Ingredients": [
      {"Namn": "Äggvita", "Mängd": "670 dl"},
      {"Namn": "Äggula", "Mängd": "2 liter"},
      {"Namn": "Skal", "Mängd": "78 liter"},
    ],
    "Description": "Svårt detta",
    "Tags": ["asd", "aa", "p"],
    "Comments": [
      {"Poster": "Emil",
      "Comment": "Det här var ju gott",
      "Replies": [{"Poster": "Aron", "Comment": "Nä"},]}
    ]},
    {"Namn": "Frukost",
    "Ingredients": [
      {"Namn": "Yoghurt", "Mängd": "3 dl"},
      {"Namn": "Flingor", "Mängd": "50 g"},
    ],
    "Description": "Häll i Flingor",
    "Tags": ["asd", "aa", "p"],
    "Comments": [
      {"Poster": "Emil",
      "Comment": "Det här var ju gott",
      "Replies": [{"Poster": "Helena", "Comment": "Ja"},]}
    ]},
    {"Namn": "Macka",
    "Ingredients": [
      {"Namn": "Bröd", "Mängd": "1 st"},
      {"Namn": "Smör", "Mängd": "1 paket"},
    ],
    "Description": "Bre på smör",
    "Tags": ["asd", "aa", "p"],
    "Comments": [
      {"Poster": "Emil",
      "Comment": "Det här var ju gott",
      "Replies": [{"Poster": "Jos-jos", "Comment": "Tycker inte jag"},]}
    ]},
  ];


  return {

    //Returns the recipes JSON
    get: function(success, error) {
      $http.get('http://localhost:8080/api/recipes').then(success, error);
    },

    //Adds a recipe to the recipes JSON
    add: function(name, ingredient, amount, description, tags, success, error) {
      var ingredients = [];
      for (var i = 0; i < ingredient.length; i++) {
        var newIngredient = {"name": ingredient[i], "amount": amount[i]};
        ingredients[i] = newIngredient;
      }
      $http({
        method  : 'POST',
        url     : 'http://localhost:8080/api/recipes',
        // set the headers so angular passing info as form data (not request payload)
        headers : { 'Content-Type': 'application/json' },
        data    :  {
          name: name,
          ingredients: ingredients,
          description: description,
          tags: tags,
          comments: [],
          date: Date.now()
        }
      }).then(success, error)
    },

    addComment: function(recipe_id, name, comment, success, error) {
      $http({
        method  : 'PUT',
        url     : 'http://localhost:8080/api/recipes/comment/' + recipe_id,
        // set the headers so angular passing info as form data (not request payload)
        headers : { 'Content-Type': 'application/json' },
        data    :  {
          name: name,
          comment: comment
        }
      }).then(success, error);
    },

    addReply: function(recipe_id, comment_id, name, reply, success, error) {
      $http({
        method  : 'PUT',
        url     : 'http://localhost:8080/api/recipes/' + recipe_id + '/' +  comment_id,
        // set the headers so angular passing info as form data (not request payload)
        headers : { 'Content-Type': 'application/json' },
        data    :  {
          name: name,
          reply: reply
        }
      }).then(success, error)
    },

    getRecipe: function(id, success, error) {
      $http.get('http://localhost:8080/api/recipes/' + id).then(success, error);
    }

  };

});
