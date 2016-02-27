var Joi = require('joi');
exports.create = {
  payload: {
    nombre: Joi.string().min(3).required()
  }
};
exports.save = {
  params: {
    idEquipo: Joi.string().min(10).max(49)
  },
  payload: {
    nombre: Joi.string().min(3).required()
  }
};
// Utilizado para el GET y DELETE
exports.idEquipo = {
  params: {
    idEquipo: Joi.string().min(10).max(49)
  }
};
