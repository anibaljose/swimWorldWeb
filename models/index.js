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
var mongoose = require('mongoose');
var config = require('../config/local.js');
var Schema = mongoose.Schema;

var Usuario = new Schema(require('./usuario'));
var Atleta = new Schema(require('./atleta'));
var Equipo = new Schema(require('./equipo'));
var Evento = new Schema(require('./evento'));
var TipoEvento = new Schema(require('./tipo_evento'));
var AtletaEvento = new Schema(require('./atleta_evento'));
AtletaEvento.index({ atleta: 1, evento: 1}, { unique: true });
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
