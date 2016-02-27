var db = require('../models');
exports.listar = function(request, reply){
  if (request.params.idTipo){
    db.TipoEvento.findOne({_id: request.params.idTipo}, function(err, tipo){
      if (err){
        reply({statusCode: 600, error: "Database", message:"TipoEvento no encontrado"});
      } else if (tipo){
        reply({statusCode:200,tipo:tipo});
      } else {
        reply({statusCode: 600, error: "Database", message:"TipoEvento no encontrado"});
      }
    });
  } else {
    db.TipoEvento.find(function(err, tipos){
      if (err){
        reply({statusCode: 600, error: "Database", message:"TipoEvento no encontrado"});
      } else if (tipos){
        reply({statusCode:200,tipos:tipos});
      } else {
        reply({statusCode: 600, error: "Database", message:"TipoEvento no encontrado"});
      }
    });
  }
};
exports.create = function(request, reply){
  new db.TipoEvento(request.payload).save(function(err, tipoEvento, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: tipoEvento._id});
  });
}
exports.save = function(request, reply){
  var tipoEvento = request.payload;
  tipoEvento.modified = Date.now();
  db.TipoEvento.update({_id:request.params.idTipo}, {$set: tipoEvento}, function(err, raw){
    if (err) {
      console.log("TIPO_EVENTOS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.TipoEvento.remove({_id:request.params.idTipo}, function(err){
    if (err) {
      console.log("TIPO_EVENTOS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
};
