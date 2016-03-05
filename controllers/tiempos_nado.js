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
  var querySelector = {};
  if (request.query.atleta){
    querySelector.atleta = request.query.atleta;
  }
  if (request.query.tipoEvento){
    querySelector.tipoEvento = request.query.tipoEvento;
  }
  if (request.query.max && request.query.min){
    querySelector["$and"] = [
      {tiempo:{"$gte": request.query.min}},
      {tiempo:{"$lte": request.query.max}}
    ];
  }
  console.log("TIEMPOS_NADO_LISTAR querySelector= "+JSON.stringify(querySelector));
  db.TiemposNado.find(querySelector, function(err, tiempos_nado){
    if (err){
      console.log("TIEMPO_NADO_LISTAR err=" + JSON.stringify(err));
      reply({statusCode: 600, error: "Database", message:"Tiempos Nado no encontrado"});
    } else if (tiempos_nado){
      reply({statusCode:200,tiempos_nado:tiempos_nado});
    } else {
      reply({statusCode: 600, error: "Database", message:"Tiempos Nado no encontrado"});
    }
  });
};
exports.save = function(request, reply){
  var tNado = request.payload;
  // NOTE can't use payload directly because it includes "tiempo".
  db.TiemposNado.findOne({atleta: tNado.atleta, tipoEvento: tNado.tipoEvento}, function(err, tiempoNado){
    if (err){
      console.log("TIEMPO_NADO_SAVE err=" + JSON.stringify(err));
      return reply({statusCode: 600, error: "Database", message:"TiemposNado no encontrado"});
    } else if (tiempoNado) {
      if (tNado.tiempo >= tiempoNado.tiempo){
        // NOTE El tiempo no es menor, no guardar
        return reply({statusCode:205});
      }
      tiempoNado.modified = Date.now();
      tiempoNado.tiempo = tNado.tiempo
      tiempoNado.save(function(errSave, tiempo_nado){
        if (errSave){
          console.log("TIEMPO_NADO_SAVE errSave=" + JSON.stringify(errSave));
          return reply({statusCode:601});
        }
        console.log("TIEMPO_NADO_SAVE: El tiempo es menor, guardar. tiempo_nado=" + JSON.stringify(tiempo_nado));
        return reply({statusCode:200});
      });
    } else {
      // NOTE No exite tiempoNado
      new db.TiemposNado(tNado).save(function(errSave, tiempo_nado){
        if(errSave){
          console.log("TIEMPO_NADO_SAVE errSave=" + JSON.stringify(errSave));
          return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
        }
        return reply({statusCode:200});
      });
    }
  });
}
exports.delete = function(request, reply){
  db.TiemposNado.remove(request.payload, function(err){
    if (err) {
      console.log("TIEMPOS_NADO_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
