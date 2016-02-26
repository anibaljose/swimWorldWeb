
var app = angular.module('sosialApp', ['ngMaterial','ngCookies']);


app.controller('LoginCtrl', function($scope,$cookies,$q,$http) {

   /**var usserCookie = $cookies.get('usser');
   if(usserCookie){
      alert("logueado");
   }else{
      alert("No logueado");
         $cookies.put('usser', 'Tomas');
         $scope.showMessage = "true";  
   }**/

   $scope.message = "";
   $scope.showMessage = "false";
   $scope.user = {
      mail   : '',
      password: ''
   };

   $scope.LogIn = function() {

		if($scope.user.mail != '' && $scope.user.password != '')
		{
      console.log("uss: "+$scope.user.mail);
      console.log("pass: "+$scope.user.password);
       $http({
         url: '/login',
         method: 'POST',
          headers : { 'Content-Type': 'application/json'},
         data: {
           username: $scope.user.mail, 
           password: $scope.user.password
         }
       }).success(function (response) {
         console.log(JSON.stringify(response));
       }).error( function (response) {
            console.log(response);
       });
      //$cookies.put('usser', 'Tomas');
			$scope.showMessage = "true";	
			$scope.message = "El usuario y/o contraseña son incorrectas";	
      //window.location = 'templates/addStudent.html';
		}else{
			$scope.showMessage = "true";	
			$scope.message = "Por favor ingresa correo y contraseña";	
		}
   }

   $scope.signUp = function(){
      window.location = 'templates/sigUp.html';
   }
})
