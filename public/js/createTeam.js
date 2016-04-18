app.controller('createTeamCtrl', function($scope,$mdDialog,$http,$cookies,Servicios) {

  $scope.createTeam =function(){
    if($scope.user.name != '')
    {
      tmpLogin = Servicios.crearEquipo($scope.user.name);
      tmpLogin.then(function(response){
        if(response.statusCode = "200"){
          $scope.user.name = '';
          $scope.showMessage = "true";  
          $scope.message = "Equipo creado"; 
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el equipo"; 
        }
      }).catch(function (error) {
          $scope.showMessage = "true";  
          $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
      });
    }else{
      $scope.showMessage = "true";  
      $scope.message = "Por favor, ingrese un nombre"; 
    }
  }

  $scope.cancel = function() {
    location.reload();
    $mdDialog.cancel();
  };

});