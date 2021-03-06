app.controller('editStudentCtrl', function($scope,$mdDialog,$http,$cookies,Servicios) {
  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.team = [];
  $scope.generos = [];
   $scope.user = {
      fisrtName   : '',
      lastName    : '',
      dateBirthday : ''
   };

  $scope.cancel = function() {
     //location.reload();
    $mdDialog.cancel();
  };
  $scope.generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];

  $scope.userGenderE = $scope.generos[$scope.gen-1]; 

  tmpTeam = Servicios.equipos();
  tmpTeam.then(function(response){
    if(response.statusCode = "200"){
      if(response.equipos){
        $scope.team = response.equipos;
      } 
      var cont = $scope.team.length;
      var bandera = true;
      for(var i= 0; i< cont && bandera; i++){
        if($scope.team[i]._id == $scope.equipo){
          bandera=false;
          $scope.userTeam = $scope.team[i];
        }
      }
    }else{
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
    }
  });

$scope.studentEdit =function(){
  if($scope.fisrtName != ''  && $scope.lastName != '' &&
    $scope.dateBirthday != '' && $scope.userGenderE != ''&&
    $scope.userTeam != ''){
      tmpStudent = Servicios.editarAtletas($scope.id,$scope.fisrtName,$scope.lastName,
                    $scope.dateBirthday.getTime(),$scope.userGenderE._id,$scope.userTeam._id);
      tmpStudent.then(function(response){
        if(response.statusCode = "200")
        {
            $scope.showMessage = "true";  
            $scope.message = "Se edito el Atleta"; 
        }else{
            $scope.showMessage = "true";  
            $scope.message = "No se pudo editar el Atleta"; 
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