(function() {
  'use strict'

  app.controller('visitorSignIn', ["$scope", "$rootScope", "$http", "$location", "query", "socket", "createObj", "findMatch",
    function($scope, $rootScope, $http, $location, $query, socket, createObj, findMatch) {
    	console.log("I see admin visitor sign in controller!")

      //REFRESH CHECK:
      //when controller loads, check to see if user data is on $rootScope
      //if user has refreshed the page, it won't be there so, we'll make api request for it.
      if(!$rootScope.refreshIndicator) {
        getAdminData()
      } else {
        // get array of visitor objects from adminObj, which stored on rootScope on module.run:
        $scope.pastVisitors = $rootScope.userData.adminObj.visitors || []
        $scope.groups = $rootScope.userData.adminObj.groups || []
        $scope.activityNames = $rootScope.userData.adminObj.activityNames || []  
      }

      function getAdminData() {
        $query.getAllUserData()
          .then(function(userData) {
          console.log("DATA RETURNED FROM PROMISE:", userData)
          $rootScope.userData = userData
          $scope.pastVisitors = $rootScope.userData.adminObj.visitors || []
          $scope.groups = $rootScope.userData.adminObj.groups || []
          $scope.activityNames = $rootScope.userData.adminObj.activityNames || []
          socket.emit(
            'join', {
              adminId: $rootScope.userData.adminId,
              orgName: $rootScope.userData.adminObj.orgName
            })
          $rootScope.refreshIndicator = true
        })
      }

      // WEBSOCKETS
      //event listeners:
      socket.on('createClockerEvent', function(data) {
        console.log("DATA FROM REMOTE CLIENT", data)

        //check to see if mobileUser has signed in before:
        //if not, add them to visitors array in db and rootScope
        var match = findMatch($scope.pastVisitors, data.email.toLowerCase())
        if (match.length < 1) {
          console.log("creating new visitor");
          var newVisitor = createObj.newVisitor(data.email, data.firstName, data.lastName)
          $query.addVisitor(newVisitor)
          $rootScope.userData.adminObj.visitors.push(newVisitor)
        } 

        //create new event
        var newEvent = createObj.event(data.activity, data.firstName, data.lastName, data.email, data.group, data.mobileUserId)
        $query.createEvent(newEvent)
        .then(function(savedEvent) {
          $rootScope.userData.activityLog.push(savedEvent)
        })     
      })

      socket.on('signOutMobileUser', function(idObj) {
        console.log("MOBILE USER WANTS TO SIGN OUT. ID'S:", idObj)
        var mobileUserId = idObj.mobileUserId
        $scope.signOut("mobileUserId", mobileUserId)
      })

      //VISITOR SIGN IN FORM FUNCTIONALITY
      function clearFormInputs() {
        $scope.group = ""
        $scope.activity = ""
        $scope.email = ""
        $scope.newGroupName = ""
        $scope.newActivityName = ""
        $scope.lastName = ""
        $scope.firstName = ""
      }

      //modal submission: create new visitor object to be saved
      $scope.createNewVisitor = function(visitorEmail, visitorFirstName, visitorLastName) {

        console.log(visitorEmail, visitorFirstName, visitorLastName);
        var newVisitor = createObj.newVisitor(visitorEmail, visitorFirstName, visitorLastName)

        //add new visitor object as sub document to adminObj
        $query.addVisitor(newVisitor)
        $rootScope.userData.adminObj.visitors.push(newVisitor)
        $scope.createNewEvent()
        $("#noMatchModal").modal('hide');
        clearFormInputs()
      }

      //on click of 'other' group, enable user to enter and save new group:
      $scope.showGroupModal = function() {
        $("#createNewGroupModal").modal('show');
      }

      //on click of 'save' in modal, save group name to groups subdocument in adminObj
      $scope.createNewGroup = function() {
        var newGroup = {
          groupName: $scope.newGroupName
        }
        $rootScope.userData.adminObj.groups.push(newGroup)
        $query.addGroup(newGroup)
        $scope.group = $scope.newGroupName
        $("#createNewGroupModal").modal('hide')
      }

      $scope.showActivityModal = function() {
        $("#enterNewActivityModal").modal('show')
      }

      $scope.createNewActivityName = function() {
        var newActivity = {
          activityName: $scope.newActivityName
        }
        $scope.activity = $scope.newActivityName;
        $rootScope.userData.adminObj.activityNames.push(newActivity)
        $("#enterNewActivityModal").modal('hide')
        $query.addActivity(newActivity)
      }

      $scope.setSelectedActivity = function () {
        $scope.activity = this.activityName.activityName
      }

      $scope.setSelectedGroup = function () {
        $scope.group = this.group.groupName
      }

      //on click of 'Sign In' button, search through past visitors to see if current visitor is in the db:
      $scope.findVisitor = function() {
        $scope.match = findMatch($scope.pastVisitors, $scope.email.toLowerCase())
        if ($scope.match.length < 1) {
          $("#noMatchModal").modal("show")
        } else {
          $scope.firstName = $scope.match[0].visitorFirstName
          $scope.lastName = $scope.match[0].visitorLastName
          $("#foundMatchModal").modal("show")
        }    
      }

      $scope.createNewEvent = function() {
        var newEvent = createObj.event($scope.activity, $scope.firstName, $scope.lastName, $scope.email, $scope.group)
        $query.createEvent(newEvent)
        .then(function(savedEvent) {
          $rootScope.userData.activityLog.push(savedEvent)
          clearFormInputs()
          $("#foundMatchModal").modal('hide')
        })
      }

      function findById(arrayOfObjects, key, valueToMatch) {
        var match = _(arrayOfObjects).find({[key]: valueToMatch, 'signedIn': true})
        return match
      }

      $scope.signOut = function(targetParam, eventTargetId) {
        var targetEvent = findById($rootScope.userData.activityLog, targetParam, eventTargetId)
        var updatedEventObj = createObj.updateEventObj(targetEvent)
        console.log("updatedEventObj before save:", updatedEventObj)
        $query.updateEvent(updatedEventObj)
      }


  }])
})()
