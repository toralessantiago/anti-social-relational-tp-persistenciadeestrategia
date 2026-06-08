const tagSchema = require("../schemas/tagSchema");
const { Tag } = require("../models");

const validarTag = (req, res, next) => {
  const { error } = tagSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const validarTagId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "El id del tag debe ser numérico" });
    }

    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ message: "Tag no encontrado" });
    }

    req.tag = tag;

    next();
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tag" });
  }
};

const verificarTagDuplicado = async (req, res, next) => {
  try {
    const { name } = req.body;

    const tagExistente = await Tag.findOne({ where: { name } });

    if (tagExistente) {
      return res.status(400).json({ message: "El tag ya existe" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el tag" });
  }
};

const validarTagIdEnPost = async (req, res, next) => {
  try {
    const { tagId } = req.params;

    if (isNaN(tagId)) {
      return res
        .status(400)
        .json({ message: "El id del tag debe ser numérico" });
    }

    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ message: "Tag no encontrado" });
    }

    req.tag = tag;

    next();
  } catch (error) {
    res.status(500).json({ error: "Error al validar el tag" });
  }
};

module.exports = {
  validarTag,
  validarTagId,
  verificarTagDuplicado,
  validarTagIdEnPost,
};
