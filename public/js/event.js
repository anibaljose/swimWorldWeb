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
  $scope.list = [];
  $scope.selected = []; 
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
           nombre:$scope.nameEvent  ,
           lugar: $scope.fromEvent,
           fecha: $scope.dateBirthday.getTime(),
           carriles: $scope.carril,
           tipo: $scope.userEvent
         }
       }).success(function (response) {
        
        if(response.statusCode = "200"){

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
                   tiempo  : 60,
                   carril: 4
                 }
             }).success(function (response) {
             }).error( function (response) {
             });
          }
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

  $http({
     url: '/atletas',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
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
    }
   }).error( function (response) {
   });

/*traer atletasel ordenado de menor a mayor segun el evento
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
    console.log(JSON.stringify(response));
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

   */

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
     url: '/eventos/'+$scope.id_Evento+'/atletas',
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

$scope.deleteEvent =function(item){
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
      $scope.showMessage = "true";  
      $scope.message = "Se elimino un atleta"; 
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
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
           tipo: $scope.userEvent._id
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
                   tiempo  : 30,
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

  $http({
     url: '/eventos/'+$scope.id_Evento+'/atletas',
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
           tipo: $scope.userEvent._id
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
                   tiempo  : 30,
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

});

app.controller('addEventCtrl', function($scope,$mdSidenav,$mdDialog, $mdMedia,$mdBottomSheet,$http,$cookies) {

  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.showSearch = false;
  $scope.events = [];

  
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
      $scope.showAlert("se elimino el Evento");
      location.reload();
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
  console.log(item);
  $scope.id_Evento = item._id;
  $scope.id_Tipo_Evento = item.tipo;
}

function EditTimeControllers($scope, $mdDialog,item) { 
  console.log(item);
  $scope.nombre = item.nombre;
  $scope.id_Evento = item._id;
  $scope.id_Tipo_Evento = item.tipo;
}
