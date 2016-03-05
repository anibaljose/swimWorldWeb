var Joi = require('joi');
exports.create = {
  payload: {
    nombre: Joi.string().min(3).required(),
    apellido: Joi.string().min(3).required(),
    nacimiento: Joi.number(),
    genero: Joi.number().min(0).max(2),
    equipo: Joi.string().min(1).required(),
  }
};
exports.save = {
  params: {
    idAtleta: Joi.string().min(10).max(49)
  },
  payload: {
    nombre: Joi.string().min(3),
    apellido: Joi.string().min(3),
    email: Joi.string().email(),
    nacimiento: Joi.number(),
    genero: Joi.number().min(0).max(2),
    equipo: Joi.string().min(1),
  }
};
// Utilizado para el GET y DELETE
exports.idAtleta = {
  params: {
    idAtleta: Joi.string().min(10).max(49)
  },
  query: {
    edadmax: Joi.number().required(),
    edadmin: Joi.number().required(),
  }
};
