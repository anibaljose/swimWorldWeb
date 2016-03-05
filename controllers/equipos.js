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
exports.listar = function(request, reply){
  if (request.params.idEquipo){
    db.Equipo.findOne({_id: request.params.idEquipo}, function(err, equipo){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
      } else if (equipo){
        reply({statusCode:200,equipo:equipo});
      } else {
        reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
      }
    });
  } else {
    db.Equipo.find(function(err, equipos){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
      } else if (equipos){
        reply({statusCode:200,equipos:equipos});
      } else {
        reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
      }
    });
  }
};
exports.create = function(request, reply){
  new db.Equipo(request.payload).save(function(err, equipo, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: equipo._id});
  });
}
exports.save = function(request, reply){
  var equipo = request.payload;
  equipo.modified = Date.now();
  db.Equipo.update({_id:request.params.idEquipo}, {$set: equipo}, function(err, raw){
    if (err) {
      console.log("EQUIPOS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.Equipo.remove({_id:request.params.idEquipo}, function(err){
    if (err) {
      console.log("ATLETAS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
