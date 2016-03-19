app.controller('createEventTypeCtrl', function($scope,$mdDialog,$http,$cookies) {
  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.cancel = function() {
     location.reload();
    $mdDialog.cancel();
  };

$scope.createEventType =function(){
  var token = $cookies.get('token');
    if($scope.user.name != '')
    {
       $http({
         url: '/tipos/create',
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
          $scope.user.name = "";
          $scope.showMessage = "true";  
          $scope.message = "Tipo evento creado"; 
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el tipo de evento"; 
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

});