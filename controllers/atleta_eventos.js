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
var db = require('../models');
exports.create = function(request, reply){
  var atletaEvento = request.payload;
  atletaEvento.atleta = request.params.idAtleta;
  atletaEvento.subevento = request.params.idSubevento;
  new db.AtletaEvento(atletaEvento).save(function(err, atleta_evento, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: atleta_evento._id});
  });
}
exports.save = function(request, reply){
  var atletaEvento = request.payload;
  atletaEvento.modified = Date.now();
  db.AtletaEvento.update({atleta:request.params.idAtleta, subevento:request.params.idSubevento}, {$set: atletaEvento}, function(err, raw){
    if (err) {
      console.log("ATLETA_EVENTOS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
