'use strict';

angular.module('d3AngularFirstSteps')
  .controller('MainCtrl', function ($scope, persistance) {
    $scope.data = persistance.getData();
  });
