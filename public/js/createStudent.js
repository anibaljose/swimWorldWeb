app.controller('createStudentCtrl', function($scope,$mdDialog,$http,$cookies) {
  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.team = [];
  $scope.generos = [];
  $scope.dateBirthday = '';


  $scope.generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];
  $scope.userGenderE = $scope.generos[0];

  $scope.cancel = function() {
    location.reload();
    $mdDialog.cancel();
  };

   $http({
     url: '/equipos',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      if(response.equipos){
        $scope.team = response.equipos;
      }
    }
        $scope.userTeam = $scope.team[0];
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

$scope.createStudent =function(){
  var token = $cookies.get('token');
    if($scope.fisrtName != ''  && $scope.lastName != '' &&
    $scope.dateBirthday != '' && $scope.userGenderE != ''&&
    $scope.userTeamE != '')
    {
       $http({
         url: '/atletas/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
         data: {
           nombre: $scope.fisrtName,
           apellido: $scope.lastName,
           nacimiento: $scope.dateBirthday.getTime(),
           genero: $scope.userGender ,
           equipo: $scope.userTeam._id
         }
       }).success(function (response) {
        
        if(response.statusCode = "200"){
          $scope.showMessage = "true";  
          $scope.message = "Atleta creado"; 
          $scope.fisrtName = ''  
          $scope.lastName = '';
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el Atleta"; 
        }
       }).error( function (response) {
          $scope.showMessage = "true";  
          $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
       });
    }else{
      $scope.showMessage = "true";  
      $scope.message = "Por favor, complete el formulario"; 
    }
}

});