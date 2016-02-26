var Hapi = require('hapi'),
jwt = require('jsonwebtoken'),
path = require('path'),
config = require('./config/local.js'),
db = require( './models'),
rutas = require('./controllers'),
validar = require('./validators'),
validarAtletas = require('./validators/atletas.js'),
validarEventos = require('./validators/eventos.js'),
validarTipos = require('./validators/tipos.js'),
validarEquipos = require('./validators/equipos.js'),

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

var validar = function (request, decodedToken, callback) {

    var error,
        credentials = config.accounts[decodedToken.accountId] || {};

    if (!credentials) {
        return callback(error, false, credentials);
    }

    return callback(error, true, credentials)
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
    path: '/atletas/create',
    config: {
      auth: config.auth,
      validate: validarAtletas.create
    },
    handler: rutas.atletas.create
  });
  server.route({
    method: 'POST',
    path: '/atletas/save',
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
    path: '/eventos/save',
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
    method: 'DELETE',
    path: '/eventos/{idEvento}',
    config: {
      auth: config.auth,
      validate: validarEventos.idEvento
    },
    handler: rutas.eventos.delete
  });
  server.route({
    method: 'POST',
    path: '/tipos/create',
    config: {
      auth: config.auth,
      validate: validarTipos.create
    },
    handler: rutas.tipos.create
  });
  server.route({
    method: 'POST',
    path: '/tipo/{idTipo}/save',
    config: {
      auth: config.auth,
      validate: validarTipo.save
    },
    handler: rutas.tipos.save
  });
  server.route({
    method: 'GET',
    path: '/tipo/{idTipo?}',
    config: {
      auth: config.auth,
      validate: validarTipos.idTipo
    },
    handler: rutas.tipos.listar
  });
  server.route({
    method: 'DELETE',
    path: '/tipo/{idTipo}',
    config: {
      auth: config.auth,
      validate: validarTipos.idTipo
    },
    handler: rutas.tipos.delete
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
    path: '/equipos/save',
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
