app.controller('createEventTypeCtrl', function($scope,$mdDialog,$http,$cookies,Servicios) {

  $scope.cancel = function() {
     location.reload();
    $mdDialog.cancel();
  };

$scope.createEventType =function(){
  if($scope.user.name != '')
  {
    tmpLogin = Servicios.crearTipoEvento($scope.user.name);
    tmpLogin.then(function(response){
      if(response.statusCode = "200"){
        $scope.user.name = '';
        $scope.showMessage = "true";  
        $scope.message = "Tipo evento creado"; 
      }else{
        $scope.showMessage = "true";  
        $scope.message = "No se pudo crear el Tipo evento"; 
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