app.controller('viewEventTimeCtrl', function($scope,$mdDialog,$http,$cookies) {
  
  $scope.items = [];
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
    if(response.statusCode ="200"){
      $scope.items = response.atletas;
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });

  
   
  $scope.tiempos = function () {
    var cont = $scope.items.length;
    var html = "";
    for(var i = 0; i<cont; i++){
      html += "<div>"+(i+1)+"). "+$scope.items[i].atleta.nombre+" "+$scope.items[i].atleta.apellido+"--"+$scope.getMin($scope.items[i].tiempo)
                      +":"+$scope.getSeg($scope.items[i].tiempo)
                      +":"+$scope.getMs($scope.items[i].tiempo)+"</div>";
    
    }
    document.getElementById("tiempos").innerHTML = html;
  };


  $scope.load = function(){
    var nombreTipoEvento = "";
    $http({
     url: '/tipo/'+$scope.id_Tipo_Evento,
     method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$cookies.get('token')
      }

   }).success(function (response) {
    if(response.statusCode ="200"){
      nombreTipoEvento = response.tipo.nombre;
      var data = [], fontSize = 8, height = 0, doc;
      doc = new jsPDF('p', 'pt', 'a4', true);
      doc.setFont("times", "normal");
      doc.setFontSize(fontSize);
      doc.text(100,10,"Evento: "+$scope.nombre);
      doc.text(100,20,"Tipo Evento: "+nombreTipoEvento);
      data = [];
      var cont = $scope.items.length;
      for(var i = 0; i<cont; i++){
          data.push({
              "Nombre" : $scope.items[i].atleta.nombre.toLowerCase()+" "+$scope.items[i].atleta.apellido.toLowerCase(),
              "Tiempo (mm:ss:ms)" : $scope.getMin($scope.items[i].tiempo)
                        +":"+$scope.getSeg($scope.items[i].tiempo)
                        +":"+$scope.getMs($scope.items[i].tiempo)
          });
      
      }
      height = doc.drawTable(data, {
        xstart : 0,
        ystart : 100,
        tablestart : 40,
        marginright :5,
        xOffset : 0,
        yOffset : 20,
        columnWidths:[0,0,0,0]
      });
      doc.save("tiemposFinales.pdf");
    }
   }).error( function (response) {
      $scope.showMessage = "true";  
      $scope.message = "Disculpe los inconveniente!! intenta mas tarde"; 
   });


  }

    
$scope.getMin = function(min){
  var minutes = Math.floor( min / 60000  );  
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return minutes;
}
$scope.getSeg = function(seg){
  var segundes = Math.floor( (seg % 60000) / 1000 );  
  segundes = segundes < 10 ? '0' + segundes : segundes;
  return segundes;
}
$scope.getMs = function(ms){
  var milesimas = Math.floor( ms % 1000 );  
  milesimas = milesimas < 10 ? '0' + milesimas : milesimas;
  return milesimas;
}
  $scope.cancel = function() {
    location.reload();
    $mdDialog.cancel();
  };

});