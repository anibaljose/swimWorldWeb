app.controller('createEventCtrl', function($scope,$mdDialog,$http,$cookies) {
  
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
  $scope.userGenderE = [];
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
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });
  
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
        $scope.items = response.atletas;
      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });
 };
$scope.createEvent =function(){
  var token = $cookies.get('token');
    if($scope.nameEvent != '' && $scope.fromEvent != '' 
      && $scope.carril != '' && $scope.userEvent != ''
      && $scope.dateBirthday )
    {
       $http({
         url: '/eventos/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
         data: {      
           nombre   : $scope.nameEvent  ,
           lugar    : $scope.fromEvent,
           fecha    : $scope.dateBirthday.getTime(),
           carriles : $scope.carril,
           tipo     : $scope.userEvent,
           categoria: $scope.userEventCat.id, 
           genero   : $scope.userGenderE._id,
           numeroEvento: $scope.orden
         }
       }).success(function (response) {
        
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
            $http({
               url: '/atleta/'+$scope.list[i]+'/evento/'+id_Evento+'/create',
               method: 'POST',
                headers : { 
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+token
                },
                 data: {      
                   hit     : 1,
                   tiempo  : 0,
                   carril: 0
                 }
             }).success(function (response) {
             }).error( function (response) {
             });
          }
          $scope.showMeene = "Evento creado"; 
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el Evento"; 
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