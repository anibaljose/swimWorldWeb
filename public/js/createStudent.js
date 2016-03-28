app.controller('createStudentCtrl', function($scope,$mdDialog,$http,$cookies,Servicios) {
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

  tmpTeam = Servicios.equipos();
  tmpTeam.then(function(response){
    if(response.statusCode = "200"){
      if(response.equipos){
        $scope.team = response.equipos;
      }
      $scope.userTeam = $scope.team[0];
    }
  });

$scope.createStudent =function(){
  var token = $cookies.get('token');
    if($scope.fisrtName != ''  && $scope.lastName != '' &&
    $scope.dateBirthday != '' && $scope.userGenderE != ''&&
    $scope.userTeamE != '')
    {
      tmpStudent = Servicios.crearAtletas($scope.fisrtName,$scope.lastName,$scope.dateBirthday.getTime(),
                   $scope.userGenderE._id,$scope.userTeam._id);
      tmpStudent.then(function(response){
        if(response.statusCode = "200")
        {
            $scope.showMessage = "true";  
            $scope.message = "Se creo el Atleta"; 
        }else{
            $scope.showMessage = "true";  
            $scope.message = "No se pudo crear el Atleta"; 
        }

      }).catch(function (error) {
            $scope.showMessage = "true";  
            $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
      });
    }else{
          $scope.showMessage = "true";  
          $scope.message = "complete el formulario"; 

    }
}

});