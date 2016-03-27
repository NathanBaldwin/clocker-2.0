(function() {
  'use strict'

  app.controller('visitorSignIn', ["$scope", "$rootScope", "$http", "$location", "query", "socket", "event",
    function($scope, $rootScope, $http, $location, $query, socket, event) {
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
        var newEvent = event(data.activity, data.firstName, data.lastName, data.email, data.group)
        $query.createEvent(newEvent)
        .then(function(savedEvent) {
          $rootScope.userData.activityLog.push(savedEvent)
        })
        // $scope.firstName = data.firstName
        // $scope.lastName = data.lastName
        // $scope.email = data.email
        // $scope.group = data.group
        // $scope.activity = data.activity

        // $scope.createNewEvent()       
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
      $scope.createNewVisitor = function() {
        var newVisitor = {
          "visitorEmail": $scope.email,
          "visitorFirstName": $scope.firstName,
          "visitorLastName": $scope.lastName,
        }
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
        console.log("pastVisitors data:", $scope.pastVisitors)
        //use lodash to loop through array of past visitor objects
        //return the object if emails match
        $scope.match = _.filter($scope.pastVisitors, function(visitorObj) {
          //make both emails lowercase to normalize comparison
          if (_.includes(visitorObj.visitorEmail.toLowerCase(), $scope.email.toLowerCase())) {
            console.log("obj includes", visitorObj.email)
            return visitorObj
          }
        })
        //if filter function returned any matches, ask visitor to verify identity
        //if no match was found, show modal to create new visitor:
        console.log("matching visitor object(s):", $scope.match)
        if ($scope.match.length < 1) {
          $("#noMatchModal").modal("show")
        } else {
          $scope.firstName = $scope.match[0].visitorFirstName
          $scope.lastName = $scope.match[0].visitorLastName
          $("#foundMatchModal").modal("show")
        }    
      }

      $scope.createNewEvent = function() {
        var newEvent = event($scope.activity, $scope.firstName, $scope.lastName, $scope.email, $scope.group)
        $query.createEvent(newEvent)
        .then(function(savedEvent) {
          $rootScope.userData.activityLog.push(savedEvent)
          clearFormInputs()
          $("#foundMatchModal").modal('hide')
        })
      }

      function findById(visitorLogArray, eventId) {
        var match = _(visitorLogArray).find({_id: eventId})
        return match
      }

      $scope.signOut = function(eventTargetId) {
        var clickedEventObj = findById($rootScope.userData.activityLog, eventTargetId)

        clickedEventObj.signedIn = false
        clickedEventObj.outFormatted = moment().format('MMMM Do YYYY, h:mm:ss a')
        clickedEventObj.out = moment().format()

        var timeIn = clickedEventObj.in.toString()
        var timeOut = clickedEventObj.out.toString()
        var duration = moment(timeIn).twix(timeOut)
        var durationMins = duration.count('minutes')
        var durationSecs = duration.count('seconds')

        clickedEventObj.totalMins = durationMins
        clickedEventObj.totalSecs = durationSecs

        $query.updateEvent(clickedEventObj)
      }


  }])
})()
