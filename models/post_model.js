const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title:{type: String, required:true, maxLength:100},
    User:{type:Schema.Types.ObjectId,ref:"User",required:true},
    description:{type:String},
    postDate:{type:Date,required:true}
})

PostSchema.virtual("url").get(function(){
    return `/social/user/${this._id}`
})

module.exports = mongoose.model("Post",PostSchema)
