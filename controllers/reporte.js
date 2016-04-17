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
 "use strict";
 var db = require('../models');
 exports.reporte1 = function(request, reply){
   db.Evento.findOne({_id: request.query.idEvento}, function(err, evento){
     if (err){
       reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
     } else if (evento){
       db.Subevento.find({evento: request.query.idEvent})
       .populate("tipo")
       .exec(function(err, subeventos){
         if (err){
           return reply({statusCode: 600, error: "Database", message:"Subeventos no encontrados"});
         } else if (subeventos){
           evento.subeventos = subeventos;
           // replay and freeze it
           const response = reply({statusCode:200,evento:evento}).hold();
           for (let i = 0, xsync = 0; i < subeventos.length; i++){
             let subevento = subeventos[i];
             db.AtletaEvento.find({subevento: subevento._id})
             .populate("atleta")
             .exec(function(err, atletaEventos){
               // NOTE Exceptions are trivial here
               // Buscar equipo
               db.Equipo.findOne({_id: atletaEventos.atleta.equipo}, {nombre:1}, function(err, equipo){
                 atletaEventos.atleta.equipo = equipo.nombre;
               });
               subevento.detalle = atletaEventos;
               if (xsync == subeventos.length - 1){
                 // Release the reply
                 // NOTE if object is defective, do a direct reply here
                 response.send();
               } else {
                 xsync++;
               }
             });
           }
         } else {
           return reply({statusCode: 600, error: "Database", message:"Subeventos no encontrados"});
         }
       });
     } else {
       reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
     }
   });
 };
exports.reporte2 = function(request, reply){
  db.Evento.findOne({_id: request.query.idEvento}, function(err, evento){
    if (err){
      reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
    } else if (evento){
      let answer = {
        statusCode: 200,
        evento: evento
      };
      db.Subevento.find({evento: request.query.idEvento})
      .populate("tipo", "nombre")
      .exec(function(err, subeventos){
        let subeventos_id = [];
        for(let i = 0; i < subeventos.length; i++){
          subeventos_id.push(subeventos[i]._id);
        }
        db.AtletaEvento.find({subevento: {$in: subeventos_id}}, function(err, atletaEventos){
          let atletas_id = [];
          for(let i = 0; i < atletaEventos.length; i++){
            atletas_id.push(atletaEventos[i].atleta);
          }
          db.Atleta.find({_id: {$in: atletas_id}})
          .populate("equipo")
          .exec(function(err, atletas){
            // A brawl starts here
            for (let i = 0; i < atletas.length; i++){
              let atleta = atletas[i];
              for (let j = 0; j < atletaEventos.length; j++){
                let atletaEvento = atletaEventos[j];
                if (atletaEvento.atleta == atleta._id){
                  atleta.detalle = atletaEvento;
                  for (let k = 0; k < subeventos.length; k++){
                    let subevento = subeventos[k]; // clone
                    if (subevento._id == atletaEvento.subevento){
                      atleta.subevento = subevento;
                    }
                  }
                }
              }
            }
            answer.atletas = atletas;
            reply(answer);
          });
        });
      });
    } else {
      reply({statusCode: 600, error: "Database", message:"Evento no encontrado"});
    }
  });
}
