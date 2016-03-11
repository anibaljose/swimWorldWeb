
var app = angular.module('swimAPP', ['ngMaterial','ngCookies','ngRoute','swim.httpServices']);

var conteo = 1;
app.config(['$httpProvider','$routeProvider', function ($httpProvider,$routeProvider) {

   
   $routeProvider.
      when('/login', {
        templateUrl: '../templates/login.html'
      }).
      when('/student', {
        templateUrl: '../templates/student.html'
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
      when('/Masivo', {
        templateUrl: '../templates/eventosMasivo.html'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);