(function(){
  'use strict'
  app.controller('backend-activity',["$scope", "$rootScope", "query",
    function($scope, $rootScope, $query) {

    $scope.filteredResults = []

    $query.getAllMobileUsers()
      .then(function(mobileUsers) {
        console.log("mobileUsers:", mobileUsers);
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

    //determine whether next event is next day
    //used in ng-if to determine whether or not to add a new table header
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
          console.log("startDate", startDate)
          console.log("converted Date:", convertDate(startDate))
          var convertedDate = convertDate(startDate)
          $scope.selectedStart = convertDate(startDate)
          $scope.startDateText = $scope.selectedStart
          $scope.$apply()
          var timeTest = moment(convertedDate).isAfter("2015-12-14T12:17:10-06:00")
          console.log("before/after test:", timeTest)
          console.log("dateText", dateText)
          console.log("selectedDateObj", selectedDateObj)
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
          console.log("before date:", beforeDate)
          console.log("converted before Date:", convertDate(beforeDate))
          var convertedDate = convertDate(beforeDate)
          $scope.selectedEnd = convertDate(beforeDate)
          $scope.beforeDateText = $scope.selectedEnd
          $scope.$apply()
          var timeTest = moment(convertedDate).isBefore("2015-12-14T12:17:10-06:00")

          console.log("before or after test:", timeTest)

          console.log("dateText", dateText)
          console.log("selectedDateObj", selectedDateObj)    
        }
      })
    })

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

    //****** Sidebar hide/show functionality: *********

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


  }])
})()
