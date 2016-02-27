var db = require('../models');
exports.listar = function(request, reply){
  if (request.params.idAtletaEvento){
    db.AtletaEvento.findOne({_id: request.params.idAtletaEvento}, function(err, atleta_evento){
      if (err){
        reply({statusCode: 600, error: "Database", message:"AtletaEvento no encontrado"});
      } else if (equipo){
        reply({statusCode:200,atleta_evento:atleta_evento});
      } else {
        reply({statusCode: 600, error: "Database", message:"AtletaEvento no encontrado"});
      }
    });
  } else {
    db.AtletaEvento.find(function(err, atletas_eventos){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
      } else if (atletas_eventos){
        reply({statusCode:200,atletas_eventos:atletas_eventos});
      } else {
        reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
      }
    });
  }
};

exports.create = function(request, reply){
  var atletaEvento = request.payload;
  atletaEvento.atleta = request.params.idAtleta;
  atletaEvento.evento = request.params.idEvento;
  new db.AtletaEvento(atletaEvento).save(function(err, atleta_evento, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: atleta_evento._id});
  });
}
exports.save = function(request, reply){
  var atletaEvento = request.payload;
  atletaEvento.modified = Date.now();
  db.AtletaEvento.update({_id:request.params.idAtletaEvento}, {$set: atletaEvento}, function(err, raw){
    if (err) {
      console.log("ATLETA_EVENTOS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.AtletaEvento.remove({_id:request.params.idAtletaEvento}, function(err){
    if (err) {
      console.log("ATLETA_EVENTOS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
