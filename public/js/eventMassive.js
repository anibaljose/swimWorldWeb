app.controller('eventoMasivoCtrl', function($scope,$http,$cookies,Servicios,$mdSidenav,$mdDialog, $mdMedia,
  $mdBottomSheet) {
  
  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.items = [];
  $scope.userEvent = '';
  $scope.dateBirthday = '';
  $scope.nombreEvent = ''; 
  $scope.fromEvent = ''; 
  $scope.carril = ''; 
  $scope.userAtletas = [];
  $scope.userGenderE = [];
  $scope.list = [];
  $scope.listTwo = [];
  $scope.listThree = [];
  $scope.selected = []; 
  $scope.eventType = [];
  $scope.orden = '';
  $scope.events = [];

  $scope.categoria = [{_id:1,nombre:"BEBES",min:0,max:4},
  {_id:2,nombre:"MENORES",min:5,max:6},{_id:3,nombre:"PRE INFANTIL",min:7,max:8},
  {_id:4,nombre:"INFANTIL A",min:9,max:10},{_id:5,nombre:"INFANTIL B",min:11,max:12},
  {_id:6,nombre:"JUEVENIL A",min:13,max:14},{_id:7,nombre:"JUEVENIL B",min:15,max:18},
  {_id:8,nombre:"SENIOR",min:19,max:24},{_id:9,nombre:"MASTER A",min:25,max:30},
  {_id:10,nombre:"MASTER B",min:31,max:36},{_id:11,nombre:"MASTER C",min:37,max:41},
  {_id:12,nombre:"MASTER D",min:42,max:52},{_id:13,nombre:"MASTER E",min:53,max:99}]

  $scope.generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];

  tmpEventType = Servicios.tipoEventos();
  tmpEventType.then(function(response){
    if(response.statusCode = "200"){
      if(response.tipos){
        $scope.eventType = response.tipos;
      }
    }
  });

  $scope.eventTyp = function (){
    $scope.eventTyp
    return 
  }
  $scope.toggle = function (item, list) {
    var idx = $scope.list.indexOf(item);
    if (idx > -1) $scope.list.splice(idx, 1);
    else $scope.list.push(item);
  };
  $scope.exists = function (item, list) {
    return $scope.list.indexOf(item) > -1;
  };


  $scope.toggleTwo = function (item, list) {
    var idx = $scope.listTwo.indexOf(item);
    if (idx > -1) $scope.listTwo.splice(idx, 1);
    else $scope.listTwo.push(item);
  };
  $scope.existsTwo = function (item, list) {
    return $scope.listTwo.indexOf(item) > -1;
  };


  $scope.toggleThree = function (item, list) {
    var idx = $scope.listThree.indexOf(item);
    if (idx > -1) $scope.listThree.splice(idx, 1);
    else $scope.listThree.push(item);
  };
  $scope.existsThree = function (item, list) {
    return $scope.listThree.indexOf(item) > -1;
  };

  $scope.createEventSimple = function () {
    var cont1 =  $scope.list.length;//tipo evento
    var cont2 =  $scope.listTwo.length;//genero
    var cont3 =  $scope.listThree.length;//categoria
    eventAux = [];
    for(var i = 0; i< cont1; i++){//tipo evento
      for(var j =0; j < cont3; j++){//categoria
        for(var k = 0; k < cont2; k++){//genero
          $scope.events.push(
            {
              id        : conteo,
              tipo      : $scope.list[i].nombre,
              id_tipo   : $scope.list[i]._id,
              genero    : $scope.listTwo[k].nombre,
              id_genero : $scope.listTwo[k]._id,
              categoria : $scope.listThree[j].nombre,
              id_categoria : $scope.listThree[j]._id,

            });
           conteo++;
        }
      } 
    }
    console.log(JSON.stringify($scope.events));
  };

  $scope.deleteItem = function(item){
    conteo = 1;
    var idx = $scope.events.indexOf(item);
    if (idx > -1) $scope.events.splice(idx, 1);
  };


  $scope.createEventos =function(){

    if($scope.nameEvent != '' && $scope.fromEvent != '' && $scope.dateBirthday != ''){
      tmpEvent = Servicios.crearEvento($scope.nameEvent,$scope.fromEvent,$scope.dateBirthday.getTime());
      tmpEvent.then(function(response){
        console.log(JSON.stringify(response));
        if(response.statusCode = "200"){
          var cont1 =  $scope.events.length;
          var conteoAux = 1; 
          var id_evento = response._id;
          for(var i = 0; i< cont1; i++){
            var item = $scope.events[i];
            $scope.createSubEvent(conteoAux,item.id_genero,$scope.carril,item.id_categoria,
              item.id_tipo,id_evento);
            conteoAux++; 
          }

        $scope.showAlert("evento creado exitosamente");
        }
      });
    }else{
      $scope.showAlert("llene el formulario");
    }
    
  
  }

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

  $scope.createSubEvent =function(orden, genero,carriles,categoria,tipoEvento, evento){
    tmpEvent = Servicios.crearSubEvento(orden, genero,carriles,categoria,tipoEvento, evento);
    tmpEvent.then(function(response){

    });
  }
 $scope.menu = menu;

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
});
