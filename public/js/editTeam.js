app.controller('editTeamCtrl', function($scope,$mdDialog,$http,$cookies) {
  
  $scope.EditTeam =function(){
  if($scope.nombre != ''){
    var token = $cookies.get('token');
     $http({
       url: '/equipos/'+$scope.id+'/save',
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
            $scope.message = "Se edito el equipo"; 
        }else{
            $scope.showMessage = "true";  
            $scope.message = "No se pudo editar el equipo"; 
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
  $scope.cancel = function() {
    location.reload();
    $mdDialog.cancel();
  };

});