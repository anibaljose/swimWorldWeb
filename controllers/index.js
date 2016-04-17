/**
 * @author David Yzaguirre <dvdyzag@gmail.com>
 *
 * @copyright Copyright (c) 2016, David Yzaguirre, Aníbal Rodríguez
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */
var config = require('../config/local.js'),
jwt = require('jsonwebtoken'),
db = require('../models');
var privateKey = config.salt;
exports.usuarios = require('./usuarios');
exports.atletas = require('./atletas');
exports.eventos = require('./eventos');
exports.subeventos = require('./subeventos');
exports.tipoEventos = require('./tipo_eventos');
exports.equipos = require('./equipos');
exports.atletaEventos = require('./atleta_eventos');
exports.tiemposNado = require('./tiempos_nado');
exports.reporte = require('./reporte');
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
