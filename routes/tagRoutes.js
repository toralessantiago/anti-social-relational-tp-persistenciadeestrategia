const { Router } = require("express");
const tagController = require("../controllers/tagController");

const validarTag = require("../middlewares/validarTag");
const validarTagId = require("../middlewares/validarTagId");
const verificarTagDuplicado = require("../middlewares/verificarTagDuplicado");

const router = Router();

router.get("/", tagController.obtenerTags);

router.get("/:id", validarTagId, tagController.obtenerTag);

router.post("/", validarTag, verificarTagDuplicado, tagController.crearTag);

router.put(
  "/:id",
  validarTagId,
  validarTag,
  verificarTagDuplicado,
  tagController.actualizarTag,
);

router.delete("/:id", validarTagId, tagController.eliminarTag);

module.exports = router;
