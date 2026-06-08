const { Router } = require("express");
const { obtenerComentarios, crearComentario, actualizarComentario, eliminarComentario } = require('../controllers/commentController');
const { validarComment, validarCommentId, validarUpdateComment } = require('../middlewares/validarComment');
const filtrarPorFecha = require('../middlewares/filtrarPorFecha')
const router = Router();

router.get("/", filtrarPorFecha, obtenerComentarios);
router.post("/", validarComment, crearComentario);
router.put("/:id", validarCommentId, validarUpdateComment, actualizarComentario);
router.delete("/:id", validarCommentId, eliminarComentario);

module.exports = router;