app.controller('editEventCtrl', function($scope,$mdDialog,$http,$cookies) {
  
  $scope.items = [];
  $scope.itemsA = [];
  $scope.userEvent = '';
  $scope.dateBirthday = '';
  $scope.nameEvent = ''; 
  $scope.fromEvent = ''; 
  $scope.carril = ''; 
  $scope.userAtletas = [];
  $scope.list = [];
  $scope.selected = []; 

  $scope.categoria = [{id:1,name:"BEBES",min:0,max:4},
  {id:2,name:"MENORES",min:5,max:6},{id:3,name:"PRE INFANTIL",min:7,max:8},
  {id:4,name:"INFANTIL A",min:9,max:10},{id:5,name:"INFANTIL B",min:11,max:12},
  {id:6,name:"JUEVENIL A",min:13,max:14},{id:7,name:"JUEVENIL B",min:15,max:18},
  {id:8,name:"SENIOR",min:19,max:24},{id:9,name:"MASTER A",min:25,max:30},
  {id:10,name:"MASTER B",min:31,max:36},{id:11,name:"MASTER C",min:37,max:41},
  {id:12,name:"MASTER D",min:42,max:52},{id:13,name:"MASTER E",min:53,max:99},
  {id:13,name:"Agua Triner",min:19,max:99}]
  $scope.userEventCat = {id:1,name:"BEBES",min:0,max:4};
  $scope.generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];
  $scope.userEventCat = $scope.categoria[$scope.Nocategoria-1];
  $scope.userGenderE = $scope.generos[$scope.Nogenero-1];
  $http({
     url: '/atletas',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      },
      params:{
        edadmin:0,
        edadmax:4
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      if(response.atletas){
        $scope.itemsA = response.atletas;
      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

  $http({
     url: '/eventos/'+$scope.id_Evento,
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      $scope.nameEvent = response.evento.nombre;
      $scope.fromEvent = response.evento.lugar;
      $scope.carril = response.evento.carriles;
      $scope.dateBirthday = new Date(response.evento.fecha);
      $scope.orden = response.evento.numeroEvento;

    }
   }).error( function (response) {
   });



  $scope.eventType = [];
   $http({
     url: '/tipo',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      if(response.tipos){
        $scope.eventType = response.tipos;
      }

      var cont = $scope.eventType.length;
      var bandera = true;
      for(var i= 0; i< cont && bandera; i++){
        if($scope.eventType[i]._id == $scope.id_Tipo_Evento){
          bandera=false;
          $scope.userEvent = $scope.eventType[i];
        }
      }
    }
   }).error( function (response) {
   });

  $http({
     url: '/eventos/atletas/'+$scope.id_Evento,
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      if(response.atletas){
        $scope.items = response.atletas;
      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

$scope.eventCategory = function(){
  $http({
     url: '/atletas',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      },
      params:{
        edadmin:$scope.userEventCat.min,
        edadmax:$scope.userEventCat.max
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      if(response.atletas){
        $scope.itemsA = response.atletas;
      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });
 };

$scope.deleteEventAtleta =function(item){
  $scope.showMessage2 = "false";  
  $http({
     url: '/eventos/'+$scope.id_Evento+'/atleta',
     method: 'DELETE',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      },
      params:{
        atleta:item.atleta._id
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      document.getElementById("AtletaEvento"+item.atleta._id).style.display = "none";
      $scope.showMessage2 = "true";  
      $scope.message2 = "Se elimino un atleta"; 
    }else{
      $scope.showMessage2 = "true";  
      $scope.message2 = "Disculpe los inconveniente!! intenta mas tarde"; 
    }
   }).error( function (response) {
      $scope.showMessage2 = "true";  
      $scope.message2 = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

};
$scope.editEvent =function(){
  var token = $cookies.get('token');
    if($scope.nameEvent != '' && $scope.fromEvent != '' 
      && $scope.carril != '' && $scope.userEvent._id != ''
      && $scope.dateBirthday )
    {
       $http({
         url: '/eventos/'+$scope.id_Evento+'/save',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
         data: {      
           nombre:$scope.nameEvent  ,
           lugar: $scope.fromEvent,
           fecha: $scope.dateBirthday.getTime(),
           carriles: $scope.carril,
           tipo: $scope.userEvent._id,
           categoria: $scope.userEventCat.id, 
           genero   : $scope.userGenderE.id,
           numeroEvento: $scope.orden
         }
       }).success(function (response) {
        if(response.statusCode = "200"){

          var cont = $scope.list.length;
          for(var i = 0; i<cont; i++){
            $http({
               url: '/atleta/'+$scope.list[i]+'/evento/'+$scope.id_Evento+'/create',
               method: 'POST',
                headers : { 
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+token
                },
                 data: {      
                   hit     : 1,
                   tiempo  : 0,
                   carril: 4
                 }
             }).success(function (response) {
             }).error( function (response) {
             });
          }
          $scope.showMessage = "true";  
          $scope.message = "Evento editado"; 
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo editar el Evento"; 
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