var Joi = require('joi');
exports.create = {
  payload: {
    nombre: Joi.string().min(3).required(),
    lugar: Joi.string().min(3).required(),
    fecha: Joi.number(),
    carriles: Joi.number(),
    tipo: Joi.string().min(1),
  }
};
exports.save = {
  params: {
    idEvento: Joi.string().min(10).max(49)
  },
  payload: {
    nombre: Joi.string().min(3),
    lugar: Joi.string().min(3),
    fecha: Joi.number(),
    carriles: Joi.number(),
    tipo: Joi.string().min(1),
  }
};
// Utilizado para el GET y DELETE
exports.atleta = {
  params: {
    idEvento: Joi.string().min(10).max(49)
  },
  query: {
    atleta: Joi.string().min(10).max(49).required()
  }
};

exports.idEvento = {
  params: {
    idEvento: Joi.string().min(10).max(49)
  },
  query: {
    sort: Joi.boolean()
  }
};
