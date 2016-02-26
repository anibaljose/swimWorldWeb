var mongoose = require('mongoose');
var config = require('../config/local.js');
var Schema = mongoose.Schema;

var Usuario = new Schema(require('./usuario'));
var Atleta = new Schema(require('./atleta'));
var Equipo = new Schema(require('./equipo'));
var Evento = new Schema(require('./evento'));
var TipoEvento = new Schema(require('./tipo_evento'));
var AtletaEvento = new Schema(require('./atleta_evento'));
var TiemposNado = new Schema(require('./tiempos_nado'));

exports.Usuario = mongoose.model('Usuario', Usuario);
exports.Atleta = mongoose.model('Atleta', Atleta);
exports.Equipo = mongoose.model('Equipo', Equipo);
exports.Evento = mongoose.model('Evento', Evento);
exports.TipoEvento = mongoose.model('TipoEvento', TipoEvento);
exports.AtletaEvento = mongoose.model('AtletaEvento', AtletaEvento);
exports.TiemposNado = mongoose.model('TiemposNado', TiemposNado);

// Iniciar la conexion
mongoose.connect(config.mongodb.connection_string);
