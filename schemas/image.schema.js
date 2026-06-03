const Joi = require("joi")

module.exports = Joi.object({
    url: Joi.string().trim().required()
})