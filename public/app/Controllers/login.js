(function() {

  /// this module allows the user to log in/register with email and password for the website ///
  app.controller('login', ["$scope", "$location", "$rootScope", "$http",
    function($scope, $location, $rootScope, $http) {
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
          $location.path('/visitorsignin')
        })
        .error(function(error) {
          $scope.error_message = error
        })
      }
  }])
})()
