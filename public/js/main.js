
var app = angular.module('sosialApp', ['ngMaterial']);

app.controller('mainCtrl', function($scope,$mdSidenav) {

    $scope.showMobileMainHeader = true;

    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };

    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };


   $scope.go = function(locationPage){
      window.location = 'sigUp.html';
   }
})
