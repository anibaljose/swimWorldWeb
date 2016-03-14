
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
      when('/massive', {
        templateUrl: '../templates/eventMassive.html'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);


app.config(function($mdThemingProvider) {
  var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    }).accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});
