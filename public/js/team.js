app.controller('addTeamCreateCtrl', function($scope,$mdDialog,$http,$cookies) {
  $scope.createTeam =function(){
  var token = $cookies.get('token');
    if($scope.user.name != '')
    {
       $http({
         url: '/equipos/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
         data: {
           nombre: $scope.user.name
         }
       }).success(function (response) {
        if(response.statusCode = "200"){
          $scope.user.name = '';
          $scope.showMessage = "true";  
          $scope.message = "Equipo creado"; 
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el equipo"; 
        }
       }).error( function (response) {
          $scope.showMessage = "true";  
          $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
       });
    }else{
      $scope.showMessage = "true";  
      $scope.message = "Por favor, ingrese un nombre"; 
    }
}
  $scope.cancel = function() {
  location.reload();
    $mdDialog.cancel();
  };

});

app.controller('addTeamEditCtrl', function($scope,$mdDialog,$http,$cookies) {
  $scope.EditTeam =function(){
  if($scope.nombre != ''){
    var token = $cookies.get('token');
     $http({
       url: '/equipos/'+$scope.id+'/save',
       method: 'POST',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
        data: {
           nombre: $scope.nombre
         }
     }).success(function (response) {
        if(response.statusCode = "200")
        {
            $scope.showMessage = "true";  
            $scope.message = "Se edito el equipo"; 
        }else{
            $scope.showMessage = "true";  
            $scope.message = "No se pudo editar el equipo"; 
        }
     }).error( function (response) {
            $scope.showMessage = "true";  
            $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
     });
  }else{
        $scope.showMessage = "true";  
        $scope.message = "Ingresa un nombre, por favor"; 

  }
}
  $scope.cancel = function() {
  location.reload();
    $mdDialog.cancel();
  };


});


app.controller('addteamCrtl', function($scope,$mdSidenav,$mdDialog, $mdMedia,$mdBottomSheet,$http,$cookies) {

  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.showSearch = false;

  $scope.person = [];
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
        $scope.person = response.equipos;
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




$scope.deleteTeam =function(id){
  var token = $cookies.get('token');
   $http({
     url: '/equipos/'+id,
     method: 'DELETE',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
   }).success(function (response) {
      if(response.statusCode = "200")
      {
        document.getElementById("team"+id).style.display = "none";
        //$scope.showAlert("se eliminino el equipo");
      }else{
        $scope.showAlert("No se pudo eliminar de baja al Atleta");
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
      templateUrl : '../templates/team.tmpl.html',
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

  $scope.showEditAdvance = function(id,nombre) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/teamEdit.tmpl.html',
      controller  : EdtirController,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals: { nombre: nombre, id:id }
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

function DialogController($scope, $mdDialog) {
}

function EdtirController($scope, $mdDialog,$cookies,$http,nombre,id) { 
  $scope.nombre = nombre;
  $scope.id = id;

}