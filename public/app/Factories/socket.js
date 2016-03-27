(function(){
  app.factory('socket', ["$rootScope",
   function($rootScope) {
    console.log("I SEE CLOCKER SOCKET FACTORY")
    // return ""
    // var myIoSocket = io.connect()
    
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        removeAllListeners: function (eventName, callback) {
          console.log("trying to remove listenvers from:", eventName);
          socket.removeAllListeners(eventName, function() {
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
          }); 
        },
        getSocket: function() {
          return socket
        }
    };
    

  }])
})()




// var mySocket = io()

//     return mySocket
