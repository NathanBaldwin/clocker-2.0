(function() {
  'use strict'

  app.controller('visitorSignIn', ["$scope", "$rootScope", "$http", "$location", "query",
    function($scope, $rootScope, $http, $location, $query) {
    	console.log("I see admin visitor sign in controller!")

      //when controller loads, check to see if user data is on $rootScope
      //if user has refreshed the page, it won't be there so, we'll go to api to get it
      //if user is not logged in, api send 'error' response, which angular will handle with redirect
      //tabling redirect code for now
      if(!$rootScope.refreshIndicator) {
        getAdminData()
      } else {
        // get array of visitor objects from adminObj, which stored on rootScope on module.run:
        $scope.pastVisitors = $rootScope.adminObj.visitors
        $scope.groups = $rootScope.adminObj.groups    
      }
      //*****************VISITOR SIGN IN FORM FUNCTIONALITY*************


      function getAdminData() {
        $query.getUserObj()
          .then(function(adminObj) {
          console.log("DATA RETURNED FROM PROMISE:", adminObj)
          $rootScope.adminObj = adminObj
          $scope.pastVisitors = $rootScope.adminObj.visitors
          $scope.groups = $rootScope.adminObj.groups
        })
      }
      

      //on click of 'Sign In' button, search through past visitors to see if current visitor is in the db:
      $scope.findVisitor = function() {
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
      $scope.showGroupModal = function() {
        console.log("$scope.group", $scope.group);
        $("#createNewGroupModal").modal('show');
      }

      //on click of 'save' in modal, save group name to groups subdocument in adminObj
      $scope.createNewGroup = function() {
        var newGroup = {
          newGroupName: $scope.newGroupName
        }
        $rootScope.adminObj.groups.push($scope.newGroupName)
        $query.addGroup(newGroup)
        $("#createNewGroupModal").modal('hide');
      }

      $scope.showActivityModal = function() {
        console.log("you clicked on activty select!");
        $("#enterNewActivityModal").modal('show');
      }

      $scope.createNewActivityName = function() {
        console.log("you clicked create new activity!!!");
        var newActivity = {
          activityName: $scope.newActivityName
        }
        $scope.activity = $scope.newActivityName;
        $("#enterNewActivityModal").modal('hide');
        $query.addActivity(newActivity)
      }

  }]);
})()
