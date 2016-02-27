var config = require('../config/local.js'),
jwt = require('jsonwebtoken'),
db = require('../models');
var privateKey = config.salt;
exports.usuarios = require('./usuarios');
exports.atletas = require('./atletas');
exports.eventos = require('./eventos');
exports.tipoEventos = require('./tipo_eventos');
exports.equipos = require('./equipos');
exports.atletaEventos = require('./atleta_eventos');
exports.tiemposNado = require('./tiempos_nado');
exports.index = function(request, reply){
  reply("Hello World");
};
exports.login = function(request, reply){
  var user = request.payload;
  user.active = true;
  db.Usuario.findOne(user, {_id:1}, function(err, usuario){
    if (err){
      reply({statusCode: 600, error: "Database", message:"Usuario no encontrado"});
    } else if (usuario){
      var token = jwt.sign({ accountId: usuario._id }, privateKey, config.jwt);
      reply({statusCode: 200, token: token});
    } else {
      reply({statusCode: 600, error: "Database", message:"Usuario no encontrado"});
    }
  });
};
