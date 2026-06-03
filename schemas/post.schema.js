const Joi = require("joi")

const postSchema = Joi.object({

    description: Joi.string().trim().min(5).required(),

    userNickname: Joi.string().min(3).max(30).required()
})

module.exports = postSchema