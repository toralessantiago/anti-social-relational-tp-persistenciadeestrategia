const Joi = require("joi")

module.exports = Joi.object({
    descripcion: Joi.string().required()
})