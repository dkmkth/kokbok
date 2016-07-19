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
  $scope.open = function (_recipe, size) {

    var modalInstance = $uibModal.open({
      controller: "ModalInstanceCtrl",
      templateUrl: 'myModalContent.html',
      size: size,
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

  $scope.howTo = {
    "name": "Skriv in namnet på din rätt ba",
    "count": "Hur många ingredienser har du använt",
    "description": "Beskriv hur man tillagar rätten",
    "tags": "Vad ska man kunna söka på och hitta rätten, ange taggar kommaseparerade"
  }

  $scope.range = function(n) {
    return new Array(n);
  };

  $scope.addRecipe = function(dishName, description, tags) {
    if ($scope.ingredients.length == 0) {
      return;
    }
    recipeFactory.add(dishName, $scope.ingredients, $scope.amounts, description, tags);
  }
})

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, recipe, recipeFactory) {
  $scope.recipe = recipe;

  $scope.getTags = function(tags) {
    return tags.join(", ");
  };

  $scope.addComment = function(name, comment) {
    recipeFactory.addComment($scope.recipe, name, comment);
  }

  $scope.addReply = function(currentComment, name, reply) {
    console.log(currentComment);
    recipeFactory.addReply($scope.recipe, currentComment, name, reply);
  }
});
