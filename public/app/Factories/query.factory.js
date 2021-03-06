(function() {
  'use strict'
  app.factory('query', ["httpGET", "httpPOST", "httpPUT",
    function($httpGET, $httpPOST, $httpPUT) {

      return {
        getUserObj: function() {
          return $httpGET('/adminObj')
        },
        addVisitor: function(newVisitorName) {
          return $httpPOST('adminObj/visitors', newVisitorName)
        },
        addGroup: function(newGroupName) {
          return $httpPOST('adminObj/groups', newGroupName)
        },
        addActivity: function(newActivity) {
          return $httpPOST('adminObj/activities', newActivity)
        },
        getAllUserData: function() {
          return $httpGET('/allUserData')
        },
        createEvent: function(newEvent) {
          return $httpPOST('/activityLogs', newEvent)
        },
        updateEvent: function(updatedEventObj) {
          return $httpPUT('/activityLogs', updatedEventObj)
        },
        getAllMobileUsers: function() {
          return $httpGET('/mobileUsers')
        },
        inviteMobileUser: function(adminInviteInfo) {
          return $httpPOST('/mobileUsers/invite', adminInviteInfo)
        }
      }
    }
  ])

})()
