var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
    nombre: {type: String, required: false, unique: false},
    lugar: {type: String, required: false, unique: false},
    fecha: {type: Number, required: true, unique:false},
    carriles: {type: Number, required: true, unique:false},
    tipo: { type: Schema.Types.ObjectId, ref: 'TipoEvento' },
    created: {type: Date, required: true, unique: false, default: Date.now},
    modified:  {type: Date, required: true, unique: false, default: Date.now}
};
