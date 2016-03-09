app.controller('eventoMasivoCtrl', function($scope,$mdDialog,$http,$cookies) {
  
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
  $scope.categoria = [{_id:1,nombre:"BEBES",min:0,max:4},
  {_id:2,nombre:"MENORES",min:5,max:6},{_id:3,nombre:"PRE INFANTIL",min:7,max:8},
  {_id:4,nombre:"INFANTIL A",min:9,max:10},{_id:5,nombre:"INFANTIL B",min:11,max:12},
  {_id:6,nombre:"JUEVENIL A",min:13,max:14},{_id:7,nombre:"JUEVENIL B",min:15,max:18},
  {_id:8,nombre:"SENIOR",min:19,max:24},{_id:9,nombre:"MASTER A",min:25,max:30},
  {_id:10,nombre:"MASTER B",min:31,max:36},{_id:11,nombre:"MASTER C",min:37,max:41},
  {_id:12,nombre:"MASTER D",min:42,max:52},{_id:13,nombre:"MASTER E",min:53,max:99},
  {_id:14,nombre:"Agua Triner",min:19,max:99}]

  $scope.generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];

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
  



  $scope.toggle = function (item, list) {
    var idx = $scope.list.indexOf(item._id);
    if (idx > -1) $scope.list.splice(idx, 1);
    else $scope.list.push(item._id);
  };
  $scope.exists = function (item, list) {
    return $scope.list.indexOf(item._id) > -1;
  };


  $scope.toggleTwo = function (item, list) {
    var idx = $scope.listTwo.indexOf(item._id);
    if (idx > -1) $scope.listTwo.splice(idx, 1);
    else $scope.listTwo.push(item._id);
  };
  $scope.existsTwo = function (item, list) {
    return $scope.listTwo.indexOf(item._id) > -1;
  };


  $scope.toggleThree = function (item, list) {
    var idx = $scope.listThree.indexOf(item._id);
    if (idx > -1) $scope.listThree.splice(idx, 1);
    else $scope.listThree.push(item._id);
  };
  $scope.existsThree = function (item, list) {
    return $scope.listThree.indexOf(item._id) > -1;
  };

  $scope.createEventos =function(){

    var cont1 =  $scope.list.length;
    var cont2 =  $scope.listTwo.length;
    var cont3 =  $scope.listThree.length;
    var cont4 = 1;
    for(var i = 0; i< cont1; i++){//tipo evento
      for(var j =0; j < cont2; j++){//genero
        for(var k = 0; k < cont3; k++){//categoria
          $scope.createEvent(cont4, $scope.listTwo[j], $scope.list[i],$scope.listThree[k])
        }
      } 
      cont4++;
    }
  
  }

  $scope.createEvent =function(noOrden, genero, tipoEvento,categoria){
  var token = $cookies.get('token');
    if($scope.nameEvent != '' && $scope.fromEvent != '' 
      && $scope.carril != '' && $scope.dateBirthday )
    {
       $http({
         url: '/eventos/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          },
         data: {      
           nombre   : $scope.nameEvent  ,
           lugar    : $scope.fromEvent,
           fecha    : $scope.dateBirthday.getTime(),
           carriles : $scope.carril,
           tipo     : tipoEvento,
           categoria: categoria, 
           genero   : genero,
           numeroEvento: noOrden
         }
       }).success(function (response) {
        
        if(response.statusCode = "200"){
          $scope.showMessage = "true";  
          $scope.message = "Evento creado"; 
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
