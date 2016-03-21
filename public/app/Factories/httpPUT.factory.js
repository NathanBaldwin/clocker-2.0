(function() {
  'use strict'
  app.factory('httpPUT', ["$http", "$q",
    function($http, $q) {

      return function(route, dataToSave) {
        var deferred = $q.defer()
        console.log("FIRED PUT");
        $http.put(route, dataToSave)
          .success(function(retunedData) {
            console.log(`Successful PUT request from ${route}:`, retunedData);
            deferred.resolve(retunedData)
          })
        .error(function(error, status) {
          console.log("status:", status)
          console.log(`!ERROR ERROR! from put to ${route}`, error)
          deferred.reject(error)  
        })
        return deferred.promise
      }
    }
  ])

})()
