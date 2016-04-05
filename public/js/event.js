app.controller('eventCtrl', function($scope,$mdSidenav,$mdDialog, $mdMedia,
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
  $scope.programa = [];

  tmpTeam = Servicios.equipos();
  tmpTeam.then(function(response){
    if(response.statusCode = "200"){
      if(response.equipos){
        var cant = response.equipos.length;
        for(var i=0; i<cant; i++){
          $scope.equipos.push(response.equipos[i]._id);
        }
      }
    }
  });

  $scope.equipos = [];

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


  var largo = $scope.programa.length;
  for(var u = 0; u<largo; u++){
    if($scope.programa[u] != null){
     alasql('SELECT * INTO XLSX("EntryList'+u+'.xlsx",{headers:true}) FROM ? ',
      [$scope.programa[u]]);
    }
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

$scope.programa = function(){
  var k = $scope.list.length;
  $scope.programa = new Array(k);
  for(var i = 0; i<k; i++){ 
    tmp = Servicios.evento($scope.list[i]);
    tmp.then(function(eventt){
      //console.log(JSON.stringify(eventt));
      tmptwo = Servicios.AtletasEvento(eventt.evento._id);
      tmptwo.then(function(atletas){
        //console.log(JSON.stringify(atletas));
        var idx = $scope.list.indexOf(eventt.evento._id);
        $scope.ingresarAtletas(atletas,idx,eventt.evento.carriles);
      });
    });
  }
}

$scope.ingresarAtletas = function(atleta, id,carriles){
    console.log(JSON.stringify(atleta));
    var cont = atleta.atletas.length;
    var atle = atleta.atletas;
    var carril = carriles;
    var auxCarril = 1;
    var hit = 1;
    var evento = [];
    for(var i=0; i<cont; i++){
      tmptwo = Servicios.NombreEquipo(atle[i].atleta.equipo);
      tmptwo.then(function(equipo){
        var fecha = new Date().getTime() - atle[i].atlet.nacimiento.getTime();
        var edad = parseInt(fecha/31556900000);
        var tiempoE = "";
        if(parseInt(atle[i].tiempo) <=0) tiempoE = "NT";
        else tiempoE = $scope.getMin(atle[i].tiempo)+":"+$scope.getSeg(atle[i].tiempo)+":"+$scope.getMs(eventoArray.tiempo);
              
        evento.push.apply(
          {serie:hit,
           nombre:atle[i].atleta.nombre+" "+atle[i].atleta.apellido,
           edad:edad, 
           equipo:equipo.equipo.nombre, 
           time:tiempoE});
      });
    }
    $scope.programa[id].push(evento);
}


  $scope.nombreGenero = function(_id){
    generos = [
      {_id: 1,nombre : "Masculino" },
      {_id: 2,nombre : "Femenino" }
    ];
    return generos[parseInt(_id)-1].nombre;
  }

  $scope.nombreTipo= function(id){
    tmpNameType = Servicios.tipoEvento(id);
    tmpNameType.then(function(response){
      if(response.statusCode = "200")
      {
        return response.tipo.nombre;
      }
    }).catch(function (error) {
        $scope.showAlert("Disculpe los inconveniente!! intenta mas tarde");
    });
  }

  tmpEvent = Servicios.equipos();
  tmpEvent.then(function(response){
    if(response.statusCode = "200"){
      if(response.eventos){
        $scope.events = response.eventos;
      }
    }
  });

$scope.deleteEvent =function(id){
  tmpLogin = Servicios.eliminarEvento(id);
  tmpLogin.then(function(response){
    if(response.statusCode = "200")
    {
      document.getElementById("event"+id).style.display = "none";
    }else{
      $scope.showAlert("No se pudo eliminar el Evento");
    }
  }).catch(function (error) {
      $scope.showAlert("Disculpe los inconveniente!! intenta mas tarde");
  });
}

  $scope.menu = menu;


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
  $scope.createEvent = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller  : createEventController,
      templateUrl : '../templates/createEvent.html',
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


  $scope.editEvent = function(item) {
  
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/editEvent.html',
      controller  : EditEventController,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals      : { item:item}
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
      templateUrl : '../templates/editEventTime.html',
      controller  : EditTimeController,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals      : { item:item}
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
      templateUrl : '../templates/viewEventTime.html',
      controller  : ViewEventTimeController,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals      : { item:item}
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


});
