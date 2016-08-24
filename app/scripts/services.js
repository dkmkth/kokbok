angular.module('cookbook.services', [])


.factory('recipeFactory', function($http) {

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

    //Adds a comment to recipe with id recipe_id
    addComment: function(recipe_id, name, comment, success, error) {
      $http({
        method  : 'PUT',
        url     : 'http://localhost:8080/api/recipes/comment/' + recipe_id,
        headers : { 'Content-Type': 'application/json' },
        data    :  {
          name: name,
          comment: comment
        }
      }).then(success, error);
    },

    //Adds a reply to comment with comment_id to the recipe with id recipe_id
    addReply: function(recipe_id, comment_id, name, reply, success, error) {
      $http({
        method  : 'PUT',
        url     : 'http://localhost:8080/api/recipes/' + recipe_id + '/' +  comment_id,
        headers : { 'Content-Type': 'application/json' },
        data    :  {
          name: name,
          reply: reply
        }
      }).then(success, error)
    },

    //Returns requested recipe
    getRecipe: function(id, success, error) {
      $http.get('http://localhost:8080/api/recipes/' + id).then(success, error);
    }

  };

});
