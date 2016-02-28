
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
         window.location = "#/student";
        }else{
          $scope.showMessage = "true";  
          $scope.message = "El usuario y/o contraseña son incorrectas"; 
        }
       }).error( function (response) {
          $scope.showMessage = "true";  
          $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
       });
      //window.location = 'templates/addStudent.html';
		}else{
			$scope.showMessage = "true";	
			$scope.message = "Por favor ingresa correo y contraseña";	
		}
   }

})
