const mongoose=require('mongoose');

const data=mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    email:{type:String},

})

const userModel=mongoose.model("data",data)
module.exports=userModel;