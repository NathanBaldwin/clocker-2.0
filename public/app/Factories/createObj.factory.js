(function() {
  'use strict'
  app.factory('createObj', [
    function() {

      return {
        event: function(activity, firstName, lastName, email, group, mobileUserId) {
          var newEvent = {
            activity: activity,
            firstName: firstName,
            lastName: lastName,
            email: email,
            group: group,
            mobileUserId: mobileUserId || '',
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
        },
        updateEventObj: function(eventObj) {
          eventObj.signedIn = false
          eventObj.outFormatted = moment().format('MMMM Do YYYY, h:mm:ss a')
          eventObj.out = moment().format()

          var timeIn = eventObj.in.toString()
          var timeOut = eventObj.out.toString()
          var duration = moment(timeIn).twix(timeOut)
          var durationMins = duration.count('minutes')
          var durationSecs = duration.count('seconds')

          eventObj.totalMins = durationMins
          eventObj.totalSecs = durationSecs

          return eventObj
        }
      }
    }
  ])
})()
