app.controller('editEventTypeCtrl', function($scope,$mdDialog,$http,$cookies) {
console.log("aqui");

  $scope.cancel = function() {
     location.reload();
    $mdDialog.cancel();
  };
  $scope.EditEventType =function(){
  if($scope.nombre != ''){
    var token = $cookies.get('token');
     $http({
       url: '/tipo/'+$scope.id+'/save',
       method: 'POST',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
        data: {
           nombre: $scope.nombre
         }
     }).success(function (response) {
        if(response.statusCode = "200")
        {
            $scope.showMessage = "true";  
            $scope.message = "Se edito el tipo de evento"; 
        }else{
            $scope.showMessage = "true";  
            $scope.message = "No se pudo editar el tipo de evento"; 
        }
     }).error( function (response) {
            $scope.showMessage = "true";  
            $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
     });
  }else{
        $scope.showMessage = "true";  
        $scope.message = "Ingresa un nombre, por favor"; 

  }
}

});