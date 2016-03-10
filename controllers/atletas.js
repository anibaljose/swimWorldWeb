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
  if (request.params.idAtleta){
    db.Atleta.findOne({_id: request.params.idAtleta}, function(err, atleta){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Atleta no encontrado"});
      } else if (atleta){
        reply({statusCode:200,atleta:atleta});
      } else {
        reply({statusCode: 600, error: "Database", message:"Atleta no encontrado"});
      }
    });
  } else {
    var querySelector = {};
    if (request.query.edadmax){
      var today = new Date();
      var edadmax = new Date(today);
      var edadmin = new Date(today);
      edadmax.setFullYear(edadmax.getFullYear() - request.query.edadmax - 1);
      edadmin.setFullYear(edadmin.getFullYear() - request.query.edadmin);
      querySelector["$and"] = [
        {nacimiento:{"$gte": edadmax.getTime()}},
        {nacimiento:{"$lte": edadmin.getTime()}}
      ];
    }
    db.Atleta.find(querySelector, function(err, atletas){
      if (err){
        reply({statusCode: 600, error: "Database", message:"Atleta no encontrado"});
      } else if (atletas){
        reply({statusCode:200,atletas:atletas});
      } else {
        reply({statusCode: 600, error: "Database", message:"Atleta no encontrado"});
      }
    });
  }
};
exports.create = function(request, reply){
  new db.Atleta(request.payload).save(function(err, atleta){
    if (err){
      console.log("ATLETAS_CREATE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode:200, _id: atleta._id});
  });
}
exports.save = function(request, reply){
  var atleta = request.payload;
  atleta.modified = Date.now();
  db.Atleta.update({_id:request.params.idAtleta}, {$set: atleta}, function(err, raw){
    if (err) {
      console.log("ATLETAS_SAVE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
exports.delete = function(request, reply){
  db.Atleta.remove({_id:request.params.idAtleta}, function(err){
    if (err) {
      console.log("ATLETAS_DELETE err="+JSON.stringify(err));
      return reply({statusCode:600});
    }
    return reply({statusCode: 200});
  });
}
