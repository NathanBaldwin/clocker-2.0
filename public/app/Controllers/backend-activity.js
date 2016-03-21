(function(){
  'use strict'
  app.controller('backend-activity',["$scope", "$rootScope", "query",
    function($scope, $rootScope, $query) {

    $scope.filteredResults = []

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
        console.log("DATA RETURNED FROM PROMISE:", userData)
        $rootScope.userData = userData
        $scope.pastVisitors = $rootScope.userData.adminObj.visitors || []
        $scope.groups = $rootScope.userData.adminObj.groups || []
        $scope.activityNames = $rootScope.userData.adminObj.activityNames || []
        $scope.filteredResults = []
        
      })
    }
    
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
        console.log("activity object to map:", activity)
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


  }])
})()
