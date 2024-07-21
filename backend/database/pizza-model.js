import Mongoose from "mongoose";

const pizza = new Mongoose.Schema({
    name:String,
    size:[String],
    price:[Number],
    img:String,
    veg:Boolean,
    category:Number
})

const Pizza = Mongoose.model('Pizza',pizza)

export { Pizza }