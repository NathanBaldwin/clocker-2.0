(function() {
  'use strict'
  app.factory('query', ["httpGET", "httpPOST",
    function($httpGET, $httpPOST) {

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
        }
      }
    }
  ])

})()
