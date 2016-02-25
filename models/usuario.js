var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    admin: {type: Boolean, required: false, unique: false, default: false},
    created: {type: Date, required: true, unique: false, default: Date.now},
    modified:  {type: Date, required: true, unique: false, default: Date.now}
};
