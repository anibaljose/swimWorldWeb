var Joi = require('joi');
exports.create = {
  payload: {

  }
};
exports.save = {
  payload: {

  }
};
// Utilizado para el GET y DELETE
exports.idTipo = {
  params: {
    idTipo: Joi.string().min(10).max(49)
  }
};
