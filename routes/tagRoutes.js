const { Router } = require("express");
const tagController = require("../controllers/tagController");

const tagMiddlewares = require("../middlewares/tag.middleware");

const router = Router();

router.get("/", tagController.obtenerTags);

router.get("/:id", tagMiddlewares.validarTagId, tagController.obtenerTag);

router.post(
  "/",
  tagMiddlewares.validarTag,
  tagMiddlewares.verificarTagDuplicado,
  tagController.crearTag,
);

router.put(
  "/:id",
  tagMiddlewares.validarTagId,
  tagMiddlewares.validarTag,
  tagMiddlewares.verificarTagDuplicado,
  tagController.actualizarTag,
);

router.delete("/:id", tagMiddlewares.validarTagId, tagController.eliminarTag);

module.exports = router;
