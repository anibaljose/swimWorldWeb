
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
      mail   : 'dvd',
      password: 'dvddvd'
   };

   $scope.LogIn = function() {

		if($scope.user.mail != '' && $scope.user.password != '')
		{
       $http({
         url: '/login',
         method: 'POST',
          headers : { 'Content-Type': 'application/json'},
         data: {
           username: $scope.user.mail, 
           password: $scope.user.password
         }
       }).success(function (response) {
        if(response.statusCode){
         $cookies.put('token', response.token);
        }else{
          $scope.showMessage = "true";  
          $scope.message = "El usuario y/o contraseña son incorrectas"; 
        }
       }).error( function (response) {
          $scope.showMessage = "true";  
          $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
          console.log(response);
       });
      //window.location = 'templates/addStudent.html';
		}else{
			$scope.showMessage = "true";	
			$scope.message = "Por favor ingresa correo y contraseña";	
		}
   }

   $scope.signUp = function(){
      window.location = 'templates/sigUp.html';
   }

   /*
  getUsers:function(contact){
      var token   = $window.localStorage['user-token']; //esta variable la utilizamos para poder logearnos en el sistema
      var deferred=$q.defer();
      console.log("ruta: "+ruta);
      $http({
        method  : 'POST',
        url     :  ruta + '/usuarios/friends',
        data    :
                {
                  contactos: contact
                },
        timeout : 5000, 
        headers :
                {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+token
                }
      }).success(
        function(response){
          console.log("getUsers: "+JSON.stringify(response));
          deferred.resolve(response);
        }
      ).error(
        function(response){
          var error = {};
          error['statusCode'] = "400";
          console.log("getUsers Error: "+JSON.stringify(response));
          deferred.resolve(error);
          }
      );
      return deferred.promise;
    },
   */
})
