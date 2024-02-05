const User = require("../models/user_model")
const Post = require("../models/post_model")
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const {body,validationResult} = require("express-validator")

//TO BE ADDED LATER IN A MORE PROPPER VERSION WITH COMMENTS
// // exports.post_list = asyncHandler(async(req,res,next)=>{
// //     res.send("POST list NOT AVAILABLE YET")

// // })
// exports.post_details = asyncHandler(async(req,res,next)=>{
//     res.send("POST details NOT AVAILABLE YET")
    
// })
exports.post_create_get = asyncHandler(async(req,res,next)=>{
    res.render("post_views/post_form",{title:"Create a new post!"})
    
})
exports.post_create_post =[
    body("title","title must contain at least 3 letters")
    .trim()
    .isLength({min:3})
    .escape(),
    body("descriptional")
    .optional({values:"falsy"})
    .escape(),
    asyncHandler(async (req,res,next)=>{
        const errors = validationResult(req)
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id,
            postDate: Date.now()
        })
        if(!errors.isEmpty()){
            res.render("post_views/post_form",{title:"Create a new post!",errors:errors.array(),userID:req.body.userID})
        }else{
            await post.save()
            res.redirect("/")
        }
    })


]
exports.post_update_get = asyncHandler(async(req,res,next)=>{
    const post = await Post.findById(req.params.id)
    res.render("post_views/post_form",{title:`Update post ${post.title}`,post:post})
    
})
exports.post_update_post = [
    body("title","title must contain at least 3 letters")
    .trim()
    .isLength({min:3})
    .escape(),
    body("descriptional")
    .optional({values:"falsy"})
    .escape(),
    asyncHandler(async (req,res,next)=>{
        const errors = validationResult(req)
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id,
            postDate: req.body.date,
            _id: req.params.id
        })
        if(!errors.isEmpty()){
            res.render("post_views/post_form",{title:"Create a new post!",errors:errors.array(),post:post})
        }else{
            await Post.findByIdAndUpdate(req.params.id,post).exec()
            res.redirect("/")
        }
    })
    
]
exports.post_delete_get = asyncHandler(async(req,res,next)=>{
    const post = await Post.findById(req.params.id).exec()
    res.render("post_views/post_delete",{title: `Delete post ${post.title}`,post:post})
    
})
exports.post_delete_post = asyncHandler(async(req,res,next)=>{
    await Post.findByIdAndDelete(req.body.postID)
    res.redirect("/")
    
})