angular.module('swim.httpServices',['ngCookies'])

.factory('Servicios', function($http, $q,$cookies) {
  return {
    evento:function(idEvent){
      console.log("ID EVENTO: "+idEvent);
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
    Tipoevento:function(TipoEvento){

      var deferred=$q.defer();
       $http({
         url: '/tipo/'+TipoEvento,
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

    }
  }
   
});
