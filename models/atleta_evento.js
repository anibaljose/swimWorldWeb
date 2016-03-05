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
var Schema = mongoose.Schema;
module.exports = {
  carril: {type: Number, required: true, unique:false},
  hit: {type: Number, required: true, unique:false},
  tiempo: {type: Number, required: true, unique:false},
  atleta: { type: Schema.Types.ObjectId, ref: 'Atleta'},
  evento: { type: Schema.Types.ObjectId, ref: 'Evento'},
  created: {type: Date, required: true, unique: false, default: Date.now},
  modified:  {type: Date, required: true, unique: false, default: Date.now}
};
