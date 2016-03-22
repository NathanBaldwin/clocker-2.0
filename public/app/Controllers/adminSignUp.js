(function(){
  'use strict'
  app.controller('adminSignUp', ["$scope", "$http", "$location", "$rootScope",
    function($scope, $http, $location, $rootScope) {
    	console.log("I see admin Sing Up!!");

    	$scope.createNewUser = function() {
        var adminFormData = {
          "orgName": $scope.orgName,
          "ownerFirstName": $scope.firstName,
          "ownerLastName": $scope.lastName,
          "email": $scope.email,
          "password": $scope.password,
          "verify": $scope.verifyPassword
        }

        $http.post('/registerAdmin', adminFormData)
        .success(function(user){       
          $location.path('/login');
        })
        .error(function(err){
          $scope.error_message = err;
        });
      }

    	
    
  }]);
})()
