const router = require("express").Router()
const postController = require("../controllers/postController")

router.get("/posts", postController.getPosts)
router.get("/posts/:id", postController.getPostId)
router.post("/posts", postController.createPost)
router.post("/posts/:id/images", postController.addImage)
router.put("/posts/:id", postController.updatePost)
router.delete("/posts/:id", postController.deletePost)
router.delete("/posts/:id/images/:imageId", postController.deleteImagePost)



module.exports = router