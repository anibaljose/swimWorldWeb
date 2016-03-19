app.controller('createTeamCtrl', function($scope,$mdDialog,$http,$cookies) {
  $scope.createTeam =function(){
  var token = $cookies.get('token');
    if($scope.user.name != '')
    {
       $http({
         url: '/equipos/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
         data: {
           nombre: $scope.user.name
         }
       }).success(function (response) {
        if(response.statusCode = "200"){
          $scope.user.name = '';
          $scope.showMessage = "true";  
          $scope.message = "Equipo creado"; 
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el equipo"; 
        }
       }).error( function (response) {
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