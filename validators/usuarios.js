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
    idUsurio: Joi.string().min(1).required()
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
