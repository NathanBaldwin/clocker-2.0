(function() {
  'use strict'
  app.factory('httpPOST', ["$http", "$q",
    function($http, $q) {

      return function(route, dataToSave) {
        var deferred = $q.defer()
        console.log("FIRED POST");
        $http.post(route, dataToSave)
          .success(function(retunedData) {
            console.log(`Successful POST request from ${route}:`, retunedData);
            deferred.resolve(retunedData)
          })
        .error(function(error, status) {
          console.log("status:", status)
          console.log(`!ERROR ERROR! from post to ${route}`, error)
          deferred.reject(error)  
        })
        return deferred.promise
      }
    }
  ])

})()
