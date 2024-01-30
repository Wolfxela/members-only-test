const User = require("../models/user_model")
const Post = require("../models/post_model")
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")


exports.index = asyncHandler(async(req,res,next)=>{
    res.render("index",{title:"test"})
})
exports.user_details = asyncHandler(async(req,res,next)=>{
    res.send("USER details NOT AVAILABLE YET")
    
})
exports.user_create_get = asyncHandler(async(req,res,next)=>{
    res.send("USER create get NOT AVAILABLE YET")
    
})
exports.user_create_post = asyncHandler(async(req,res,next)=>{
    res.send("USER create post NOT AVAILABLE YET")
    
})
exports.user_update_get = asyncHandler(async(req,res,next)=>{
    res.send("USER update get NOT AVAILABLE YET")
    
})
exports.user_update_post = asyncHandler(async(req,res,next)=>{
    res.send("USER update post NOT AVAILABLE YET")
    
})
exports.user_delete_get = asyncHandler(async(req,res,next)=>{
    res.send("USER delete get NOT AVAILABLE YET")
    
})
exports.user_delete_post = asyncHandler(async(req,res,next)=>{
    res.send("USER delete post NOT AVAILABLE YET")
    
})