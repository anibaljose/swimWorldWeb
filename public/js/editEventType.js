app.controller('editEventTypeCtrl', function($scope,$mdDialog,$http,$cookies) {
console.log("aqui");

  $scope.cancel = function() {
     location.reload();
    $mdDialog.cancel();
  };

  $scope.EditEventType =function(){

    if($scope.nombre != '')
    {
      tmpLogin = Servicios.editarTipoEvento($scope.id,$scope.nombre);
      tmpLogin.then(function(response){
        if(response.statusCode = "200")
        {
            $scope.showMessage = "true";  
            $scope.message = "Se edito el tipo de evento"; 
        }else{
            $scope.showMessage = "true";  
            $scope.message = "No se pudo editar el tipo de evento"; 
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

});