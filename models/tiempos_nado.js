var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
  atleta: { type: Schema.Types.ObjectId, ref: 'Atleta'},
  tipo: { type: Schema.Types.ObjectId, ref: 'Tipo'},
  tiempo: {type: Number, required: true, unique:false},
  created: {type: Date, required: true, unique: false, default: Date.now},
  modified:  {type: Date, required: true, unique: false, default: Date.now}
};
