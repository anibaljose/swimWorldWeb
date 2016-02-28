
var app = angular.module('swimAPP', ['ngMaterial','ngCookies','ngRoute']);


app.config(['$httpProvider','$routeProvider', function ($httpProvider,$routeProvider) {
   $routeProvider.
      when('/login', {
        templateUrl: '../templates/login.html'
      }).
      when('/student', {
        templateUrl: '../templates/addStudent.html'
      }).
      when('/event', {
        templateUrl: '../templates/event.html'
      }).
      when('/eventType', {
        templateUrl: '../templates/eventType.html'
      }).
      when('/team', {
        templateUrl: '../templates/team.html'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);