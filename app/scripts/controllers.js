angular.module('cookbook.controllers', ['cookbook.services'])

.controller('MainCtrl', function($scope, $location) {
  $scope.isActive = function(route) {
        return route === $location.path();
    };
})

.controller('HomeCtrl', function($scope) {
  $scope.foo = "Homecontroller";
})

.controller('RecipesCtrl', function($scope, recipeFactory) {
  $scope.foo = "Recipescontroller";

  $scope.recipes = recipeFactory.get();
})

.controller('AddCtrl', function($scope, recipeFactory) {
  $scope.foo = "Addcontroller";

  $scope.ingredients = [];
  $scope.amounts = [];

  $scope.range = function(n) {
      return new Array(n);
    };

  $scope.addRecipe = function(dishName) {
    console.log("AddCtrl - Calling addRecipe with ", $scope.ingredients, $scope.amounts);
    recipeFactory.add(dishName, $scope.ingredients, $scope.amounts)
  }
})
