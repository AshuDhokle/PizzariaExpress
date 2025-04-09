import Mongoose from "mongoose";

const addressSchema = new Mongoose.Schema({
    cat:{type:String,required:true},
    address:{type:String,required:true}
});

const user = new Mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true, unique: true },
    phone:{type:Number,required:true, unique:true},
    addresses:{type:[addressSchema]},
    password:{type:String,required:true},
})



const User = Mongoose.model('user',user);

export {User}