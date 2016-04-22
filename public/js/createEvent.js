app.controller('createEventCtrl', function($scope,$mdDialog,$http,$cookies,Servicios) {
  
  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.items = [];
  $scope.userEvent = '';
  $scope.dateBirthday = '';
  $scope.nameEvent = ''; 
  $scope.fromEvent = ''; 
  $scope.carril = ''; 
  $scope.userAtletas = [];
  $scope.userEvent = [];
  $scope.list = [];
  $scope.selected = []; 
  $scope.eventType = [];
  $scope.orden = '';
  $scope.categoria = [{id:1,name:"BEBES",min:0,max:4},
  {id:2,name:"MENORES",min:5,max:6},{id:3,name:"PRE INFANTIL",min:7,max:8},
  {id:4,name:"INFANTIL A",min:9,max:10},{id:5,name:"INFANTIL B",min:11,max:12},
  {id:6,name:"JUEVENIL A",min:13,max:14},{id:7,name:"JUEVENIL B",min:15,max:18},
  {id:8,name:"SENIOR",min:19,max:24},{id:9,name:"MASTER A",min:25,max:30},
  {id:10,name:"MASTER B",min:31,max:36},{id:11,name:"MASTER C",min:37,max:41},
  {id:12,name:"MASTER D",min:42,max:52},{id:13,name:"MASTER E",min:53,max:99}]
  $scope.userEventCat = {id:1,name:"BEBES",min:0,max:4};

  $scope.generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];
  $scope.userGenderE = $scope.generos[0];

  tmpEventType = Servicios.tipoEventos();
  tmpEventType.then(function(response){
    if(response.statusCode = "200"){
      if(response.tipos){
        $scope.eventType = response.tipos;
      }
    }
  })

  tmpStudent = Servicios.atletasRango(0,4);
  tmpStudent.then(function(response){
    if(response.statusCode = "200"){
      if(response.atletas){
        $scope.items = response.atletas;
      }
    }
  });
  

$scope.eventCategory = function(){
  tmpStudent = Servicios.atletasRango($scope.userEventCat.min,$scope.userEventCat.max);
  tmpStudent.then(function(response){
    if(response.statusCode = "200"){
      if(response.atletas){
        $scope.items = response.atletas;
      }
    }
  }).catch(function (error) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
  });
};

$scope.createEvent =function(){

  var token = $cookies.get('token');
      orden, genero,carriles,categoria,tipoEvento, event

      tmpEvent = Servicios.crearSubEvento
        (
           $scope.orden,$scope.userGenderE._id,2,$scope.userEventCat.id,$scope.userEvent,$scope.id_Evento 
        );
      tmpEvent.then(function(response){
        console.log(JSON.stringify(response));
        if(response.statusCode = "200"){
          $scope.showMessage = "true";  
          $scope.message = "Evento creado"; 
          $scope.nameEvent = "";
          $scope.fromEvent = "";
          $scope.carril = 0;
          $scope.orden = 0;
          var cont = $scope.list.length;
          var id_Evento = response._id;
          for(var i = 0; i<cont; i++){
            tmpStudentEvent = Servicios.crearEventoAtleta($scope.list[i],id_Evento,0,0,0);
            tmpStudentEvent.then(function(response){
            });
          }
          $scope.message = "Evento creado"; 
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el Evento"; 
        }
      }).catch(function (error) {
          $scope.showMessage = "true";  
          $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
      });
}
  $scope.cancel = function() {
    location.reload();
    $mdDialog.cancel();
  };


  $scope.toggle = function (item, list) {
    var idx = $scope.list.indexOf(item._id);
    if (idx > -1) $scope.list.splice(idx, 1);
    else $scope.list.push(item._id);
  };
  $scope.exists = function (item, list) {
    return $scope.list.indexOf(item._id) > -1;
  };
});