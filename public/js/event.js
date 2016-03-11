app.controller('addEventCreateCtrl', function($scope,$mdDialog,$http,$cookies) {
  
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

app.controller('addEventEditCtrl', function($scope,$mdDialog,$http,$cookies) {
  
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
app.controller('addEventEditTimeCtrl', function($scope,$mdDialog,$http,$cookies) {
  
  $scope.items = [];
  $scope.userAtletas = [];

  var token = $cookies.get('token');
  $http({
     url: '/tiempos',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
   }).success(function (response) {
      if(response.statusCode = "200"){
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
           url: '/atleta/'+id_atleta+'/evento/'+id_Evento+'/save',
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
           url: '/atleta/'+id_atleta+'/evento/'+id_Evento+'/save',
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

app.controller('addEvenViewTimeCtrl', function($scope,$mdDialog,$http,$cookies) {
  
  $scope.items = [];
   $http({
     url: '/eventos/atletas/'+$scope.id_Evento,
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      },
      params:{
        sort : true
      }

   }).success(function (response) {
    if(response.statusCode ="200"){
      $scope.items = response.atletas;
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

  
   
  $scope.tiempos = function () {
    var cont = $scope.items.length;
    var html = "";
    for(var i = 0; i<cont; i++){
      html += "<div>"+(i+1)+"). "+$scope.items[i].atleta.nombre+" "+$scope.items[i].atleta.apellido+"--"+$scope.getMin($scope.items[i].tiempo)
                      +":"+$scope.getSeg($scope.items[i].tiempo)
                      +":"+$scope.getMs($scope.items[i].tiempo)+"</div>";
    
    }
    document.getElementById("tiempos").innerHTML = html;
  };


  $scope.load = function(){
    var nombreTipoEvento = "";
    $http({
     url: '/tipo/'+$scope.id_Tipo_Evento,
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }

   }).success(function (response) {
    if(response.statusCode ="200"){
      nombreTipoEvento = response.tipo.nombre;
      var data = [], fontSize = 8, height = 0, doc;
      doc = new jsPDF('p', 'pt', 'a4', true);
      doc.setFont("times", "normal");
      doc.setFontSize(fontSize);
      doc.text(100,10,"Evento: "+$scope.nombre);
      doc.text(100,20,"Tipo Evento: "+nombreTipoEvento);
      data = [];
      var cont = $scope.items.length;
      for(var i = 0; i<cont; i++){
          data.push({
              "Nombre" : $scope.items[i].atleta.nombre.toLowerCase()+" "+$scope.items[i].atleta.apellido.toLowerCase(),
              "Tiempo (mm:ss:ms)" : $scope.getMin($scope.items[i].tiempo)
                        +":"+$scope.getSeg($scope.items[i].tiempo)
                        +":"+$scope.getMs($scope.items[i].tiempo)
          });
      
      }
      height = doc.drawTable(data, {
        xstart : 0,
        ystart : 100,
        tablestart : 40,
        marginright :5,
        xOffset : 0,
        yOffset : 20,
        columnWidths:[0,0,0,0]
      });
      doc.save("tiemposFinales.pdf");
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });


  }

    
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
  $scope.cancel = function() {
    location.reload();
    $mdDialog.cancel();
  };

});

app.controller('addEventCtrl', function($scope,$mdSidenav,$mdDialog, $mdMedia,
  $mdBottomSheet,$http,$cookies,Servicios) {

  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.showSearch = false;
  $scope.events = [];
  $scope.list = [];
  $scope.orden = 0;
  $scope.EntryFinal = [];
  $scope.student = [];

  $scope.equipos = [];
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
        var cant = response.equipos.length;
        for(var i=0; i<cant; i++){
          $scope.equipos.push(response.equipos[i]._id);
        }

      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

  $scope.toggle = function (item,selected) {
    var idx = $scope.list.indexOf(item._id);
    if (idx > -1) $scope.list.splice(idx, 1);
    else $scope.list.push(item._id);
  };
  $scope.exists = function (item,selected) {
    return $scope.list.indexOf(item._id) > -1;
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
  $scope.EliminarMasivo = function(){

    var cont = $scope.list.length;
    for(var i = 0; i<cont; i++){
      $scope.deleteEvent($scope.list[i]);
    }
  }

  $scope.ordenar = function(){
    console.log($scope.orden);
    conteo = parseInt($scope.orden);
  }

  $scope.SeleccionarTodos = function(){
    var cont = $scope.events.length;
    for(var i=0; i < cont; i++){
      $scope.list.push($scope.events[i]._id);
    }
  }

  $scope.EntryList = function(){
    var eventoArray =[];
    var contAtletas = 0;
     $http({
       url: '/atletas/',
       method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+$cookies.get('token')
        }
     }).success(function (response) {
      if(response.statusCode = "200"){
        if(response.atletas){
          contAtletas = response.atletas.length;
          for(var i = 0; i< contAtletas; i++){
           $scope.student.push(response.atletas[i]._id);
          }
          /**eventos en los que participan cada atleta*/
          $http({
           url: '/eventos/atletas',
           method: 'GET',
            headers : { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+$cookies.get('token')
            },
            params:{
              eventos : $scope.list,
              sort : true
            }

         }).success(function (response) {
          if(response.statusCode ="200"){
            console.log(JSON.stringify(response));
            var contEntry = response.atletas.length;
            $scope.EntryFinal = new Array(contAtletas);

            for(var j = 0; j <contEntry; j++){
              eventoArray = response.atletas[j];
              var idx = $scope.student.indexOf(eventoArray.atleta._id);
              $scope.setEntry(eventoArray,idx);
            }

          }
         }).error( function (response) {
            console.log(JSON.stringify(response));
         });
         /*fin http entry list*/
        }
      }
     }).error( function (response) {
     });

}

$scope.setEntry = function(eventoArray, i){
  
  var idx = i;
  tmp = Servicios.evento(eventoArray.evento);
  tmp.then(function(eventt){
    if(eventt.statusCode = "200")
    {

      tmpTipo = Servicios.Tipoevento(eventt.evento.tipo);
      tmpTipo.then(function(tipoo){
        if(tipoo.statusCode = "200")
        {
           var tiempoE = 0;
           if(parseInt(eventoArray.tiempo) <= 0) tiempoE = "NT";
           else tiempoE = $scope.getMin(eventoArray.tiempo)+":"+$scope.getSeg(eventoArray.tiempo)+":"+$scope.getMs(eventoArray.tiempo);
           if ($scope.EntryFinal[idx]){
             $scope.EntryFinal[idx].eventos.push(
              {tipo:"#"+eventt.evento.numeroEvento+" "+tipoo.tipo.nombre ,tiempo:tiempoE});
            }else{
              var eventos = [];
              var fecha = new Date().getTime() - eventoArray.atleta.nacimiento;
              var edad = parseInt(fecha/31556900000);
              var tiempoE = 0;
              if(parseInt(eventoArray.tiempo) <=0) tiempoE = "NT";
              else tiempoE = $scope.getMin(eventoArray.tiempo)+":"+$scope.getSeg(eventoArray.tiempo)+":"+$scope.getMs(eventoArray.tiempo);
              eventos.push({tipo:"#"+eventt.evento.numeroEvento+" "+tipoo.tipo.nombre ,tiempo:tiempoE});
              $scope.EntryFinal[idx] = 
              {nombre:eventoArray.atleta.nombre +" "+eventoArray.atleta.apellido,
              edad:edad,
              equipo:eventoArray.atleta.equipo,
              genero: eventoArray.atleta.genero,
              eventos:eventos};
            }
        }
      });
     }
  });
}

$scope.EntryListFinall = function(){
  console.log(JSON.stringify($scope.EntryFinal));
  var cant =  $scope.EntryFinal.length;
  var cantTwo = $scope.equipos.length;
  Arrayequipos = new Array(cantTwo);
  
  var par = 1;
  for(var i =0; i<cant; i++){
    if($scope.EntryFinal[i] != null){
      var fin = [];
      var genero  = $scope.nombreGenero($scope.EntryFinal[i].genero);
      fin.push({individuales:(i+1)+" "+$scope.EntryFinal[i].nombre+" - "+genero+" - Age: "+$scope.EntryFinal[i].edad, "time": ""});
      var evnt =  $scope.EntryFinal[i].eventos.length;
      for(var j =0; j<evnt; j++){
          fin.push({individuales:$scope.EntryFinal[i].eventos[j].tipo+" "+genero,"time":$scope.EntryFinal[i].eventos[j].tiempo});      
      }
      var idx = $scope.equipos.indexOf($scope.EntryFinal[i].equipo);
      if (Arrayequipos[idx]){
          Arrayequipos[idx].equipo.push.apply(Arrayequipos[idx].equipo[0],fin);
      }else{
          var equipo = [];
          equipo.push(fin);
          Arrayequipos[idx] = {equipo:equipo};
      }
    }
  }
  console.log(JSON.stringify(Arrayequipos));
  var largo = Arrayequipos.length;
  for(var u = 0; u<largo; u++){
    var arrayEquipoo = [];
    if(Arrayequipos[u] != null){
     alasql('SELECT * INTO XLSX("EntryList'+u+'.xlsx",{headers:true}) FROM ? ',
      [Arrayequipos[u].equipo[0]]);
    }
  }
}
$scope.programa = function(){
  var k = $scope.list.length;
  for(int i = 0; i<k; i++){ 
    tmp = Servicios.evento($scope.list[i]);
    tmp.then(function(eventt){
      console.log(JSON.stringify(eventt));
    });
  }
}
$scope.nombreCategoria = function(_id){
  categoria = [{id:1,name:"BEBES",min:0,max:4},
  {id:2,name:"MENORES",min:5,max:6},{id:3,name:"PRE INFANTIL",min:7,max:8},
  {id:4,name:"INFANTIL A",min:9,max:10},{id:5,name:"INFANTIL B",min:11,max:12},
  {id:6,name:"JUEVENIL A",min:13,max:14},{id:7,name:"JUEVENIL B",min:15,max:18},
  {id:8,name:"SENIOR",min:19,max:24},{id:9,name:"MASTER A",min:25,max:30},
  {id:10,name:"MASTER B",min:31,max:36},{id:11,name:"MASTER C",min:37,max:41},
  {id:12,name:"MASTER D",min:42,max:52},{id:13,name:"MASTER E",min:53,max:99},
  {id:13,name:"Agua Triner",min:19,max:99}]
  return categoria[_id-1].name;
}


$scope.nombreGenero = function(_id){
  generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];
  return generos[parseInt(_id)-1].nombre;
}

$scope.nombreTipo= function(id){
  $http({
     url: '/tipo/'+id,
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    //console.log(JSON.stringify(response));
    if(response.statusCode = "200")
    {

      return response.tipo.nombre;
    }
   }).error( function (response) {
     return 'Indefinido';
   });
}

$scope.deleteEvent =function(id){
  var token = $cookies.get('token');
   $http({
     url: '/eventos/'+id,
     method: 'DELETE',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
   }).success(function (response) {
    if(response.statusCode = "200")
    {
      document.getElementById("event"+id).style.display = "none";
      //$scope.showAlert("se elimino el Evento");
    }else{
      $scope.showAlert("No se pudo eliminar el Evento");
    }
   }).error( function (response) {
      $scope.showAlert("Disculpe los inconveniente!! intenta mas tarde");
   });
}
   $http({
     url: '/eventos',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    if(response.statusCode = "200"){
      if(response.eventos){
        $scope.events = response.eventos;
      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });



$scope.deleteEvent =function(id){
  var token = $cookies.get('token');
   $http({
     url: '/eventos/'+id,
     method: 'DELETE',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
   }).success(function (response) {
    if(response.statusCode = "200")
    {
      document.getElementById("event"+id).style.display = "none";
      //$scope.showAlert("se elimino el Evento");
    }else{
      $scope.showAlert("No se pudo eliminar el Evento");
    }
   }).error( function (response) {
      $scope.showAlert("Disculpe los inconveniente!! intenta mas tarde");
   });
}
  $scope.menu = [
    {
      link : '#/student',
      title: 'Atleta',
      icon: 'fa-male'
    },
    {
      link : '#/team',
      title: 'Equipo',
      icon: 'fa-briefcase'
    },
    {
      link : '#/eventType',
      title: 'Tipo Evento',
      icon: 'fa-get-pocket'
    },
    {
      link : '#/event',
      title: 'Evento',
      icon: 'fa-star'
    },
    {
      link : '#/Masivo',
      title: 'Evento Masivo',
      icon: 'fa-star'
    },
    {
      link : '',
      title: 'Cerrar Sesion',
      icon: 'fa-times-circle'
    }
  ];


  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showAlert = function(msj) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('sosial')
          .textContent(msj)
          .ariaLabel('Alert Dialog Demo')
          .ok('Aceptar')
      );
    };
  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller  : DialogController,
      templateUrl : '../templates/event.tmpl.html',
      parent      : angular.element(document.body),
      targetEvent : ev,
      clickOutsideToClose:true,
      fullscreen  : useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };


  $scope.showEditAdvance = function(item) {
  
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/eventEdit.tmpl.html',
      controller  : EditControllers,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals: { item:item}
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };


  $scope.showEditTimeAdvance = function(item) {
  
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/eventEditTime.tmpl.html',
      controller  : EditTimeControllers,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals: { item:item}
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };
  $scope.showViewTimeAdvance = function(item) {
  
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/eventViewTime.tmpl.html',
      controller  : ViewTimeControllers,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals: { item:item}
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };
    $scope.showMobileMainHeader = true;
 
    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };

    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    $scope.go = function(locationPage){
      if(locationPage ==""){
        $cookies.remove('token');
        window.location = "#/login";
      }else{
        window.location = ""+locationPage;
      }
    }
    
    $scope.visibleSearch = function(){
      $scope.showSearch = !$scope.showSearch;
      $scope.search = '';
    }

  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

  $scope.person = [
      {
        name: 'Evento 1',
        birthDate: '',
        team: ''
      },
      {
        name: 'Evento 2',
        birthDate: '',
        team: ''
      },
      {
        name: 'Evento 3',
        birthDate: '',
        team: ''
      }
    ];
  $scope.alert = '';


});
app.config(function($mdThemingProvider) {
  var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});


function DialogController($scope, $mdDialog) {
}

function EditControllers($scope, $mdDialog,item) { 
  $scope.id_Evento = item._id;
  $scope.id_Tipo_Evento = item.tipo;
  $scope.Nocategoria = item.categoria;
  $scope.Nogenero = item.genero;
}

function EditTimeControllers($scope, $mdDialog,item) { 
  $scope.nombre = item.nombre;
  $scope.id_Evento = item._id;
  $scope.id_Tipo_Evento = item.tipo;
}


function ViewTimeControllers($scope, $mdDialog,item) { 
  $scope.carriles = item.carriles;
  $scope.nombre = item.nombre;
  $scope.id_Evento = item._id;
  $scope.id_Tipo_Evento = item.tipo;
}
