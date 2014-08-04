'use strict';

angular.module('d3AngularFirstSteps')
  .controller('HeaderCtrl', function ($scope) {
    $scope.menu = [
      {text: "Home", link:"#/"},
      {text: "Pie", link:"#/pie/0"}
    ];
  });
