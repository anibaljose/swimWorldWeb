var db = require('../models');
exports.listar = function(request, reply){
  if (request.params.idEvento){
    db.Evento.findOne({_id: request.params.idEvento}, function(err, evento){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
      } else if (evento){
        reply({statusCode:200,evento:evento});
      } else {
        reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
      }
    });
  } else {
    db.Evento.find(function(err, eventos){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
      } else if (eventos){
        reply({statusCode:200,eventos:eventos});
      } else {
        reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
      }
    });
  }
};
exports.atletas = function(request, reply){
  db.AtletaEvento
  .find({evento: request.params.idEvento})
  .populate("atleta")
  .exec(function(err, atletas){
    if (err){
      reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
    } else if (atletas){
      reply({statusCode:200,atletas:atletas});
    } else {
      reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
    }
  });
};
exports.atleta = function(request, reply){
  db.AtletaEvento.remove({atleta:request.query.atleta, evento: request.params.idEvento}, function(err){
    if (err) {
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.create = function(request, reply){
  new db.Evento(request.payload).save(function(err, evento, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: evento._id});
  });
}
exports.save = function(request, reply){
  var evento = request.payload;
  evento.modified = Date.now();
  db.Evento.update({_id:request.params.idEvento}, {$set: evento}, function(err, raw){
    if (err) {
      console.log("EVENTOS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.Evento.remove({_id:request.params.idEvento}, function(err){
    if (err) {
      console.log("ATLETAS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    db.AtletaEvento.remove({evento:request.params.idEvento}, function(errAE){
      if (errAE) {
        console.log("ATLETA_EVENTOS_DELETE err="+JSON.stringify(errAE));
        return reply({statusCode:600});
      }
      return reply({statusCode: 200});
    });
  });
}
