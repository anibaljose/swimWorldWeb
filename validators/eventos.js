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
var Joi = require('joi');
exports.create = {
  payload: {
    nombre: Joi.string().min(3).required(),
    lugar: Joi.string().min(3).required(),
    fecha: Joi.number(),
    categoria: Joi.number(),
    genero: Joi.number(),
    numeroEvento: Joi.number(),
    carriles: Joi.number(),
    tipo: Joi.string().min(1),
  }
};
exports.save = {
  params: {
    idEvento: Joi.string().min(10).max(49)
  },
  payload: {
    nombre: Joi.string().min(3),
    lugar: Joi.string().min(3),
    fecha: Joi.number(),
    categoria: Joi.number(),
    genero: Joi.number(),
    numeroEvento: Joi.number(),
    carriles: Joi.number(),
    tipo: Joi.string().min(1),
  }
};
// Utilizado para el GET y DELETE
exports.atleta = {
  params: {
    idEvento: Joi.string().min(10).max(49)
  },
  query: {
    atleta: Joi.string().min(10).max(49).required()
  }
};

exports.idEvento = {
  params: {
    idEvento: Joi.string().min(10).max(49)
  },
  query: {
    sort: Joi.boolean(),
    eventos: Joi.array().items(Joi.string().min(10).max(49)),
  }
};
