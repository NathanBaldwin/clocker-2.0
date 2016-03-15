(function() {
  'use strict'
  app.factory('query', ["$http", "$log", "$q",
    function($http, $log, $q) {

      return {
        getUserObj: function() {
          var deferred = $q.defer()
          console.log("FIRED QUERY");
          $http.get('/adminObj')
            .success(function(data) {
              console.log("DATA FROM INITIAL ADMIN OBJ CALL:", data);
              deferred.resolve(data)
            })
          .error(function(error, status) {
            console.log("status:", status)
            console.log("error", error)
            deferred.reject(error)  
          })

          return deferred.promise
        }
        
      }
    }
  ])

})()
