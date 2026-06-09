const { Comment, User, Post } = require('../models')
const commentSchema = require('../schemas/comment.schema')

const validarComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

const validarCommentId = async (req, res, next) => {
    try {
        const { id } = req.params
        const comentario = await Comment.findByPk(id)
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' })
        }
        req.comentario = comentario
        next()
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el comentario' })
    }
}

module.exports = {
    validarComment,
    validarCommentId
}