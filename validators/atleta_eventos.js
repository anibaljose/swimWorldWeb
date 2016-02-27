var Joi = require('joi');
exports.create = {
  params: {
    idAtleta: Joi.string().min(10).max(49),
    idEvento: Joi.string().min(10).max(49)
  },
  payload: {
    carril: Joi.number().required(),
    hit: Joi.number().required(),
    tiempo: Joi.number().required(),
  }
};
exports.save = {
  params: {
    idAtletaEvento: Joi.string().min(10).max(49),
  },
  payload: {
    carril: Joi.number(),
    hit: Joi.number(),
    tiempo: Joi.number(),
  }
};
// Utilizado para el GET y DELETE
exports.idAtletaEvento = {
  params: {
    idAtletaEvento: Joi.string().min(10).max(49)
  }
};
