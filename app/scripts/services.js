angular.module('cookbook.services', [])


.factory('recipeFactory', function() {
  var recipes = [
    {"Namn": "Recept 1",
     "Ingredienser": [
       {"Namn": "Mjöl", "Mängd": "2 dl"},
       {"Namn": "Vatten", "Mängd": "2 ml"},
     ],
      "Description": "Rör om",
      "Tags": ["asd", "aa", "p"]},
     {"Namn": "Recept 2",
      "Ingredienser": [
        {"Namn": "Botten", "Mängd": "670 dl"},
        {"Namn": "Topping", "Mängd": "2 liter"},
      ],
       "Description": "Lägg på Topping",
       "Tags": ["asd", "aa", "p"]},
      {"Namn": "Ägg",
       "Ingredienser": [
         {"Namn": "Äggvita", "Mängd": "670 dl"},
         {"Namn": "Äggula", "Mängd": "2 liter"},
         {"Namn": "Skal", "Mängd": "78 liter"},
       ],
        "Description": "Svårt detta",
        "Tags": ["asd", "aa", "p"]},
       {"Namn": "Frukost",
        "Ingredienser": [
          {"Namn": "Yoghurt", "Mängd": "3 dl"},
          {"Namn": "Flingor", "Mängd": "50 g"},
        ],
         "Description": "Häll i Flingor",
         "Tags": ["asd", "aa", "p"]},
        {"Namn": "Macka",
         "Ingredienser": [
           {"Namn": "Bröd", "Mängd": "1 st"},
           {"Namn": "Smör", "Mängd": "1 paket"},
         ],
          "Description": "Bre på smör",
          "Tags": ["asd", "aa", "p"]},
  ];


  return {

    //Returns the recipes JSON
    get: function() {
      return recipes;
    },

    //Adds a recipe to the recipes JSON
    add: function(name, ingredients, amounts, description, tags) {
      var newRecipe = {"Namn": name,
       "Ingredienser": [
       ],
        "Description": description,
        "Tags": tags};
       for (var i = 0; i < ingredients.length; i++) {
         var newIngredient = {"Namn": ingredients[i], "Mängd": amounts[i]};
         newRecipe.Ingredienser[i] = newIngredient;
       }
       recipes[recipes.length] = newRecipe;
    }

  };

});
