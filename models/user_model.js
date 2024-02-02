const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name:{type: String, required:true, maxLength:100},
    family_name:{type: String, required:true, maxLength:100},
    email:{type:String,required:true},
    member:{type:Boolean,required:true},
    password:{type:String,required:true},
    username:{type:String,}
})

UserSchema.virtual("url").get(function(){
    return `/social/user/${this._id}`
})
module.exports = mongoose.model("User",UserSchema)
