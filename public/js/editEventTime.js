app.controller('editEventTimeCtrl', function($scope,$mdDialog,$http,$cookies) {
  
  $scope.items = [];
  $scope.userAtletas = [];


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

  $scope.tiempos = function () {
    var cont = $scope.items.length;
    for(var i = 0; i<cont; i++){
      document.getElementById("min"+$scope.items[i].atleta._id).value = ""+$scope.getMin($scope.items[i].tiempo);
      document.getElementById("seg"+$scope.items[i].atleta._id).value = ""+$scope.getSeg($scope.items[i].tiempo);
      document.getElementById("ms"+$scope.items[i].atleta._id).value = ""+$scope.getMs($scope.items[i].tiempo);
    
    }
  };

    
$scope.getMin = function(min){
  var minutes = Math.floor( min / 60000  );  
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return minutes;
}
$scope.getSeg = function(seg){
  var segundes = Math.floor( (seg % 60000) / 1000 );  
  segundes = segundes < 10 ? '0' + segundes : segundes;
  return segundes;
}
$scope.getMs = function(ms){
  var milesimas = Math.floor( ms % 1000 );  
  milesimas = milesimas < 10 ? '0' + milesimas : milesimas;
  return milesimas;
}
$scope.editEventTime =function(){
  var token = $cookies.get('token');
    if($scope.id_Evento!= '')
    {
      var cont = $scope.items.length;
      var id_Evento = $scope.id_Evento;
      var id_tipo_Evento = $scope.id_Tipo_Evento;
      var id_atleta = '';
      for(var i = 0; i<cont; i++){
         time = parseInt(document.getElementById("min"+$scope.items[i].atleta._id).value)*60000 
          + parseInt(document.getElementById("seg"+$scope.items[i].atleta._id).value)*1000 
          + parseInt(document.getElementById("ms"+$scope.items[i].atleta._id).value);
          id_atleta = $scope.items[i].atleta._id;

        $http({
           url: '/atleta/'+id_atleta+'/subeventos/'+id_Evento+'/save',
           method: 'POST',
            headers : { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token
            },
             data: {    
               tiempo  : time,
             }
         }).success(function (response) {
            if(response.statusCode = "200"){  
            
            }
         }).error( function (response) {
         });
      }
      $scope.editTiempos();
    }else{
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
    }
}


$scope.editCarril =function(){
  var token = $cookies.get('token');
    if($scope.id_Evento!= '')
    {
      var cont = $scope.items.length;
      var id_Evento = $scope.id_Evento;
      var id_tipo_Evento = $scope.id_Tipo_Evento;
      var id_atleta = '';
      var carriles = $scope.carriles;
      var carril = 1;
      var hit = 1;
      for(var i = 0; i<cont; i++){

        id_atleta = $scope.items[i].atleta._id;

        $http({
           url: '/atleta/'+id_atleta+'/subeventos/'+id_Evento+'/save',
           method: 'POST',
            headers : { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token
            },
             data: {    
               hit     : hit,  
               carril  : carril
             }
         }).success(function (response) {
            if(response.statusCode = "200"){  
              $scope.showMessage = "true";  
              $scope.message = "actualizacion de carriles exitosa"; 
            }else{
              $scope.showMessage = "true";  
              $scope.message = "actualizacion de carriles No exitosa"; 
            }
         }).error( function (response) {
         });
         if(carril > carriles){
            carril = 1;
            hit++;
         }
         carril++;
      }
    }else{
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
    }
}

$scope.editTiempos = function(){
    var token = $cookies.get('token');
      var cont = $scope.items.length;
      var id_Evento = $scope.id_Evento;
      var id_tipo_Evento = $scope.id_Tipo_Evento;
      var id_atleta = '';
      var time = 0;
      for(var i = 0; i<cont; i++){
         time = parseInt(document.getElementById("min"+$scope.items[i].atleta._id).value)*60000 
          + parseInt(document.getElementById("seg"+$scope.items[i].atleta._id).value)*1000 
          + parseInt(document.getElementById("ms"+$scope.items[i].atleta._id).value);
          id_atleta = $scope.items[i].atleta._id;

         $http({
           url: '/tiempos/save',
           method: 'POST',
            headers : { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token
            },
             data: {      
              atleta: id_atleta, 
              tipoEvento: id_tipo_Evento, 
              tiempo: time
             }
         }).success(function (response) {
            if(response.statusCode = "200"){
              $scope.showMessage = "true";  
              $scope.message = "edicion exitosa"; 
            }
         }).error( function (response) {
         });
    }
}
  $scope.cancel = function() {
    location.reload();
    $mdDialog.cancel();
  };

});
