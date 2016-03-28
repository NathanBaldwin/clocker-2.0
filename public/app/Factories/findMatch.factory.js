(function() {
  'use strict'
  app.factory('findMatch', [
    function() {
    //use lodash to loop through array of past visitor objects
    //return the object if emails match
      return function(arrayToSearch, providedEmail) {
        var arrayOfMatches = _.filter(arrayToSearch, function(obj) {
          if (_.includes(obj.visitorEmail.toLowerCase(), providedEmail)) {
            return obj
          }
        })
        return arrayOfMatches
      }

    }
  ])
})()
