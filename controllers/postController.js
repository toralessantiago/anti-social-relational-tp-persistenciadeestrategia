const {Post, Post_Image, User} = require("../models")

//GET Posts
const getPosts = async (req,res) => {

    const posts = await Post.findAll()

    res.json(posts)
}

//GET Post(ID)
const getPostId = async(req, res) => {

    const id = Number(req.params.id)

    const post = await Post.findByPk(id,{
        include:["postImages"]
    })

    if(!post){
        return res.status(404).json({
            error:"Post no encontrado"
        })
    }

    res.json(post)
}

//POST(el nickname toma un numero no un nombre)
const createPost = async (req, res) => {

    console.log(req.body)

    const user = await User.findOne({
  where: {
    nickName: req.body.userNickname
  }
})

console.log(user)

    try {

    const nuevoPost = await Post.create({
        description: req.body.description,
        userNickname: req.body.userNickname
    })

    res.status(201).json(nuevoPost)

} catch(error) {

    console.log(error)

    res.status(500).json({
        error: error.message
    })
}
}

//addImage
const addImage = async(req, res) => {

    const postId = Number(req.params.id)

    const post = await Post.findByPk(postId)


    if(!post){
      return res.status(404).json({
         error:'Post no encontrado'
      })
   }

    const image = await Post_Image.create({
        url: req.body.url,
        postId: postId
    })

    res.status(201).json(image)

}

//PUT
const updatePost = async (req, res) =>{
    
    const id = Number(req.params.id)

    const post = await Post.findByPk(id)

    if(!post){
      return res.status(404).json({
         error:'Post no encontrado'
      })
   }

   await post.update({
   description:req.body.description
})

   res.json(post)

}

//DELETE
const deletePost = async (req,res) =>{
    
    const id = Number(req.params.id)

    await Post.destroy({
        where:{
            id:id
        }
    })
    res.json({
        message:"Post eliminado"
    })
}

//DELETE Image Post
const deleteImagePost = async (req,res) => {
    
    const idImagePost = Number(req.params.imageId)

    await Post_Image.destroy({
        where:{
            id: idImagePost
        }
    })

    res.json({
      message:'Imagen del post eliminada'
   })
}

module.exports = {
    getPosts,
    getPostId,
    createPost,
    addImage,
    updatePost,
    deletePost,
    deleteImagePost
}