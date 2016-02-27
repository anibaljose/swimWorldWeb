var app = angular.module('sosialApp', ['ngMaterial','ngCookies']);

app.controller('addStudentCtrl', function($scope,$mdSidenav,$mdDialog, $mdMedia,$mdBottomSheet,$http,$cookies) {

  $scope.showSearch = false;

  $scope.team = [];
  $scope.generos = [];
  $scope.student = [];
  $scope.userTeam = '';
  $scope.userGender = '';


   $scope.user = {
      fisrtName   : '',
      lastName   : '',
      dateBirthday : ''
   };

  $scope.generos.push({_id: 1,nombre : "Masculino" } );
  $scope.generos.push({_id: 2,nombre : "Femenino" } );

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
        $scope.team = response.atletas;
      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
      console.log(response);
   });


   $http({
     url: '/atletas',
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }
   }).success(function (response) {
    console.log(JSON.stringify(response));
    if(response.statusCode = "200"){
      if(response.atletas){
        $scope.student = response.atletas;
      }
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
      console.log(response);
   });


$scope.createStudent =function(){
  var token = $cookies.get('token');
    if($scope.user.name != '')
    {

    console.log($scope.user.fisrtName);
    console.log($scope.user.lastName);
    console.log($scope.user.dateBirthday.getTime());
    console.log($scope.userTeam);
    console.log($scope.userGender);
       $http({
         url: '/atletas/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
         data: {
           nombre: $scope.user.fisrtName,
           apellido: $scope.user.lastName,
           nacimiento: $scope.user.dateBirthday.getTime(),
           genero: $scope.userGender ,
           equipo: $scope.userTeam
         }
       }).success(function (response) {
        console.log(response);
        
        if(response.statusCode = "200"){
          $scope.showMessage = "true";  
          $scope.message = "Equipo creado"; 
        }else{
          $scope.showMessage = "true";  
          $scope.message = "No se pudo crear el equipo"; 
        }
       }).error( function (response) {
          $scope.showMessage = "true";  
          $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
          console.log(response);
       });
    }else{
      $scope.showMessage = "true";  
      $scope.message = "Por favor, ingrese un nombre"; 
    }
}

$scope.enable =function(id){
  console.log(id);
  var token = $cookies.get('token');
       $http({
         url: '/atletas/'+id,
         method: 'DELETE',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          }
       }).success(function (response) {
        console.log(response);
       }).error( function (response) {
          console.log(response);
       });
}

  $scope.menu = [
    {
      link : 'addStudent.html',
      title: 'Atleta',
      icon: 'fa-male'
    },
    {
      link : 'team.html',
      title: 'Equipo',
      icon: 'fa-briefcase'
    },
    {
      link : 'eventType.html',
      title: 'Tipo Evento',
      icon: 'fa-get-pocket'
    },
    {
      link : 'event.html',
      title: 'Evento',
      icon: 'fa-star'
    },
    {
      link : '',
      title: 'Cerrar Sesion',
      icon: 'fa-times-circle'
    }
  ];

 $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller  : DialogController,
      templateUrl : 'addStudent.tmpl.html',
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
      //console.log(locationPage);
      window.location = ""+locationPage;
    }
    
    $scope.visibleSearch = function(){
      $scope.showSearch = !$scope.showSearch;
      $scope.search = '';
    }

    $scope.hola = function(){
      console.log("hol");
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
        name: 'Anibal Jose Rodriguez Orive',
        birthDate: '04/04/2016',
        team: 'Wordl Gym Gran Via'
      },
      {
        name: 'Diego Lopez',
        birthDate: '04/04/2016',
        team: 'Wordl Gym Gran Via'
      },
      {
        name: 'Nelson Cifuentes',
        birthDate: '04/04/2016',
        team: 'Wordl Gym Gran Via'
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
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

