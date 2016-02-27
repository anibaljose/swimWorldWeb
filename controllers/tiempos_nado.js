var db = require('../models');
exports.listar = function(request, reply){
  if (request.params.idTiempoNado){
    db.TiempoNado.findOne({_id: request.params.idTiempoNado}, function(err, tiempo_nado){
      if (err){
        reply({statusCode: 600, error: "Database", message:"TiempoNado no encontrado"});
      } else if (equipo){
        reply({statusCode:200,tiempo_nado:tiempo_nado});
      } else {
        reply({statusCode: 600, error: "Database", message:"TiempoNado no encontrado"});
      }
    });
  } else {
    db.TiempoNado.find(function(err, tiempos_nado){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Tiempos Nado no encontrado"});
      } else if (tiempos_nado){
        reply({statusCode:200,tiempos_nado:tiempos_nado});
      } else {
        reply({statusCode: 600, error: "Database", message:"Tiempos Nado no encontrado"});
      }
    });
  }
};
exports.create = function(request, reply){
  var tiempoNado = request.payload;
  tiempoNado.atleta = request.params.idAtleta;
  tiempoNado.tipo = request.params.idTipoEvento;
  new db.TiempoNado(tiempoNado).save(function(err, tiempo_nado, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: tiempo_nado._id});
  });
}
exports.save = function(request, reply){
  var tiempoNado = request.payload;
  tiempoNado.modified = Date.now();
  db.TiempoNado.update({_id:request.params.idTiempoNado}, {$set: tiempoNado}, function(err, raw){
    if (err) {
      console.log("TIEMPOS_NADO_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.TiempoNado.remove({_id:request.params.idTiempoNado}, function(err){
    if (err) {
      console.log("TIEMPOS_NADO_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
