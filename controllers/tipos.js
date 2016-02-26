exports.listar = function(request, reply){
  if (request.params.idTipo){
    reply({statusCode:200, eventos:false});
  } else {
    reply({statusCode:200, eventos:true});
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
