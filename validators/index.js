var Joi = require('joi');
exports.login = {
  payload: {
    accountId: Joi.string().min(3).max(5).required(),
    password: Joi.string().min(5).required()
  }
};
