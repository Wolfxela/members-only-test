const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name:{type: String, required:true, maxLength:100},
    family_name:{type: String, required:true, maxLength:100},
    email:{type:String,required:true},
    member:{type:Boolean,required:true},
    password:{type:String,required:true},
})

UserSchema.virtual("url").get(function(){
    return `/social/user/${this._id}`
})
UserSchema.virtual("username").get(function(){
    return `${this.first_name} ${this.family_name}`
})

module.exports = mongoose.model("User",UserSchema)
