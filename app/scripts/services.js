angular.module('cookbook.services', [])


.factory('recipeFactory', function() {
  var recipes = [
    {"Namn": "Recept 1",
     "Ingredienser": [
       {"Namn": "Mjöl", "Mängd": "2 dl"},
       {"Namn": "Vatten", "Mängd": "2 ml"},
     ]},
     {"Namn": "Recept 2",
      "Ingredienser": [
        {"Namn": "Botten", "Mängd": "670 dl"},
        {"Namn": "Topping", "Mängd": "2 liter"},
      ]},
      {"Namn": "Ägg",
       "Ingredienser": [
         {"Namn": "Äggvita", "Mängd": "670 dl"},
         {"Namn": "Äggula", "Mängd": "2 liter"},
         {"Namn": "Skal", "Mängd": "78 liter"},
       ]},
       {"Namn": "Frukost",
        "Ingredienser": [
          {"Namn": "Yoghurt", "Mängd": "3 dl"},
          {"Namn": "Flingor", "Mängd": "50 g"},
        ]},
        {"Namn": "Macka",
         "Ingredienser": [
           {"Namn": "Bröd", "Mängd": "1 st"},
           {"Namn": "Smör", "Mängd": "1 paket"},
         ]},
  ];


  return {

    //Returns the recipes JSON
    get: function() {
      return recipes;
    },

    //Adds a recipe to the recipes JSON
    add: function(name, ingredients, amounts) {
      console.log("recipeFactory - Calling add with recipes as", JSON.stringify(recipes))
      var newRecipe = {"Namn": name,
       "Ingredienser": [
       ]};
       for (var i = 0; i < ingredients.length; i++) {
         console.log("First for loop - ", i);
         var newIngredient = {"Namn": ingredients[i], "Mängd": amounts[i]};
         newRecipe.Ingredienser[i] = newIngredient;
       }
       recipes[recipes.length] = newRecipe;
       console.log("recipeFactory - Done with add with recipes as", JSON.stringify(recipes));
    }

  };

})
