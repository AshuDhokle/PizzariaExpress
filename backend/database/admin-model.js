import Mongoose from "mongoose";
const admin = new Mongoose.Schema({
    id:String,
    name:String,
    email:String,
    phone:Number,
    password:String,
})

const Admin = Mongoose.model('admin',admin);

export {Admin}