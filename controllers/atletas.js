exports.listar = function(request, reply){
  if (request.params.idAtleta){
    reply({statusCode:200, atletas:false});
  } else {
    reply({statusCode:200, atletas:true});
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
