angular.module('swim.httpServices',['ngCookies'])

.factory('Servicios', function($http, $q,$cookies) {
  return {
    evento:function(idEvent){
      var deferred=$q.defer();
      $http({
       url: '/eventos/'+idEvent,
       method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+$cookies.get('token')
        }
      }).success(function (response) {
          deferred.resolve(response);
      }).error( function (response) {
        deferred.resolve(error);
      });
      return deferred.promise;
    },
    eventos:function(){
      var deferred=$q.defer();
      $http({
       url: '/eventos/',
       method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+$cookies.get('token')
        }
      }).success(function (response) {
          deferred.resolve(response);
      }).error( function (response) {
        deferred.resolve(error);
      });
      return deferred.promise;
    },
    AtletasEvento:function(idEvent){
      var deferred=$q.defer();
      $http({
       url: '/eventos/atletas/'+idEvent,
       method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+$cookies.get('token')
        }
     }).success(function (response) {
          deferred.resolve(response);
      }).error( function (response) {
        deferred.resolve(error);
      });
      return deferred.promise;
    },
    NombreEquipo:function(id){
      var deferred=$q.defer();
       $http({
         url: '/equipos/'+id,
         method: 'GET',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          }
       }).success(function(response){
          deferred.resolve(response);
        }
      ).error(function(response){
          deferred.resolve(response);
      });
      return deferred.promise;
    },
    Tipoevento:function(idTipoEvento){

      var deferred=$q.defer();
      $http({
         url: '/tipo/'+idTipoEvento,
         method: 'GET',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          }
       }).success(function(response){
          deferred.resolve(response);
        }
      ).error(function(response){
          deferred.resolve(response);
      });
      return deferred.promise;

    },
    Equipos:function(){
       $http({
         url: '/equipos',
         method: 'GET',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          }
       }).success(function (response) {
          deferred.resolve(response);
       }).error( function (response) {
          deferred.resolve(response);
       }); 
      return deferred.promise;
    }
  }
   
});
