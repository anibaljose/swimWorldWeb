
var app = angular.module('swimAPP', ['ngMaterial','ngCookies','ngRoute','swim.httpServices']);
var conteo = 1;
menu = [
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
app.config(['$httpProvider','$routeProvider', function ($httpProvider,$routeProvider) {

   $routeProvider.
      when('/login', {
        templateUrl: '../templates/login.html'
      }).
      when('/student', {
        templateUrl: '../templates/student.html'
      }).
      when('/event', {
        templateUrl: '../templates/event.html'
      }).
      when('/eventType', {
        templateUrl: '../templates/eventType.html'
      }).
      when('/team', {
        templateUrl: '../templates/team.html'
      }).
      when('/massive', {
        templateUrl: '../templates/eventMassive.html'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);


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
    }).accentPalette('pink');
  $mdThemingProvider.theme('input', 'default').primaryPalette('grey')
});


function createStudentController($scope, $mdDialog) {
}

function editStudentController($scope,item) { 
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

/**eventos*/

function createEventController($scope, $mdDialog) {
}

function EditEventController($scope, $mdDialog,item) { 
  $scope.id_Evento      = item._id;
  $scope.id_Tipo_Evento = item.tipo;
  $scope.Nocategoria    = item.categoria;
  $scope.Nogenero       = item.genero;
}

function EditTimeController($scope, $mdDialog,item) { 
  $scope.nombre = item.nombre;
  $scope.id_Evento = item._id;
  $scope.id_Tipo_Evento = item.tipo;
}


function ViewEventTimeController($scope, $mdDialog,item) { 
  $scope.carriles = item.carriles;
  $scope.nombre = item.nombre;
  $scope.id_Evento = item._id;
  $scope.id_Tipo_Evento = item.tipo;
}
/**equipos*/

function createTeamController() {
}

function editTeamController($scope,nombre,id) { 
  $scope.nombre = nombre;
  $scope.id = id;
}

/**tipo de evento*/
function createEventTypeController($scope, $mdDialog) {
}

function editEventTypeController($scope,nombre,id) { 
  $scope.nombre = nombre;
  $scope.id = id;
}