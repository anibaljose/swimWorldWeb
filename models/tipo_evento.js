var mongoose = require('mongoose');
module.exports = {
    nombre: {type: String, required: false, unique: false},
    created: {type: Date, required: true, unique: false, default: Date.now},
    modified:  {type: Date, required: true, unique: false, default: Date.now}
};
