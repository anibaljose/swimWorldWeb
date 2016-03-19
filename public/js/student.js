app.controller('studentCtrl', function($scope,$mdSidenav,$mdDialog, $mdMedia,$mdBottomSheet,
  $http,$cookies,Servicios) {

  if(!$cookies.get('token')){
    window.location = "#/login";
  }

  $scope.student = [];
  $scope.menu = menu;
  $scope.showSearch = false;
  
  tmpTipo = Servicios.atletas();
  tmpTipo.then(function(response){
    if(response.statusCode = "200"){
      if(response.atletas){
        $scope.student = response.atletas;
      }
    }
  });

  $scope.edad = function(nacimiento){
    var fecha = new Date().getTime() - nacimiento;
    return parseInt(fecha/31556900000);;
  }

  $scope.nombreGenero = function(_id){
    generos = [
      {_id: 1,nombre : "Masculino" },
      {_id: 2,nombre : "Femenino" },
      {_id: 3,nombre : "--------" }
    ];
    return generos[parseInt(_id)-1].nombre;
  }

  $scope.enable =function(id){
    tmpTipo = Servicios.atletas();
    tmpTipo.then(function(response){
      if(response.statusCode = "200")
      {
        document.getElementById("student"+id).style.display = "none";
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

  $scope.createStudent = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller  : createStudentController,
      templateUrl : '../templates/createStudent.html',
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

  $scope.editStudent = function(item) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/editStudent.html',
      controller  : editStudentController,
      parent      : angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen  : useFullScreen,
      locals      : {item:item}
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
  $scope.assignStudent = function(item) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      templateUrl : '../templates/assignStudent.html',
      controller  : assignStudentController,
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

});