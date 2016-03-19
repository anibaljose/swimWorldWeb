app.controller('studentCtrl', function($scope,$mdSidenav,$mdDialog, $mdMedia,$mdBottomSheet,$http,$cookies) {

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
      link : '#/massive',
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

  $scope.createStudent = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller  : createController,
      templateUrl : '../templates/creaeStudent.html',
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
      templateUrl : '../templates/editStudent',
      controller  : editController,
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
function createController($scope, $mdDialog) {
}

function editController($scope, $mdDialog,item) { 
  $scope.fisrtName    = item.nombre;
  $scope.lastName     = item.apellido;
  $scope.dateBirthday = new Date(item.nacimiento)
  $scope.equipo       = item.equipo;
  $scope.userGenderE  = '';
  $scope.gen          = item.genero ;
  $scope.id           = item._id;
}


function assignStudentController($scope,item) { 
  $scope.fisrtName    = item.nombre;
  $scope.lastName     = item.apellido;
  $scope.dateBirthday = new Date(item.nacimiento)
  $scope.equipo       = item.equipo;
  $scope.userGenderE  = '';
  $scope.gen          = item.genero ;
  $scope.id           = item._id;
}
