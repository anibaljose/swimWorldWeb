angular.module('swim.httpServices',['ngCookies'])

.factory('Servicios', function($http, $q,$cookies) {
  return {
    login:function(mail, password){
      var deferred=$q.defer();
      $http({
         url: '/login',
         method: 'POST',
          headers : { 'Content-Type': 'application/json'},
         data: {
           username: mail, 
           password: password
         }
       }).success(function (response) {
          deferred.resolve(response);
      }).error( function (response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    /**atletas*/
    atletas:function(){
      var deferred=$q.defer();
      $http({
       url: '/atletas/',
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
    },
    atletasRango:function(min, max){
      var deferred=$q.defer();
      $http({
       url: '/atletas/',
       method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+$cookies.get('token')
        },
        params:{
          edadmin:0,
          edadmax:4
        }
     }).success(function (response) {
          deferred.resolve(response);
      }).error( function (response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    crearAtletas:function(fisrtName,lastName,dateBirthday,idGender,idTeam){
      var deferred=$q.defer();
      $http({
         url: '/atletas/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          },
         data: {
           nombre     : fisrtName,
           apellido   : lastName,
           nacimiento : dateBirthday,
           genero     : idGender,
           equipo     : idTeam
         }
       }).success(function (response) {
        console.log(JSON.stringify(response));
        deferred.resolve(response);
      }).error( function (response) {
        console.log(JSON.stringify(response));
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    editarAtletas:function(idAtleta,fisrtName,lastName,dateBirthday,idGender,idTeam){
      var deferred=$q.defer();
      $http({
       url: '/atletas/'+idAtleta+'/save',
       method: 'POST',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+$cookies.get('token')
        },
        data: {
           nombre    : fisrtName,
           apellido  : lastName,
           nacimiento: dateBirthday,
           genero    : idGender,
           equipo    : idTeam
         }
     }).success(function (response) {
        deferred.resolve(response);
      }).error( function (response) {
        deferred.resolve(error);
      });
      return deferred.promise;
    },
    eliminarAtleta:function(){
      var deferred=$q.defer();
      $http({
         url: '/atletas/'+id,
         method: 'DELETE',
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
    },
    /**eventos*/
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
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    eliminarEvento:function(idEvent){
     var deferred=$q.defer();
     $http({
       url: '/eventos/'+id,
       method: 'DELETE',
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
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    crearEvento:function(nombre, lugar, fecha, carriles, tipo, categoria, genero, numeroEvento){
      var deferred=$q.defer();$http({
         url: '/eventos/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          },
         data: {      
           nombre   : nombre  ,
           lugar    : lugar,
           fecha    : fecha,
           carriles : carriles,
           tipo     : tipo,
           categoria: categoria, 
           genero   : genero,
           numeroEvento: numeroEvento
         }
       }).success(function (response) {
          deferred.resolve(response);
      }).error( function (response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    crearEventoAtleta:function(idAtleta, idEvento,hit, tiempo, carril){
      var deferred=$q.defer();$http({
         url: '/atleta/'+idAtleta+'/evento/'+idEvento+'/create',
         method: 'POST',
         headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
         },
         data: {      
           hit     : hit,
           tiempo  : tiempo,
           carril  : carril
         }
       }).success(function (response) {
          deferred.resolve(response);
      }).error( function (response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    atletasEvento:function(idEvent){
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
        deferred.resolve(response);
      });
      return deferred.promise;
    },
    nombreEquipo:function(id){
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
    /***tipo de evento***/
    tipoEventos:function(){
      var deferred=$q.defer();
      $http({
       url: '/tipo',
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
    eliminarTipoEvento:function(idTipoEvento){
      var deferred=$q.defer();
     $http({
       url: '/tipo/'+idTipoEvento,
       method: 'DELETE',
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
    /**tipo de evento**/
    tipoEvento:function(idTipoEvento){

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
    crearTipoEvento:function(nombre){
     var deferred=$q.defer();   
       $http({
         url: '/tipos/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          },
         data: {
           nombre: nombre
         }
       }).success(function (response) {
          deferred.resolve(response);
       }).error( function (response) {
          deferred.resolve(response);
       }); 
      return deferred.promise;
    },
    editarTipoEvento:function(id,nombre){
     var deferred=$q.defer(); 
       $http({
         url: '/tipo/'+id+'/save',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          },
          data: {
             nombre: nombre
           }
       }).success(function (response) {
          deferred.resolve(response);
       }).error( function (response) {
          deferred.resolve(response);
       }); 
      return deferred.promise;
    },
     /**************equipos*****************/
    eliminarEquipo:function(id){
     var deferred=$q.defer();   
     $http({
       url: '/equipos/'+id,
       method: 'DELETE',
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
    equipos:function(){
     var deferred=$q.defer();   
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
    },
    editarEquipo:function(id,nombre){
     var deferred=$q.defer(); 
       $http({
         url: '/tipo/'+id+'/save',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          },
          data: {
             nombre: nombre
           }
       }).success(function (response) {
          deferred.resolve(response);
       }).error( function (response) {
          deferred.resolve(response);
       }); 
      return deferred.promise;
    },
    crearEquipo:function(nombre){
     var deferred=$q.defer();   
       $http({
         url: '/equipos/create',
         method: 'POST',
          headers : { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+$cookies.get('token')
          },
         data: {
           nombre: nombre
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
