angular.module('cookbook.services', [])


.factory('recipeFactory', function() {
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
    get: function() {
      return recipes;
    },

    //Adds a recipe to the recipes JSON
    add: function(name, ingredients, amounts, description, tags) {
      var newRecipe = {"Namn": name,
      "Ingredients": [
      ],
      "Description": description,
      "Tags": tags,
      "Comments": []};
      for (var i = 0; i < ingredients.length; i++) {
        var newIngredient = {"Namn": ingredients[i], "Mängd": amounts[i]};
        newRecipe.Ingredients[i] = newIngredient;
      }
      recipes[recipes.length] = newRecipe;
    },

    comments: function(currentRecipe) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].Namn == currentRecipe.Namn) {
          return recipes[i].Comments.length;
        }
      }
      return 0;
    },

    addComment: function(currentRecipe, name, comment) {
      var newComment = {"Poster": name, "Comment": comment, "Replies": []};
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].Namn == currentRecipe.Namn) {
          var comments = recipes[i].Comments;
          comments.unshift(newComment);
          recipes[i].Comments = comments;
          return;
        }
      }
    },

    addReply: function(currentRecipe, currentComment, name, reply) {
      var newReply = {"Poster": name, "Comment": reply};
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].Namn == currentRecipe.Namn) {
          var comments = recipes[i].Comments;
          for (var j = 0; j < comments.length; j++) {
            if (comments[j] == currentComment) {
              var replies = comments[j].Replies;
              replies.unshift(newReply);
              comments[j].Replies = replies;
              recipes[i].Comments = comments;
              return;
            }
          }
        }
      }
    }

  };

});
