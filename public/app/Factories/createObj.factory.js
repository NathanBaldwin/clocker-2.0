(function() {
  'use strict'
  app.factory('createObj', [
    function() {

      return {
        event: function(activity, firstName, lastName, email, group) {
          var newEvent = {
            activity: activity,
            firstName: firstName,
            lastName: lastName,
            email: email,
            group: group,
            inFormatted: moment().format('MMMM Do YYYY, h:mm:ss a'),
            day: moment().format('MMMM Do, YYYY'),
            in: moment().format(),
            signedIn: true,
            outFormatted: '',
            out: '',
            totalMins: '',
            totalSecs: ''
          }
          return newEvent
        },
        newVisitor: function(visitorEmail, visitorFirstName, visitorLastName) {
          var newVisitor = {
            visitorEmail: visitorEmail,
            visitorFirstName: visitorFirstName,
            visitorLastName: visitorLastName
          }
          return newVisitor
        }
      }
    }
  ])
})()
