const Joi = require("joi")

const postSchema = Joi.object({

    descripcion: Joi.string().trim().min(5).required(),

    userId: Joi.string().min(3).max(30).required()
})

module.exports = postSchema