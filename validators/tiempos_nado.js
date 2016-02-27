var Joi = require('joi');
exports.create = {
  params: {
    idAtleta: Joi.string().min(10).max(49),
    idTipoEvento: Joi.string().min(10).max(49)
  },
  payload: {
    tiempo: Joi.number().required(),
  }
};
exports.save = {
  params: {
    idTiempoNado: Joi.string().min(10).max(49),
  },
  payload: {
    tiempo: Joi.number().required(),
  }
};
// Utilizado para el GET y DELETE
exports.idTiempoNado = {
  params: {
    idTiempoNado: Joi.string().min(10).max(49)
  }
};
