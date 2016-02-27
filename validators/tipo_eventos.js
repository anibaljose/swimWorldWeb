var Joi = require('joi');
exports.create = {
  payload: {
    nombre: Joi.string().min(3).required()
  }
};
exports.save = {
  params: {
    idTipo: Joi.string().min(10).max(49)
  },
  payload: {
    nombre: Joi.string().min(3).required()
  }
};
// Utilizado para el GET y DELETE
exports.idTipo = {
  params: {
    idTipo: Joi.string().min(10).max(49)
  }
};
