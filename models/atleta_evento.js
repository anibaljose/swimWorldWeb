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
