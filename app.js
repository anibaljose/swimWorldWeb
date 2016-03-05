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
var Hapi = require('hapi'),
jwt = require('jsonwebtoken'),
path = require('path'),
config = require('./config/local.js'),
db = require( './models'),
rutas = require('./controllers'),
validar = require('./validators'),
validarUsuarios = require('./validators/usuarios'),
validarAtletas = require('./validators/atletas'),
validarEventos = require('./validators/eventos'),
validarTipoEvento = require('./validators/tipo_eventos'),
validarEquipos = require('./validators/equipos'),
validarAtletaEvento = require('./validators/atleta_eventos'),
validarTiemposNado = require('./validators/tiempos_nado'),

server = new Hapi.Server();
server.connection({
  host: config.host,
  port: config.port,
  tls: config.tlsOnly?config.https:false
});
// Recuperar salt
var privateKey = config.salt;
// Definir rutas
server.route({
  method: 'GET',
  path:'/heartbeat',
  config: {
    cors: true
  },
  handler: rutas.index
});
server.route({
  method: 'POST',
  path:'/login',
  config: {
    validate: validar.login,
    payload: {
      allow: 'application/json'
    }
  },
  handler: rutas.login
});
var validar = function (request, token, callback) {
  var error;
  db.Usuario.findById(token.accountId, {username: 1, admin:1}, function(err, user){
    if (err){
      // Acceso no autorizado
      return callback(error, false, err);
    } else {
      // Acceso autorizado
      return callback(error, true, user);
    }
  });
};
server.register(require('hapi-auth-jwt'), (err) =>{
  if (err) {
    throw err;
  }
  server.auth.strategy('token', 'jwt', {
    key: privateKey,
    validateFunc: validar,
    verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
  });
  server.route({
    method: 'POST',
    path: '/usuarios/create',
    config: {
      auth: config.auth,
      validate: validarUsuarios.create
    },
    handler: rutas.usuarios.create
  });
  server.route({
    method: 'POST',
    path: '/usuarios/save',
    config: {
      auth: config.auth,
      validate: validarUsuarios.save
    },
    handler: rutas.usuarios.save
  });
  server.route({
    method: 'GET',
    path: '/usuarios/{idUsuario?}',
    config: {
      auth: config.auth,
      validate: validarUsuarios.idUsuario
    },
    handler: rutas.usuarios.listar
  });
  server.route({
    method: 'DELETE',
    path: '/usuarios/{idUsuario?}',
    config: {
      auth: config.auth,
      validate: validarUsuarios.idUsuario
    },
    handler: rutas.usuarios.delete
  });
  server.route({
    method: 'POST',
    path: '/atletas/create',
    config: {
      auth: config.auth,
      validate: validarAtletas.create
    },
    handler: rutas.atletas.create
  });
  server.route({
    method: 'POST',
    path: '/atletas/{idAtleta}/save',
    config: {
      auth: config.auth,
      validate: validarAtletas.save
    },
    handler: rutas.atletas.save
  });
  server.route({
    method: 'GET',
    path: '/atletas/{idAtleta?}',
    config: {
      auth: config.auth,
      validate: validarAtletas.idAtleta
    },
    handler: rutas.atletas.listar
  });
  server.route({
    method: 'DELETE',
    path: '/atletas/{idAtleta}',
    config: {
      auth: config.auth,
      validate: validarAtletas.idAtleta
    },
    handler: rutas.atletas.delete
  });
  server.route({
    method: 'POST',
    path: '/eventos/create',
    config: {
      auth: config.auth,
      validate: validarEventos.create
    },
    handler: rutas.eventos.create
  });
  server.route({
    method: 'POST',
    path: '/eventos/{idEvento}/save',
    config: {
      auth: config.auth,
      validate: validarEventos.save
    },
    handler: rutas.eventos.save
  });
  server.route({
    method: 'GET',
    path: '/eventos/{idEvento?}',
    config: {
      auth: config.auth,
      validate: validarEventos.idEvento
    },
    handler: rutas.eventos.listar
  });
  server.route({
    method: 'GET',
    path: '/eventos/{idEvento}/atletas',
    config: {
      auth: config.auth,
      validate: validarEventos.idEvento
    },
    handler: rutas.eventos.atletas
  });
  server.route({
    method: 'DELETE',
    path: '/eventos/{idEvento}',
    config: {
      auth: config.auth,
      validate: validarEventos.idEvento
    },
    handler: rutas.eventos.delete
  });
  server.route({
    method: 'DELETE',
    path: '/eventos/{idEvento}/atleta',
    config: {
      auth: config.auth,
      validate: validarEventos.atleta
    },
    handler: rutas.eventos.atleta
  });
  server.route({
    method: 'POST',
    path: '/tipos/create',
    config: {
      auth: config.auth,
      validate: validarTipoEvento.create
    },
    handler: rutas.tipoEventos.create
  });
  server.route({
    method: 'POST',
    path: '/tipo/{idTipo}/save',
    config: {
      auth: config.auth,
      validate: validarTipoEvento.save
    },
    handler: rutas.tipoEventos.save
  });
  server.route({
    method: 'GET',
    path: '/tipo/{idTipo?}',
    config: {
      auth: config.auth,
      validate: validarTipoEvento.idTipo
    },
    handler: rutas.tipoEventos.listar
  });
  server.route({
    method: 'DELETE',
    path: '/tipo/{idTipo}',
    config: {
      auth: config.auth,
      validate: validarTipoEvento.idTipo
    },
    handler: rutas.tipoEventos.delete
  });
  server.route({
    method: 'POST',
    path: '/equipos/create',
    config: {
      auth: config.auth,
      validate: validarEquipos.create
    },
    handler: rutas.equipos.create
  });
  server.route({
    method: 'POST',
    path: '/equipos/{idEquipo}/save',
    config: {
      auth: config.auth,
      validate: validarEquipos.save
    },
    handler: rutas.equipos.save
  });
  server.route({
    method: 'GET',
    path: '/equipos/{idEquipo?}',
    config: {
      auth: config.auth,
      validate: validarEquipos.idEquipo
    },
    handler: rutas.equipos.listar
  });
  server.route({
    method: 'DELETE',
    path: '/equipos/{idEquipo}',
    config: {
      auth: config.auth,
      validate: validarEquipos.idEquipo
    },
    handler: rutas.equipos.delete
  });
  server.route({
    method: 'POST',
    path: '/atleta/{idAtleta}/evento/{idEvento}/create',
    config: {
      auth: config.auth,
      validate: validarAtletaEvento.create
    },
    handler: rutas.atletaEventos.create
  });
  server.route({
    method: 'POST',
    path: '/atleta/evento/{idAtletaEvento}/save',
    config: {
      auth: config.auth,
      validate: validarAtletaEvento.save
    },
    handler: rutas.atletaEventos.save
  });
  server.route({
    method: 'POST',
    path: '/tiempos/save',
    config: {
      auth: config.auth,
      validate: validarTiemposNado.save
    },
    handler: rutas.tiemposNado.save
  });
  server.route({
    method: 'GET',
    path: '/tiempos',
    config: {
      auth: config.auth,
      validate: validarTiemposNado.listar
    },
    handler: rutas.tiemposNado.listar
  });
  server.route({
    method: 'DELETE',
    path: '/tiempos',
    config: {
      auth: config.auth,
      validate: validarTiemposNado.delete
    },
    handler: rutas.tiemposNado.delete
  });
});
server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: config.public,
            etagMethod: 'simple',
            defaultExtension: "html"
        }
    }
  });
});
// Inicie el servidor
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
