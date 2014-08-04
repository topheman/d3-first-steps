'use strict';

/**
 * @ngdoc overview
 * @name test1App
 * @description
 * # test1App
 *
 * Main module of the application.
 */
angular
  .module('d3AngularFirstSteps', [
    'ngAnimate',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    var routeResolver = {
      app : function(persistance){
        return persistance.init();
      }
    };
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve : routeResolver
      })
      .when('/pie/:channel', {
        templateUrl: 'views/pie.html',
        controller: 'PieCtrl',
        resolve : routeResolver
      })
      .otherwise({
        redirectTo: '/'
      });
  });
