<<<<<<< HEAD
var Joi = require('joi');
exports.login = {
  payload: {
    accountId: Joi.string().min(3).max(5).required(),
    password: Joi.string().min(5).required()
  }
};
=======
var Joi = require('joi');
exports.login = {
  payload: {
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(5).required()
  }
};
>>>>>>> 5dc6f7d3021d3b32b1fada5c21968e1bab2b5111
