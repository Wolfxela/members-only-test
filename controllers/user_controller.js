const User = require("../models/user_model")
const Post = require("../models/post_model")
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const {body,validationResult} = require("express-validator")
const bcrypt = require('bcrypt')

exports.user_membership_enter_get = (req,res,next)=>{
    res.render("secret")
}
exports.user_membership_enter_post = asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(req.body.passcode === "floof")
    {
        const newUser = new User({
            first_name: user.first_name,
            family_name: user.family_name,
            email: user.email,
            member: true,
            username: user.username,
            password: user.password,
            _id: user._id
        })

        await User.findByIdAndUpdate(req.params.id, newUser)
        res.redirect("/")

    }else{
        res.render("secret")
    }

})
exports.index = asyncHandler(async(req,res,next)=>{
    res.render("index",{title:"test"})
})
exports.user_details = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    res.render("user_views/user_details",{title:"User details",user: user})
    
})
exports.user_create_get = asyncHandler(async(req,res,next)=>{
    res.render("user_views/user_form",{title:"Sign up!"})
})
exports.user_create_post = [
    body("first_name","first name must contain at least 3 charracters")
    .trim()
    .isLength({min:3,max:100})
    .escape(),
    body("family_name","family name must contain at least 3 charracters")
    .trim()
    .isLength({min:3,max:100})
    .escape(),
    body("email","email must contain at least 3 charracters")
    .trim()
    .isLength({min:3,max:100})
    .escape(),
    body("password","password must contain at least 3 charracters")
    .trim()
    .isLength({min:3,max:100})
    .escape(),
    body("password_retype","password retyped wrong").custom((value,{req})=>{
        if(value !== req.body.password){
            console.log(value)
            console.log(req.body.password)
            throw new Error("Passwords do not match")
        }
        else{
            return true
        }
    }),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)

        bcrypt.hash(req.body.password,10,async(err,hashedpassword)=>{
            const user = new User({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                email: req.body.email,
                member: req.body.memberstatus,
                password: hashedpassword,
                username: `${req.body.first_name} ${req.body.family_name}`
            })

            if(!errors.isEmpty()){
                res.render("user_views/user_form",{title:"Sign up!", user:user,errors:errors.array()})
            }else{
                await user.save()
                res.redirect('/')
            }
        })



    
})]
exports.user_update_get = asyncHandler(async(req,res,next)=>{
    res.send("USER update get NOT AVAILABLE YET")
    
})
exports.user_update_post = asyncHandler(async(req,res,next)=>{
    res.send("USER update post NOT AVAILABLE YET")
    
})
exports.user_delete_get = asyncHandler(async(req,res,next)=>{
    const [user,userPosts] = await Promise.all([User.findById(req.params.id).exec(),Post.find({user:req.params.id},"title").exec()])
    if(user === null){
        res.redirect("/")
    }
    res.render("user_views/user_delete",{title:`Delete account "${user.username}"?`,user:user,posts:userPosts})
    
})
exports.user_delete_post = asyncHandler(async(req,res,next)=>{
    const [user,userPosts] = await Promise.all([User.findById(req.params.id),Post.find({user:req.params.id})])
    if(userPosts.length > 0){
        res.render("user_views/user_delete",{title:`Delete account "${user.username}"?`,user:user,posts:userPosts})
    }else{
        await User.findByIdAndDelete(req.body.userid)
        res.redirect('/')
    }
    
})