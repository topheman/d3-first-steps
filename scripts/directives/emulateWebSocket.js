'use strict';

angular.module('d3AngularFirstSteps')
        .directive('emulateWebSocket',function(persistance){
          return {
            template:'<button ng-click="toggle()"><span ng-show="data.running">Stop</span><span ng-show="!data.running">Start</span> fake data update</button>',
            restrict:'E',
            scope : {
              data : '='
            },
            link: function(scope, element, attr){
              scope.toggle = function(){
                console.log('toggle');
                if(scope.data.running){
                  persistance.stop();
                }
                else if (!scope.data.running){
                  persistance.start();
                }
              };
            }
          };
        });