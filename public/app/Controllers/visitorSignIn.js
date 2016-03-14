(function() {
  'use strict'

  app.controller('visitorSignIn', ["$scope", "$rootScope", "$http", "$location",
    function($scope, $rootScope, $http, $location) {
    	console.log("I see admin visitor sign in controller!")

      //*****************VISITOR SIGN IN FORM FUNCTIONALITY*************

      // #### PAST VISITOR SEARCH ###
      console.log("adminObj:", $rootScope.adminObj);
      // get array of visitor objects from adminObj, which stored on rootScope on module.run:
      console.log("pastVisitors:", $rootScope.pastVisitors);
      $scope.pastVisitors = $rootScope.pastVisitors

      //on click of 'Sign In' button, search through past visitors to see if current visitor is in the db:
      $scope.findVisitor = function() {
        console.log("you clicked find visitor!");
        $("#noMatchModal").modal("show");
      }

      $scope.createNewVisitor = function() {

        var newVisitor = {
          "visitorEmail": $scope.email,
          "visitorFirstName": $scope.firstName,
          "visitorLastName": $scope.lastName,
        }

        $http.post('/adminObj/visitors', newVisitor, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
      }



  }]);
})()
