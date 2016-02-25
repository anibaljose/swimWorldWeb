var db = require('../models');
exports.listar = function(request, reply){
  if (!request.auth.credentials.admin){
    return reply({statusCode:600, message:"Admin access only."});
  }
  if (request.params.idUsuario){
    db.Usuario.findOne({_id: request.params.idUsuario, active: true}, function(err, user){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Usuario no encontrado"});
      } else if (user){
        reply({statusCode:200,user:user});
      } else {
        reply({statusCode: 600, error: "Database", message:"Usuario no encontrado"});
      }
    });
  } else {
    db.Usuario.find({active: true}, function(err, users){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Usuario no encontrado"});
      } else if (user){
        reply({statusCode:200,users:users});
      } else {
        reply({statusCode: 600, error: "Database", message:"Usuario no encontrado"});
      }
    });
  }

};
exports.create = function(request, reply){
  new db.Usuario(request.payload).save(function(err, user, numberAffected){
    if(err){
      if (err.code == 11000){
        return reply({statusCode: 600, error: "Database", message: 'Username "'+request.payload.username+'" ya está utilizado'});
      }
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: user._id});
  });
};
exports.save = function(request, reply){
  var _id = request.auth.credentials._id;
  var user = request.payload;
  user.modified = Date.now();
  db.Usuario.update({_id:_id}, {$set: user}, function(err, raw){
    if (err) {
      if (err.code==11000){
        reply({statusCode: 500, error: "Database", message: 'Username "'+user.username+'" ya está utilizado'});
      } else {
        reply({statusCode: 600, error: "Database", message: "Usuario no modificado"});
      }
    } else {
      reply({statusCode: 200});
    }
  });
}
exports.delete = function(request, reply){
  var idUsuario;
  if (request.params.idUsuario){
    if (!request.auth.credentials.admin){
      return reply({statusCode:600, message:"Admin access only."});
    }
    idUsuario = request.params.idUsuario;
  } else {
    idUsuario = request.auth.credentials._id;
  }
  db.Usuario.update({_id:idUsuario}, {$set: {active:false, modified:Date.now()}}, function(err, raw){
    if (err) {
      reply({statusCode: 600, error: "Database", message: "Usuario no eliminado."});
    } else {
      reply({statusCode: 200});
    }
  });
}
