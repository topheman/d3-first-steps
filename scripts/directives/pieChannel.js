'use strict';

angular.module('d3AngularFirstSteps')
        .directive('pieChannel', function($window,$compile) {
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

              var colorScale = d3.scale.category10();

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
                console.log('render');
                var d3Data = [];
                for(var keyword in channelKeywords){
                  d3Data.push({name : keyword, count : channelKeywords[keyword].count});
                }
                
//                group.selectAll('.arc text').remove();
                
                var arcs = group.selectAll('.arc')
                        .data(pie(d3Data));
                
                arcs.exit().remove();
                
                var g = arcs.enter()
                        .append('g')
                        .attr('class', 'arc')
                        .each(function(d){
                          console.log('1>g.each');
                          d3.select(this).append('path');
                          d3.select(this).append('text');
                        });
                  
//                arcs.each(function(d){
//                          console.log('1>g.each');
//                          d3.select(this).append('path');
//                          d3.select(this).append('text');
//                        });
                
                arcs.selectAll('g path')
                        .attr('d', arc)
                        .attr('fill', function(d) {
                          console.log('2>g.each - update color');
                          return colorScale(d.data.name);
                        });
                arcs.selectAll('g text')
                        .attr('transform', function(d) {
                          console.log('2>g.each - update text');
                          return 'translate(' + arc.centroid(d) + ')';
                        })
                        .text(function(d) {
                          return d.data.name + '(' + d.data.count + ')';
                        });
              };

              scope.$watch('channel.keywords', function() {
                scope.render(scope.channel.keywords);
              }, true);

            }
          };
        });