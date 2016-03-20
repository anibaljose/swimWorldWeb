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
  if (request.params.idSubevento){
    db.Subevento.findOne({_id: request.params.idSubevento}, function(err, subevento){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Subevento no encontrado"});
      } else if (subevento){
        reply({statusCode:200,subevento:subevento});
      } else {
        reply({statusCode: 600, error: "Database", message:"Subevento no encontrado"});
      }
    });
  } else {
    db.Subevento.find(function(err, eventos){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Subevento no encontrado"});
      } else if (eventos){
        reply({statusCode:200,eventos:eventos});
      } else {
        reply({statusCode: 600, error: "Database", message:"Subevento no encontrado"});
      }
    });
  }
};
exports.create = function(request, reply){
  new db.Subevento(request.payload).save(function(err, subevento, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: subevento._id});
  });
}
exports.save = function(request, reply){
  var subevento = request.payload;
  subevento.modified = Date.now();
  db.Subevento.update({_id:request.params.idSubevento}, {$set: subevento}, function(err, raw){
    if (err) {
      console.log("EVENTOS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.Subevento.remove({_id:request.params.idSubevento}, function(err){
    if (err) {
      console.log("ATLETAS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    db.AtletaEvento.remove({subevento:request.params.idSubevento}, function(errAE){
      if (errAE) {
        console.log("ATLETA_EVENTOS_DELETE err="+JSON.stringify(errAE));
        return reply({statusCode:600});
      }
      return reply({statusCode: 200});
    });
  });
}
