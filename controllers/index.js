var config = require('../config/local.js'),
jwt = require('jsonwebtoken');
var privateKey = config.salt;
exports.atletas = require('./atletas');
exports.eventos = require('./eventos');
exports.tipos = require('./tipos');
exports.equipos = require('./equipos');
exports.index = function(request, reply){
  reply("Hello World");
};
exports.login = function(request, reply){
  var accountId = request.payload.accountId;
  var password = request.payload.password;
  var privateKey = config.salt;
  // buscar la cuenta

  var credentials = config.accounts[accountId] || {};
  if (credentials && credentials.password == password){
    var token = jwt.sign({ accountId: accountId }, privateKey, config.jwt);
    reply({statusCode: 200, token: token});
  } else {
    reply({statusCode: 600, error: "Database", message:"Usuario no encontrado"});
  }
};
