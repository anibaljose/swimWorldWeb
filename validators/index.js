var Joi = require('joi');
exports.login = {
  payload: {
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(5).required()
  }
};
