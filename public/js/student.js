app.controller('addStudentCreateCtrl', function($scope,$mdDialog,$http,$cookies) {
  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.team = [];
  $scope.generos = [];
  $scope.dateBirthday = '';


  $scope.generos = [
    {_id: 1,nombre : "Masculino" },
    {_id: 2,nombre : "Femenino" }
  ];
  $scope.userGenderE = $scope.generos[0];

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
    }
        $scope.userTeam = $scope.team[0];
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

$scope.createStudent =function(){
  var token = $cookies.get('token');
    if($scope.fisrtName != ''  && $scope.lastName != '' &&
    $scope.dateBirthday != '' && $scope.userGenderE != ''&&
    $scope.userTeamE != '')
    {
       $http({
         url: '/atletas/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
         data: {
           nombre: $scope.fisrtName,
           apellido: $scope.lastName,
           nacimiento: $scope.dateBirthday.getTime(),
           genero: $scope.userGender ,
           equipo: $scope.userTeam._id
         }
       }).success(function (response) {
        
        if(response.statusCode = "200"){
          $scope.showMessage = "true";  
          $scope.message = "Atleta creado"; 
          $scope.fisrtName = ''  
          $scope.lastName = '';
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el Atleta"; 
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

});
app.controller('addStudentEditCtrl', function($scope,$mdDialog,$http,$cookies) {
  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.team = [];
  $scope.generos = [];
   $scope.user = {
      fisrtName   : '',
      lastName   : '',
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

   

$scope.studentEdit =function(){
  if($scope.fisrtName != ''  && $scope.lastName != '' &&
    $scope.dateBirthday != '' && $scope.userGenderE != ''&&
    $scope.userTeam != ''){

    console.log("genero: "+$scope.userGenderE._id);
    var token = $cookies.get('token');
     $http({
       url: '/atletas/'+$scope.id+'/save',
       method: 'POST',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
        data: {
           nombre: $scope.fisrtName,
           apellido: $scope.lastName,
           nacimiento: $scope.dateBirthday.getTime(),
           genero: $scope.userGenderE._id ,
           equipo: $scope.userTeam._id
         }
     }).success(function (response) {
        if(response.statusCode = "200")
        {
            $scope.showMessage = "true";  
            $scope.message = "Se edito el Atleta"; 
        }else{
            $scope.showMessage = "true";  
            $scope.message = "No se pudo editar el Atleta"; 
        }
     }).error( function (response) {
            $scope.showMessage = "true";  
            $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
     });
  }else{
        $scope.showMessage = "true";  
        $scope.message = "complete el formulario"; 

  }
}


});
app.controller('addStudentAsignarCtrl', function($scope,$mdDialog,$http,$cookies) {
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
          var rango = $scope.categoria[contCat]; 

          var gen = 1;

          if( $scope.userGenderE = "Masculino"){
            gen = 1;
          }else{
            gen = 2;
          }
          if(parseInt(edad) >= parseInt(rango.min)   
            && parseInt(edad) <= parseInt(rango.max) 
            && parseInt(gen) == parseInt($scope.events[i].genero-1)){
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
        if(parseInt(item.genero)==1){
          $scope.eventMod.push({id:item._id, nombre: item.nombre, tipo_evento:response.tipo.nombre,tipoEvento:item.tipo,genero:"Masculino", categoria:$scope.categoria[parseInt(item.categoria-1)].name});
        }else{
          $scope.eventMod.push({id:item._id, nombre: item.nombre, tipo_evento:response.tipo.nombre,tipoEvento:item.tipo,genero:"Femenino", categoria:$scope.categoria[parseInt(item.categoria-1)].name});
        }
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
app.controller('addStudentCtrl', function($scope,$mdSidenav,$mdDialog, $mdMedia,$mdBottomSheet,$http,$cookies) {

  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.showSearch = false;

  $scope.student = [];
  $scope.list = [];
  

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
        $scope.student = response.atletas;
      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

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



$scope.enable =function(id){
  var token = $cookies.get('token');
       $http({
         url: '/atletas/'+id,
         method: 'DELETE',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          }
       }).success(function (response) {
        if(response.statusCode = "200")
        {
          document.getElementById("student"+id).style.display = "none";
          //$scope.showAlert("se dio de baja al Atleta");
        }else{
          $scope.showAlert("No se pudo dar de baja al Atleta");
        }
       }).error( function (response) {
          $scope.showAlert("Disculpe los inconveniente!! intenta mas tarde");
       });
}


  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showAlert = function(msj) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('swimWorldWeb')
          .textContent(msj)
          .ariaLabel('Alert Dialog Demo')
          .ok('Aceptar')
      );
    };

  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller  : DialogController,
      templateUrl : '../templates/student.tmpl.html',
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

  $scope.showEditStudentAdvance = function(item) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/studentEdit.tmpl.html',
      controller  : EditController,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals: {item:item}
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
  $scope.AsignarEventos = function(item) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/studentAsignar.tmpl.html',
      controller  : AsignarController,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals: {item:item}
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

function EditController($scope, $mdDialog,item) { 
  $scope.fisrtName = item.nombre;
  $scope.lastName = item.apellido;
  $scope.dateBirthday = new Date(item.nacimiento)
  $scope.equipo = item.equipo;
  $scope.userGenderE = '';
  console.log("genero: "+item.genero);
  $scope.gen = item.genero ;
  $scope.id = item._id;


}


function AsignarController($scope, $mdDialog,item) { 
  $scope.fisrtName = item.nombre;
  $scope.lastName = item.apellido;
  $scope.dateBirthday = new Date(item.nacimiento)
  $scope.equipo = item.equipo;
  $scope.userGenderE = '';
  console.log("genero: "+item.genero);
  $scope.gen = item.genero ;
  $scope.id = item._id;


}
