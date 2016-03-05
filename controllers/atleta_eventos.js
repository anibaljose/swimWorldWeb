var db = require('../models');
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
