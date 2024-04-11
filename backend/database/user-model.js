import Mongoose from "mongoose";

const user = new Mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    adderess:String,
    password:String,
   // adderess:String
})

const User = Mongoose.model('user',user);

export {User}