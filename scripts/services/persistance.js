angular.module('d3AngularFirstSteps')
        .service('persistance', function($q, $http, $timeout) {

          var isInit = false;

          var _data = {
            count: 0,
            channels: {},
            keywords: {},
            channelsDescription: [],
            running : false
          };
          
          var currentTimer = null;

          var init = function() {

            var deferred = $q.defer();
            
            if(isInit === true){
              deferred.resolve(isInit);
            }
            else{
              $http({
                method: 'GET',
                url: './data/data.persistance.json',
                cache: true
              })
                      .success(function(data) {
                        _data.count = data.count;
                        _data.channels = data.channels;
                        _data.keywords = data.keywords;
                        _data.channelsDescription = data.channelsDescription;
                        isInit = true;
                        deferred.resolve(isInit);
                      })
                      .error(function() {
                        deferred.reject(isInit);
                      });
            }
            return deferred.promise;
            
          };
          
          /**
           * Returns a pointer to the data which can be binded/watched
           */
          var getData = function(){
            return _data;
          };
          
          var random = function(num){
            return Math.random() > 0.5 ? num : 0;
          };
          
          var updateData = function(){
            if(_data.running === true){
              _data.count+=2;
              for(var channelId in _data.channels){
                _data.channels[channelId].count+=2;
                for(var keyword in _data.channels[channelId].keywords){
                  _data.channels[channelId].keywords[keyword].count+=random(1);
                }
              }
              return $timeout(updateData,800);
            }
            return null;
          };
          
          var start = function(){
            _data.running = true;
            currentTimer = updateData();
          };
          
          var stop = function(){
            _data.running = false;
            $timeout.cancel(currentTimer);
          };
          
          return {
            init : init,
            getData : getData,
            start : start,
            stop: stop
          };

        });