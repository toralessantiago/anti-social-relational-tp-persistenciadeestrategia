const router = require("express").Router();
const postController = require("../controllers/postController");
const postMiddlewares = require("../middlewares/post.middleware");
const tagMiddlewares = require("../middlewares/tag.middleware");

router.get("/", postController.getPosts);
router.get(
  "/:id",
  postMiddlewares.validatePostExists,
  postController.getPostId,
);
router.get(
  "/:id/images",
  postMiddlewares.validatePostExists,
  postController.getPostImages,
);
router.post("/", postMiddlewares.validateCreatePost, postController.createPost);
router.post(
  "/:id/images",
  postMiddlewares.validatePostExists,
  postMiddlewares.validateImage,
  postController.addImage,
);
router.put(
  "/:id",
  postMiddlewares.validatePostExists,
  postMiddlewares.validateUpdatePost,
  postController.updatePost,
);
router.delete(
  "/:id",
  postMiddlewares.validatePostExists,
  postController.deletePost,
);
router.delete(
  "/:id/images/:imageId",
  postMiddlewares.validatePostExists,
  postMiddlewares.validateImageExists,
  postController.deleteImagePost,
);

// --- POST TAG ---

router.post(
  "/:id/tags",
  postMiddlewares.validatePostExists,
  postController.assignTags,
);
router.post(
  "/:id/tags/:tagId",
  postMiddlewares.validatePostExists,
  tagMiddlewares.validarTagIdEnPost,
  postController.associateTag,
);
router.delete(
  "/:id/tags/:tagId",
  postMiddlewares.validatePostExists,
  tagMiddlewares.validarTagIdEnPost,
  postController.dissociateTag,
);

module.exports = router;
