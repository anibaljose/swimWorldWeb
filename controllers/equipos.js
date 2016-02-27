exports.listar = function(request, reply){
};
exports.create = function(request, reply){
  new db.Equipo(request.payload).save(function(err, equipo, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: equipo._id});
  });
}
exports.save = function(request, reply){
  var equipo = request.payload;
  equipo.modified = Date.now();
  db.Equipo.update({_id:request.params.idEquipo}, {$set: equipo}, function(err, raw){
    if (err) {
      console.log("EQUIPOS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.Equipo.remove({_id:request.params.idEquipo}, function(err){
    if (err) {
      console.log("ATLETAS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
