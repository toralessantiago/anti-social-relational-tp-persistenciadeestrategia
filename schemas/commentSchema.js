const Joi = require('joi');

const commentSchema = Joi.object({
    content: Joi.string().min(1).max(500).required().messages({
        'string.empty': 'El contenido no puede estar vacío',
        'string.max': 'El contenido no puede superar los 500 caracteres',
        'any.required': 'El contenido es obligatorio',
     }),
    userId: Joi.number().integer().positive().required().messages({ 
        'number.base': 'El userId debe ser un número',
        'any.required': 'El userId es obligatorio',
    }),
    postId: Joi.number().integer().positive().required().messages({
        'number.base': 'El postId debe ser un número',
        'any.required': 'El postId es obligatorio',
    }),
    createdAt: Joi.date().iso().optional()
});

module.exports = commentSchema;