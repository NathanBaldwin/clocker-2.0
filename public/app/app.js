var app = angular.module("app", ['ngRoute', 'firebase', 'ngResource', 'angular.filter', 'floatThead']);

app
  .config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    	$routeProvider
  		.when('/login', {
        templateUrl: 'Partials/login.html',
        controller: 'login'
      })
      .when('/register', {
      	templateUrl: 'Partials/adminSignUp.html',
      	controller: 'adminSignUp'
      })
      .when('/visitorsignin', {
      	templateUrl: 'Partials/visitorSignIn.html',
      	controller: 'visitorSignIn'
      })
      .when('/backend/activity', {
        templateUrl: 'Partials/backend-activity.html',
        controller: 'backend-activity'
      })
      .when('/backend/people', {
        templateUrl: 'Partials/backend-people.html',
        controller: 'backend-people'
      })
      .otherwise('/login');
    }])
  .run(['$rootScope', '$resource',
    function($rootScope, $resource) {

    }])
