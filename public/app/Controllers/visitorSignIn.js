(function() {
  'use strict'

  app.controller('visitorSignIn', ["$scope", "$rootScope", "$http", "$location",
    function($scope, $rootScope, $http, $location) {
    	console.log("I see admin visitor sign in controller!")

      //*****************VISITOR SIGN IN FORM FUNCTIONALITY*************

      // #### PAST VISITOR SEARCH ###
      // get array of visitor objects from adminObj, which stored on rootScope on module.run:
      
      $scope.pastVisitors = $rootScope.adminObj.visitors

      //on click of 'Sign In' button, search through past visitors to see if current visitor is in the db:
      $scope.findVisitor = function() {
        console.log("you clicked find visitor!");
        $("#noMatchModal").modal("show");
      }

      //modal submission: create new visitor object to be saved
      $scope.createNewVisitor = function() {
        var newVisitor = {
          "visitorEmail": $scope.email,
          "visitorFirstName": $scope.firstName,
          "visitorLastName": $scope.lastName,
        }
        //add new visitor object as sub document to adminObj
        $http.post('/adminObj/visitors', newVisitor, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
      }

      //on click of 'other' group, enable user to enter and save new group:
      $scope.enterNewGroupName = function() {
        console.log("you clicked on OTHER!");
        console.log("$scope.group", $scope.group);
        $("#createNewGroupModal").modal('show');
      }



  }]);
})()
