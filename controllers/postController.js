const {Post, Post_Image, User} = require("../models")

//GET Posts
const getPosts = async (req,res) => {

try {
    const posts = await Post.findAll({
        include:["postImages"]
    })

    res.json(posts)

} catch(error){

    res.status(500).json({
        error:error.message
    })

}
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

//GET Post Images
const getPostImages = async (req,res) => {

    const images = await Post_Image.findAll({
        where:{
            postId:req.params.id
        }
    })

    res.json(images)
}

//POST(el nickname toma un numero no un nombre)
// A corregir con mis compañeros(no tocar)
const createPost = async (req, res) => {

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

    const image = await Post_Image.create({
        url: req.body.url,
        postId: req.post.id
    })

    res.status(201).json(image)

}

//PUT
const updatePost = async (req, res) =>{
    
    await req.post.update({
        description:req.body.description
    })

    res.json(req.post)

}

//DELETE
const deletePost = async (req,res) =>{
    
    await req.post.destroy()

    res.json({
        message:"Post eliminado"
})
}

//DELETE Image Post
const deleteImagePost = async (req,res) => {

     await req.image.destroy()

        res.json({
            message:"Imagen del post eliminada"
    })
}

module.exports = {
    getPosts,
    getPostId,
    createPost,
    addImage,
    updatePost,
    deletePost,
    deleteImagePost,
    getPostImages
}