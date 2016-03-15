(function() {
  'use strict'
  app.factory('httpGET', ["$http", "$q",
    function($http, $q) {

      return function(route) {
        var deferred = $q.defer()
        console.log("FIRED QUERY");
        $http.get(route)
          .success(function(data) {
            console.log(`Successful GET request from ${route}:`, data);
            deferred.resolve(data)
          })
        .error(function(error, status) {
          console.log("status:", status)
          console.log(`!ERROR ERROR! from ${route}`, error)
          deferred.reject(error)  
        })
        return deferred.promise
      }
    }
  ])

})()
