angular.module('cookbook.controllers', ['cookbook.services'])

.controller('MainCtrl', function($scope, $location) {
  $scope.isActive = function(route) {
    if(route === $location.path()) {
      return "on";
    } else {
      return "off";
    }
  };
})

.controller('HomeCtrl', function($scope) {
  $scope.foo = "Homecontroller";
})

.controller('RecipesCtrl', function($scope, recipeFactory, $timeout, $uibModal, $log) {
  $scope.foo = "Recipescontroller";

  $scope.recipes = recipeFactory.get();


  // MODAL WINDOW
  $scope.open = function (_recipe) {

    var modalInstance = $uibModal.open({
      controller: "ModalInstanceCtrl",
      templateUrl: 'myModalContent.html',
      resolve: {
        recipe: function()
        {
          return _recipe;
        }
      }
    });
  };
})

.controller('AddCtrl', function($scope, recipeFactory) {
  $scope.foo = "Addcontroller";

  $scope.ingredients = [];
  $scope.amounts = [];

  $scope.range = function(n) {
    return new Array(n);
  };

  $scope.addRecipe = function(dishName) {
    if ($scope.ingredients.length == 0) {
      return;
    }
    recipeFactory.add(dishName, $scope.ingredients, $scope.amounts);
  }
})

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, recipe)
{
  $scope.recipe = recipe;
});
