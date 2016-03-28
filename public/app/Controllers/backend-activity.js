(function(){
  'use strict'
  app.controller('backend-activity',["$scope", "$rootScope", "query", "socket", "findMatch",
    function($scope, $rootScope, $query, socket, findMatch) {

    //Event listeners will be duplicated if we load a controller that contains socket.io
    //event listeners after this one. Thus, we need to remove all listeners before
    //changing controllers.
    $scope.$on('$destroy', function () {
      console.log("FIRED DESTROY! - backend-activity")
      socket.removeAllListeners()
    })

    $query.getAllMobileUsers()
      .then(function(mobileUsers) {
        $scope.mobileUsers = mobileUsers
      })

    if(!$rootScope.refreshIndicator) {
        getAdminData()
      } else {
        // get array of visitor objects from adminObj, which stored on rootScope on module.run:
        $scope.pastVisitors = $rootScope.userData.adminObj.visitors || []
        $scope.groups = $rootScope.userData.adminObj.groups || []
        $scope.activityNames = $rootScope.userData.adminObj.activityNames || []
        $scope.filteredResults = [] 
      }
      
    function getAdminData() {
      $query.getAllUserData()
        .then(function(userData) {
        $rootScope.userData = userData
        $scope.pastVisitors = $rootScope.userData.adminObj.visitors || []
        $scope.groups = $rootScope.userData.adminObj.groups || []
        $scope.activityNames = $rootScope.userData.adminObj.activityNames || []
        $scope.filteredResults = [] 
      })
    }
    //fix table header:
    $scope.activityHeader = {
      top: 150,
      position: 'auto'
    }
    //prevent default for group and activity dropdowns clicks:
    $scope.openGroup = function() {
      event.stopPropagation()
    }

    //reflow fixed table header when filtered sum changes:
    $scope.varForReflowWatch = 0
    $scope.$watch('filteredSum', function() {
      console.log("watch worked!!")
      $scope.varForReflowWatch = $scope.varForReflowWatch + 1
    })
  
  //by omitting the first arguent of the $watch method, we can update stats every 
  //time $digest() is called, creating a 'real-time' filter!
  $scope.filteredResults = []
  $scope.$watch(function() {
    var sum = 0

    //TOTAL HOURS LOGIC:
    $scope.filteredResults.forEach(function (r) {
      if (r.totalSecs === undefined) {
      } else {
      sum += r.totalSecs
      }
    })
    $scope.filteredSum = Number(Math.round((sum / 3600)+'e2') +'e-2')

    //TOTAL EVENTS LOGIC:
    var allEvents = $scope.filteredResults.map(function(activity) {
      return activity.activity
    })
    var uniqueEvents = _.uniq(allEvents)
    $scope.eventsTotal = uniqueEvents.length

    //TOTAL GROUPS LOGIC:
    var allGroups = $scope.filteredResults.map(function(activity) {
      return activity.group
    })
    var uniqueGroups = _.uniq(allGroups)
    $scope.groupTotal = uniqueGroups.length

    //TOTAL PEOPLE LOGIC:
    var allPeople = $scope.filteredResults.map(function(activity) {
      var firstName = activity.firstName
      var lastName = activity.lastName
      var fullName = firstName + " " + lastName
      return fullName
    })
    var uniquePeople = _.uniq(allPeople)
      $scope.peopleTotal = uniquePeople.length
    })

    //determine whether next event in array is first event of next day
    //use in ng-if to add a new table header accordingly
    $scope.compareActivities = function(currentActivity) {

      var currentIndex = $scope.filteredResults.indexOf(currentActivity)
      var prevActivity = $scope.filteredResults[currentIndex - 1]

      if (prevActivity === undefined) {
        return true
      }
      var currentMoment = moment(currentActivity.in)
      var nextActMoment = moment(prevActivity.in)

      //use moment.JS plugin to compare whether or not days are same:
      if (currentMoment.isSame(nextActMoment, 'd')) {
        return false
      } else {
        return true
      }
    }
    //***************Date-Picker functionality*********************************

    //start date is empty string by default:
    $scope.startDateText = "";

    //Convert unformatted moment (ie. Tue Dec 22 2015 00:00:00 GMT-0600 (CST))
    //to more readable format (ie. 2015-12-22), which is used to display user's selected date:
    var convertDate = function(oldFormat) {
      return $.datepicker.formatDate("yy-mm-dd", oldFormat).toString()
    }

    //'AFTER' DATE PICKER LOGIC
    $(function() {
      $("#start-date-picker").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "D, M dd, yy",
        onSelect: function(dateText, selectedDateObj) {
          var startDate = $("#start-date-picker").datepicker( "getDate" )
          var convertedDate = convertDate(startDate)
          $scope.selectedStart = convertDate(startDate)
          $scope.startDateText = $scope.selectedStart
          $scope.$apply()
          var timeTest = moment(convertedDate).isAfter("2015-12-14T12:17:10-06:00")
        }
      })
    })

    //"BEFORE" DATE PICKER LOGIC
    $(function() {
      $("#before-date-picker").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "D, M dd, yy",
        onSelect: function(dateText, selectedDateObj) {
          var beforeDate = $("#before-date-picker").datepicker( "getDate" )
          var convertedDate = convertDate(beforeDate)
          $scope.selectedEnd = convertDate(beforeDate)
          $scope.beforeDateText = $scope.selectedEnd
          $scope.$apply()
          var timeTest = moment(convertedDate).isBefore("2015-12-14T12:17:10-06:00")
        }
      })
    })

    //MULTI-SELECT GROUP AND ACTIVITY DROPDOWNS:
    $scope.selectedGroups = []

    $scope.setSelectedGroup = function () {
      var groupName = this.group.groupName
      console.log("groupName", groupName)
      if (_.contains($scope.selectedGroups, groupName)) {
        $scope.selectedGroups = _.without($scope.selectedGroups, groupName)
      } else {
        $scope.selectedGroups.push(groupName)
      }
      return false
    }

    $scope.isChecked = function (groupName) {
      if (_.contains($scope.selectedGroups, groupName)) {
        return 'glyphicon glyphicon-ok'
      }
      return false
    }

    $scope.checkAllGroups = function () {
      $scope.selectedGroups = _.pluck($scope.groups, 'groupName')
    }

    $scope.selectedActivities = []

    $scope.setSelectedActivity = function () {
      var selectedActivity = this.activityName.activityName
      if (_.contains($scope.selectedActivities, selectedActivity)) {
        $scope.selectedActivities = _.without($scope.selectedActivities, selectedActivity)
      } else {
        $scope.selectedActivities.push(selectedActivity)
      }
      return false
    }

    $scope.checkAllActivities = function () {
      $scope.selectedActivities = _.pluck($scope.activityNames, 'activityName')
    }

    $scope.activityIsChecked = function (activityName) {
      if (_.contains($scope.selectedActivities, activityName)) {
        return 'glyphicon glyphicon-ok'
      }
      return false
    }

    //SIDEBAR SHOW/HIDE FUNCTIONALITY 

    $scope.hideSidebar = function () {
      $scope.varForReflowWatch = $scope.varForReflowWatch + 1
      $("#activity-log-body").removeClass("padding-for-sidebar")
      $("#activity-log-body").addClass("padding-for-add-sidebar-button")
      $("#activity-filter-sidebar").hide()
      $("#space-for-add-sidebar-button").removeClass("hidden")
      $("#fixed-header").removeClass("wide-margin")
      $("#fixed-header").addClass("thin-margin")
    }

    $scope.showSidebar = function () {
      $scope.varForReflowWatch = $scope.varForReflowWatch + 1
      $("#activity-log-body").addClass("padding-for-sidebar")
      $("#activity-log-body").removeClass("padding-for-add-sidebar-button")
      $("#activity-filter-sidebar").show()
      $("#space-for-add-sidebar-button").addClass("hidden")
      $("#fixed-header").addClass("wide-margin")
      $("#fixed-header").removeClass("thin-margin")
    }

    // TYPEAHEAD FOR INVITING MOBILE USERS:
    $scope.inviteMobileUser = function(mobileUserId, mobileUserEmail) {
      var adminInviteInfo = {
        adminId: $rootScope.userData.adminId,
        mobileUserId: mobileUserId
      }
      $query.inviteMobileUser(adminInviteInfo)
      var adminData = $rootScope.userData.adminObj
      adminData.mobileUserId = mobileUserId
      socket.emit('inviteMobileUser', adminData)
    }

  }])
})()
