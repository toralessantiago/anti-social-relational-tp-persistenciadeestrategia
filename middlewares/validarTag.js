const tagSchema = require("../schemas/tagSchema");

const validarTag = (req, res, next) => {
  const { error } = tagSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = validarTag;
