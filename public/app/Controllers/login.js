(function() {

  /// this module allows the user to log in/register with email and password for the website ///
  app.controller('login', ["$scope", "$location", "$rootScope", "$http", "query", "socket",
    function($scope, $location, $rootScope, $http, $query, socket) {
    	console.log("I see login!!")

      $scope.$on('$destroy', function (event) {
        console.log("FIRED DESTROY - login");
        socket.removeAllListeners()
      })

      $scope.login = function() {
        var credentials = {
          email: $scope.email,
          password: $scope.password,
          adminLogin: true
        }

        $http.post('/login', credentials)
          .success(function(uid) {
            console.log("user info returned:", uid);
            $rootScope.uid = uid
            $rootScope.refreshIndicator = true //each time visitor and backend controllers load
            //we'll check this variable. If false, we'll make a query to db to refresh data stored
            //on $rootScope
            $rootScope.userData = {}

            $query.getAllUserData()
              .then(function(userData) {
                console.log("all returned user data:", userData);
                $rootScope.userData = userData
                $location.path('/visitorsignin')
                socket.emit('join', {
                    adminId: $rootScope.userData.adminId,
                    orgName: $rootScope.userData.adminObj.orgName
                  })
                // socket.connect()
              })
            })
          .error(function(error, status) {
            console.log("status:", status)
            $location.path('/login')
            $scope.error_message = error
          })

          
      }
  }])
})()

