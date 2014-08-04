'use strict';

angular.module('d3AngularFirstSteps')
  .controller('PieCtrl', function ($scope, persistance, $routeParams) {
    $scope.data = persistance.getData();
    $scope.channelsDescription = persistance.getData().channelsDescription;
    $scope.channel = persistance.getData().channels[$routeParams.channel];
  });
