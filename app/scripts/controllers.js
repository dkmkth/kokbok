angular.module('cookbook.controllers', ['cookbook.services'])

.controller('MainCtrl', function($scope, $location) {
  $scope.isActive = function(route) {
        return route === $location.path();
    };

  // Default value when user is at home-screen
  var active = 0;

  // Update active tab
  $scope.updateActive = function(tab) {
    active = tab;
  }

  // Return on if tab is active
  $scope.activeTab = function(tab) {
    if (tab == active) {
      return "on";
    } else {
      return "off";
    }
  }

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
