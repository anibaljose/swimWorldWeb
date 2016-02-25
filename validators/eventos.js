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
exports.idEvento = {
  params: {
    idEvento: Joi.string().min(10).max(49)
  }
};
