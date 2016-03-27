app.controller('teamCrtl', function($scope,$mdSidenav,$mdDialog, $mdMedia,
  $mdBottomSheet,$http,$cookies,Servicios) {

  if(!$cookies.get('token')){
    window.location = "#/login";
  }
  $scope.showSearch = false;
  $scope.menu = menu;
  $scope.person = [];
   
  tmpTeam = Servicios.equipos();
  tmpTeam.then(function(response){
    if(response.statusCode = "200"){
      if(response.equipos){
        $scope.person = response.equipos;
      }
    }
  });
   
$scope.deleteTeam =function(id){
  tmpTeamDelete = Servicios.eliminarEquipo(id);
  tmpTeamDelete.then(function(response){
    if(response.statusCode = "200")
    {
        document.getElementById("team"+id).style.display = "none";
    }else{
        $scope.showAlert("No se pudo eliminar de baja al Atleta");
    }
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

  $scope.createTeam = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller  : createTeamController,
      templateUrl : '../templates/createTeam.html',
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

  $scope.edtiTeam = function(id,nombre) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/editTeam.html',
      controller  : editTeamController,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals      : { nombre: nombre, id:id }
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
