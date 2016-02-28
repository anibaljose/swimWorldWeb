var db = require('../models');
exports.listar = function(request, reply){
  if (request.params.idAtleta){
    db.Atleta.findOne({_id: request.params.idAtleta}, function(err, atleta){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Atleta no encontrado"});
      } else if (atleta){
        reply({statusCode:200,atleta:atleta});
      } else {
        reply({statusCode: 600, error: "Database", message:"Atleta no encontrado"});
      }
    });
  } else {
    db.Atleta.find(function(err, atletas){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Atleta no encontrado"});
      } else if (atletas){
        reply({statusCode:200,atletas:atletas});
      } else {
        reply({statusCode: 600, error: "Database", message:"Atleta no encontrado"});
      }
    });
  }
};
exports.create = function(request, reply){
  new db.Atleta(request.payload).save(function(err, atleta){
    if (err){
      console.log("ATLETAS_CREATE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode:200, _id: atleta._id});
  });
}
exports.save = function(request, reply){
  var atleta = request.payload;
  atleta.modified = Date.now();
  db.Atleta.update({_id:request.params.idAtleta}, {$set: atleta}, function(err, raw){
    if (err) {
      console.log("ATLETAS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.Atleta.remove({_id:request.params.idAtleta}, function(err){
    if (err) {
      console.log("ATLETAS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
