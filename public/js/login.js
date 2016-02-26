
var app = angular.module('sosialApp', ['ngMaterial','ngCookies']);

app.config(['$httpProvider', function ($httpProvider) {
  // Intercept POST requests, convert to standard form encoding
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    var key, result = [];

    if (typeof data === "string")
      return data;

    for (key in data) {
      if (data.hasOwnProperty(key))
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return result.join("&");
  });
}]);

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
      email   : '',
      password: ''
   };

   $scope.LogIn = function() {

		if($scope.user.email != '' && $scope.user.password != '')
		{
      $cookies.put('usser', 'Tomas');
			$scope.showMessage = "true";	
			$scope.message = "El usuario y/o contraseña son incorrectas";	
      window.location = 'templates/addStudent.html';
		}else{
			$scope.showMessage = "true";	
			$scope.message = "Por favor ingresa correo y contraseña";	
		}
   }


     $scope.LogIn=function(){
      console.log("uss: "+$scope.user.email);
      console.log("pass: "+$scope.user.password);
       $http({
         url: '/login',
         method: 'POST',
          headers : { 'Content-Type': 'application/json'},
         data: {
           username: $scope.user.email, 
           password: $scope.user.password
         }
       }).success(function (response) {
         console.log(JSON.stringify(response));
       }).error( function (response) {
            console.log(response);
       });
    }

   $scope.signUp = function(){
      window.location = 'templates/sigUp.html';
   }
})
