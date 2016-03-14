(function() {

  app.factory('adminData', [
    function() {

      // var adminObj = $resource('/adminObj').get()

      return {
      	getAdminUid: function() {
      		return currentAuthData.uid;
      	},
        //getter for the clocker firebase reference above:
        ref: function() {
          return ref;
        }
      }
    }
  ]);

})
