(function() {

  /// this module allows the user to log in/register with email and password for the website ///
  app.controller('login', ["$scope", "$location", "$rootScope", "$http", "query",
    function($scope, $location, $rootScope, $http, $query) {
    	console.log("I see login!!")

      $scope.login = function() {
        var credentials = {
          email: $scope.email,
          password: $scope.password
        }

        $http.post('/login', credentials)
          .success(function(uid) {
            console.log("user info returned:", uid);
            $rootScope.uid = uid
            $rootScope.refreshIndicator = true //each time visitor and backend controllers load
            //we'll check this variable. If false, we'll make a query to db to refresh data stored
            //on $rootScope
            $rootScope.adminObj = {}
            $location.path('/visitorsignin')

            $query.getUserObj()
              .then(function(adminObj) {
              console.log("DATA RETURNED FROM PROMISE:", adminObj)
              $rootScope.adminObj = adminObj
            })
           

            //on success of login, get data for user and store to $rootScope
            //check to see what happens to rootscope on refresh
            
         })
          .error(function(error, status) {
            console.log("status:", status)
            $location.path('/login')
            $scope.error_message = error
          })
      }
  }])
})()
