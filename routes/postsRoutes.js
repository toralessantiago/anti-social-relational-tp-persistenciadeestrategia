const router = require("express").Router()
const postController = require("../controllers/postController")
const postMiddlewares = require("../middlewares/post.middleware")

router.get("/posts", postController.getPosts)
router.get("/posts/:id", postMiddlewares.validatePostExists, postController.getPostId)
router.get("/posts/:id/images", postMiddlewares.validatePostExists, postController.getPostImages)
router.post("/posts", postMiddlewares.validateCreatePost, postController.createPost)
router.post("/posts/:id/images", postMiddlewares.validatePostExists, postMiddlewares.validateImage, postController.addImage)
router.put("/posts/:id",postMiddlewares.validatePostExists, postMiddlewares.validateUpdatePost, postController.updatePost)
router.delete("/posts/:id", postMiddlewares.validatePostExists, postController.deletePost)
router.delete("/posts/:id/images/:imageId", postMiddlewares.validateImageExists, postController.deleteImagePost)



module.exports = router