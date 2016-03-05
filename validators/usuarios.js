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
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(5).required(),
    admin: Joi.boolean(),
  }
};
exports.save = {
  params: {
    idUsuario: Joi.string().min(1).required()
  },
  payload: {
    username: Joi.string().min(3).max(20),
    password: Joi.string().min(5),
    admin: Joi.boolean(),
  }
};
// Utilizado para el GET y DELETE
exports.idUsuario = {
  params: {
    idUsurio: Joi.string().min(1).required()
  }
};
