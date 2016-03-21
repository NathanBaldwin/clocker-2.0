(function(){
  app.factory('socket', [ function() {
    console.log("I SEE CLOCKER SOCKET FACTORY")
    // var myIoSocket = io.connect()
    var mySocket = io()
    return mySocket
  }])

})()
