var Joi = require('joi');
exports.save = {
  payload: {
    atleta: Joi.string().min(10).max(49).required(),
    tipoEvento: Joi.string().min(10).max(49).required(),
    tiempo: Joi.number().required(),
  }
};
// Utilizado para el GET y DELETE
exports.idTiempoNado = {
  params: {
    idTiempoNado: Joi.string().min(10).max(49)
  }
};
