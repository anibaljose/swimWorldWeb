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
  if (request.params.idEvento){
    db.Evento.findOne({_id: request.params.idEvento}, function(err, evento){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
      } else if (evento){
        reply({statusCode:200,evento:evento});
      } else {
        reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
      }
    });
  } else {
    db.Evento.find(function(err, eventos){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
      } else if (eventos){
        reply({statusCode:200,eventos:eventos});
      } else {
        reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
      }
    });
  }
};
exports.atletas = function(request, reply){
  var querySelector = {};
  var options = {};
  if (request.query.sort){
    options.sort = {tiempo:1};
  }
  if (request.params.idSubevento){
    querySelector.subevento = request.params.idSubevento;
  } else if (request.query.subeventos){
    querySelector.subevento = {$in: request.query.subeventos};
  }
  db.AtletaEvento
  .find(querySelector, null, options)
  .populate("atleta")
  .exec(function(err, atletas){
    if (err){
      reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
    } else if (atletas){
      reply({statusCode:200,atletas:atletas});
    } else {
      reply({statusCode: 600, error: "Database", message:"Equipo no encontrado"});
    }
  });
};
exports.atleta = function(request, reply){
  db.AtletaEvento.remove({atleta:request.query.atleta, subevento: request.params.idSubevento}, function(err){
    if (err) {
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.create = function(request, reply){
  new db.Evento(request.payload).save(function(err, evento, numberAffected){
    if(err){
      return reply({statusCode: 600, error: "Database", message: "Error de Base de datos."});
    }
    return reply({statusCode: 200, _id: evento._id});
  });
}
exports.save = function(request, reply){
  var evento = request.payload;
  evento.modified = Date.now();
  db.Evento.update({_id:request.params.idEvento}, {$set: evento}, function(err, raw){
    if (err) {
      console.log("EVENTOS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.Evento.remove({_id:request.params.idEvento}, function(err){
    if (err) {
      console.log("ATLETAS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    db.Subevento.remove({evento:request.params.idEvento}, function(errSE){
      if (errSE) {
        console.log("ATLETA_EVENTOS_DELETE err="+JSON.stringify(errSE));
        return reply({statusCode:600});
      }
      return reply({statusCode: 200});
    });
    // TODO borrar documentos en AtletaEvento
  });
}
