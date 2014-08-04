'use strict';

angular.module('d3AngularFirstSteps')
        .directive('pieChannel', function($window) {
          return {
            templateUrl: './views/templates/pieChannel.html',
            restrict: 'E',
            scope: {
              channel: '='
            },
            link: function(scope, element, attr) {

              var padding = {top: 20, right: 20, bottom: 20, left: 20};
              var width = typeof attr.width !== 'undefined' ? parseInt(attr.width) : 500;
              var height = typeof attr.height !== 'undefined' ? parseInt(attr.height) : 500;
              var radius = 200;

              var d3 = $window.d3;
              var svg = d3.select(element[0]).append('svg')
                      .attr('width', width)
                      .attr('height', height);

              var colorScale = d3.scale.category10()
//                      .range(['blue', 'red', 'yellow', 'orange', 'green', 'purple']);

              var group = svg.append('g')
                      .attr('class', 'pie')
                      .attr('transform', 'translate(250,250)');

              var arc = d3.svg.arc()
                      .innerRadius(50)
                      .outerRadius(radius);

              var pie = d3.layout.pie()
                      .value(function(d) {
                        return d.count;
                      });

              scope.render = function(channelKeywords) {
                
                var d3Data = [];
                console.log(channelKeywords);
                for(var keyword in channelKeywords){
                  d3Data.push({name : keyword, count : channelKeywords[keyword].count});
                }
                console.log(d3Data);

                var arcs = group.selectAll('.arc')
                        .data(pie(d3Data))
                        .enter()
                        .append('g')
                        .attr('class', 'arc');

                arcs.append('path')
                        .attr('d', arc)
                        .attr('fill', function(d) {
                          return colorScale(d.data.count);
                        });

                arcs.append('text')
                        .attr('transform', function(d) {
                          return 'translate(' + arc.centroid(d) + ')'
                        })
                        .text(function(d) {
                          return d.data.name + '(' + d.data.count + ')'
                        });
              };

              scope.$watch('channel.keywords', function() {
                console.log('render');
                scope.render(scope.channel.keywords);
              }, true);

            }
          };
        });