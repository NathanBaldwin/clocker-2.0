(function() {
  'use strict'

  app.controller('visitorSignIn', ["$scope", "$rootScope", "$http", "$location", "query", "socket",
    function($scope, $rootScope, $http, $location, $query, socket) {
    	console.log("I see admin visitor sign in controller!")

      //when controller loads, check to see if user data is on $rootScope
      //if user has refreshed the page, it won't be there so, we'll go to api to get it
      //if user is not logged in, api send 'error' response, which angular will handle with redirect
      //tabling redirect code for now
      if(!$rootScope.refreshIndicator) {
        getAdminData()
      } else {
        // get array of visitor objects from adminObj, which stored on rootScope on module.run:
        $scope.pastVisitors = $rootScope.userData.adminObj.visitors || []
        $scope.groups = $rootScope.userData.adminObj.groups || []
        $scope.activityNames = $rootScope.userData.adminObj.activityNames || []  
      }
      //*****************VISITOR SIGN IN FORM FUNCTIONALITY*************


      function getAdminData() {
        $query.getAllUserData()
          .then(function(userData) {
          console.log("DATA RETURNED FROM PROMISE:", userData)
          $rootScope.userData = userData
          $scope.pastVisitors = $rootScope.userData.adminObj.visitors || []
          $scope.groups = $rootScope.userData.adminObj.groups || []
          $scope.activityNames = $rootScope.userData.adminObj.activityNames || []
          // arrayToObject(userData.activityLog)
        })
      }

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

      //
      $scope.createNewEvent = function() {
        console.log("you clicked 'create new event!")
        console.log("$scope.match", $scope.match);
        var newEvent = {
          activity: $scope.activity,
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          email: $scope.email,
          group: $scope.group,
          activity: $scope.activity,
          inFormatted: moment().format('MMMM Do YYYY, h:mm:ss a'),
          day: moment().format('MMMM Do, YYYY'),
          in: moment().format(),
          signedIn: true,
          outFormatted: '',
          out: '',
          totalMins: '',
          totalSecs: ''
        }
        $query.createEvent(newEvent)
        .then(function(savedEvent) {
          $rootScope.userData.activityLog.push(savedEvent)
          clearFormInputs()
          $("#foundMatchModal").modal('hide')
        })
      }

      function updateEvent(eventId) {

      }

      function findById(visitorLogArray, eventId) {
        console.log("visitorLogArray", visitorLogArray)
        var match = _(visitorLogArray).find({_id: eventId})
        console.log("foundObject", match)
        return match
        // match.signedIn = false
      }

      $scope.signOut = function() {
        console.log("you clicked sign out!")
        console.log("event.target.id", event.target.id)

        var eventId = event.target.id

        var clickedEventObj = findById($rootScope.userData.activityLog, eventId)

        clickedEventObj.signedIn = false
        clickedEventObj.outFormatted = moment().format('MMMM Do YYYY, h:mm:ss a')
        clickedEventObj.out = moment().format()

        var timeIn = clickedEventObj.in.toString()
        var timeOut = clickedEventObj.out.toString()
        console.log("time in:", timeIn, "timeOut:", timeOut)

        var duration = moment(timeIn).twix(timeOut)
        var durationMins = duration.count('minutes')
        var durationSecs = duration.count('seconds')
        console.log("durationMins", durationMins)
        console.log("durationSecs", durationSecs)

        clickedEventObj.totalMins = durationMins
        clickedEventObj.totalSecs = durationSecs

        console.log("clickedEventObj", clickedEventObj)
        $query.updateEvent(clickedEventObj)
      }


  }])
})()
