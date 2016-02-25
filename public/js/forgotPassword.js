
var app = angular.module('sosialApp', ['ngMaterial','ngCookies']);

app.controller('forgotPasswordCtrl', function($scope,$cookies) {

   $scope.message = "";
   $scope.showMessage = "false";
   $scope.user = {
      email   : ''
   };

   $scope.LogIn = function() {
		if($scope.user.email != '')
		{
         $cookies.put('usser', 'Tomas');
			$scope.showMessage = "true";	
			$scope.message = "El correo no esta asociado a una cuenta";	
		}else{
			$scope.showMessage = "true";	
			$scope.message = "Por favor, ingresa un correo";	
		}
   }
})
