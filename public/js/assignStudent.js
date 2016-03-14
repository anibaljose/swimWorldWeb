app.controller('assignStudentCtrl', function($scope,$mdDialog,$http,$cookies) {
  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.team = [];
  $scope.generos = [];
  $scope.userTeam = '';
  $scope.userGender = '';
  $scope.events = [];
  $scope.eventMod = [];
  $scope.list = [];
  $scope.categoria = [{id:1,name:"BEBES",min:0,max:4},
  {id:2,name:"MENORES",min:5,max:6},{id:3,name:"PRE INFANTIL",min:7,max:8},
  {id:4,name:"INFANTIL A",min:9,max:10},{id:5,name:"INFANTIL B",min:11,max:12},
  {id:6,name:"JUEVENIL A",min:13,max:14},{id:7,name:"JUEVENIL B",min:15,max:18},
  {id:8,name:"SENIOR",min:19,max:24},{id:9,name:"MASTER A",min:25,max:30},
  {id:10,name:"MASTER B",min:31,max:36},{id:11,name:"MASTER C",min:37,max:41},
  {id:12,name:"MASTER D",min:42,max:52},{id:13,name:"MASTER E",min:53,max:99},
  {id:14,name:"Agua Triner",min:19,max:99}]

   $scope.user = {
      fisrtName   : '',
      lastName   : '',
      dateBirthday : ''
   };

  $scope.generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];

  $scope.userGenderE = $scope.generos[$scope.gen-1].nombre; 

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
      var cont = $scope.team.length;
      var bandera = true;
      for(var i= 0; i< cont && bandera; i++){
        if($scope.team[i]._id == $scope.equipo){
          bandera=false;
          $scope.userTeam = $scope.team[i];
        }
      }
      
      //$scope.team._id = item.equipo;
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   }); 

   $scope.ver = function(){
  
   $http({
     url: '/eventos',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      console.log(JSON.stringify(response));
      if(response.eventos){
        $scope.events = response.eventos;
        var cont = $scope.events.length;
        for(var i=0; i < cont; i++){

          var fecha = new Date().getTime() - $scope.dateBirthday.getTime();
          var edad = parseInt(fecha/31556900000);
          console.log($scope.events[i].categoria);
          var contCat =parseInt($scope.events[i].categoria-1);
          console.log($scope.categoria[contCat]);
          console.log("edad: "+edad);
          var rango = $scope.categoria[contCat]; 

          var gen = 1;

          if( $scope.userGenderE == "Masculino"){
            gen = 1;
          }else{
            gen = 2;
          }
          if(parseInt(edad) >= parseInt(rango.min)   
            && parseInt(edad) <= parseInt(rango.max) 
            && parseInt(gen) == parseInt($scope.events[i].genero)){
            $scope.ingresarDato($scope.events[i]);
          }
        }
      }
    }
   }).error( function (response) {
   });

   }
  
  $scope.ingresarDato = function(item){
    $http({
     url: '/tipo/'+item.tipo,
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    console.log(item.categoria);
    console.log($scope.categoria[parseInt(item.categoria)-1]);
    if(response.statusCode = "200")
    {
          $scope.eventMod.push({id:item._id, nombre: item.nombre, tipo_evento:response.tipo.nombre,tipoEvento:item.tipo,genero:$scope.generos[parseInt(item.genero-1)].nombre, categoria:$scope.categoria[parseInt(item.categoria-1)].name});
    }
   }).error( function (response) {
    console.log(JSON.stringify(response));
   });
  }

  $scope.add = function(item){
    var cont = $scope.list.length;
    var id_Atleta = $scope.id;
    for(var i = 0; i<cont; i++){
      $http({
         url: '/atleta/'+id_Atleta+'/evento/'+$scope.list[i]+'/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          },
           data: {      
             hit     : 0,
             tiempo  : 0,
             carril: 0
           }
       }).success(function (response) {
          $scope.showMessage = "true";  
          $scope.message = "se agrego los eventos correctamente"; 
       }).error( function (response) {
          $scope.showMessage = "true";  
          $scope.message = "NO se agrego los eventos correctamente"; 
       });
  }
}

  $scope.toggle = function (item, list) {
    var idx = $scope.list.indexOf(item.id);
    if (idx > -1) $scope.list.splice(idx, 1);
    else $scope.list.push(item.id);
  };
  $scope.exists = function (item, list) {
    return $scope.list.indexOf(item.id) > -1;
  };


});