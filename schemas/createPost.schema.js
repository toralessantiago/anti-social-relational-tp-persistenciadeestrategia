const Joi = require("joi");

module.exports = Joi.object({
  descripcion: Joi.string().trim().min(1).required(),
  userId: Joi.alternatives()
    .try(
      Joi.number().integer().positive(),
      Joi.string().min(3).max(30),
    )
    .required(),
});
