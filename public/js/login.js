
app.controller('LoginCtrl', function($scope,$cookies,$q,$http,Servicios) {

  if($cookies.get('token')){
    window.location = "#/student";
  }
   $scope.message = "";
   $scope.showMessage = "false";
   $scope.user = {
      mail   : '',
      password: ''
   };

   $scope.LogIn = function() {

    if($scope.user.mail != '' && $scope.user.password != '')
    {
      tmpLogin = Servicios.login($scope.user.mail,$scope.user.password);
      tmpLogin.then(function(response){
        if(response.statusCode){
         $cookies.put('token', response.token);
         window.location = "#/student";
        }else{
          $scope.showMessage = "true";  
          $scope.message = "El usuario y/o contraseña son incorrectas"; 
        }
      }).catch(function (error) {
            $scope.showMessage = "true";  
            $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
      });
    }else{
      $scope.showMessage = "true";  
      $scope.message = "Por favor ingresa correo y contraseña"; 
    }
   }

})
