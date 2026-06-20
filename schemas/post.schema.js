const Joi = require("joi");

const postSchema = Joi.object({
  description: Joi.string().trim().min(5).required(),

  userId: Joi.number().integer().positive().required(),
});

module.exports = postSchema;
