exports.listar = function(request, reply){
  if (request.params.idEquipo){
    reply({statusCode:200, equipos:false});
  } else {
    reply({statusCode:200, equipos:true});
  }

};
exports.create = function(request, reply){
  reply({statusCode:200});
}
exports.save = function(request, reply){
  reply({statusCode:200});
}
exports.delete = function(request, reply){
  reply({statusCode:200});
}
exports.search = function(request, reply){
  reply({statusCode:200});
}
