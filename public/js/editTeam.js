app.controller('editTeamCtrl', function($scope,$mdDialog,$http,$cookies) {
  
  $scope.EditTeam =function(){

    if($scope.nombre != '')
    {
      tmpLogin = Servicios.editarEquipo($scope.id,$scope.nombre);
      tmpLogin.then(function(response){
        if(response.statusCode = "200")
        {
            $scope.showMessage = "true";  
            $scope.message = "Se edito el equipo"; 
        }else{
            $scope.showMessage = "true";  
            $scope.message = "No se pudo editar el equipo"; 
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