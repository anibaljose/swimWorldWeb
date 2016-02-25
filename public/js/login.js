
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


     $scope.getMunicipios=function(){
      var deferred=$q.defer();
       $http({
         url: 'http://45.56.116.32/SosialWS/rest/countrysubdivision/allsubdivisions',
         method: 'POST',
         headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept" : "application/json"
         },
         data: {
           parent: 1
         }
       }).success(function (response) {
         console.log(JSON.stringify(response));
         deferred.resolve(response);         
       }).error( function (response) {
            console.log(response);
           console.error('Error obteniendo Municipios');
           deferred.reject(response);
       });
    }

   $scope.signUp = function(){
      window.location = 'templates/sigUp.html';
   }
})
