(function() {
  'use strict'
  app.factory('query', ["httpGET", "httpPOST",
    function($httpGET, $httpPOST) {

      return {
        getUserObj: function() {
          return $httpGET('/adminObj')
        },
        addGroup: function(newGroupName) {
          return $httpPOST('adminObj/groups', newGroupName)
        }
      }
    }
  ])

})()
