var Joi = require('joi');
exports.save = {
  payload: {
    atleta: Joi.string().min(10).max(49).required(),
    tipoEvento: Joi.string().min(10).max(49).required(),
    tiempo: Joi.number().required(),
  }
};
exports.listar = {
  query: {
    atleta: Joi.string().min(10).max(49),
    tipoEvento: Joi.string().min(10).max(49),
    max: Joi.number(),
    min: Joi.number()
  }
}
exports.delete = {
  payload: {
    atleta: Joi.string().min(10).max(49).required(),
    tipoEvento: Joi.string().min(10).max(49).required(),
  }
};
