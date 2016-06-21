'use strict';

/**
 * @ngdoc overview
 * @name testApp
 * @description
 * # testApp
 *
 * Main module of the application.
 */
angular
  .module('cookbook', [
    'cookbook.controllers',
    'cookbook.services',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function($routeProvider) {
 $routeProvider

 // route for the home page
 .when('/home', {
   templateUrl : 'views/home.html',
   controller  : 'HomeCtrl'
 })

 // route for the recipes page
 .when('/recipes', {
   templateUrl : 'views/recipes.html',
   controller  : 'RecipesCtrl'
 })

 // route for the add page
 .when('/add', {
   templateUrl : 'views/add.html',
   controller  : 'AddCtrl'
 })

 .otherwise({
   redirectTo: '/home',
   templateUrl: 'views/home.html',
   controller: 'HomeCtrl'
 });
});
