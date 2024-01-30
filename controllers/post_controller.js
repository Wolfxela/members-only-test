const User = require("../models/user_model")
const Post = require("../models/post_model")
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")


// exports.post_list = asyncHandler(async(req,res,next)=>{
//     res.send("POST list NOT AVAILABLE YET")

// })
exports.post_details = asyncHandler(async(req,res,next)=>{
    res.send("POST details NOT AVAILABLE YET")
    
})
exports.post_create_get = asyncHandler(async(req,res,next)=>{
    res.send("POST create get NOT AVAILABLE YET")
    
})
exports.post_create_post = asyncHandler(async(req,res,next)=>{
    res.send("POST create post NOT AVAILABLE YET")
    
})
exports.post_update_get = asyncHandler(async(req,res,next)=>{
    res.send("POST update get NOT AVAILABLE YET")
    
})
exports.post_update_post = asyncHandler(async(req,res,next)=>{
    res.send("POST update post NOT AVAILABLE YET")
    
})
exports.post_delete_get = asyncHandler(async(req,res,next)=>{
    res.send("POST delete get NOT AVAILABLE YET")
    
})
exports.post_delete_post = asyncHandler(async(req,res,next)=>{
    res.send("POST delete post NOT AVAILABLE YET")
    
})