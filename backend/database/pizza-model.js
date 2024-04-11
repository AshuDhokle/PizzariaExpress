import Mongoose from "mongoose";

const pizza = new Mongoose.Schema({
    name:String,
    size:[String],
    price:[Number],
    img:String,
    veg:Boolean,
})

const Pizza = Mongoose.model('Pizza',pizza)

export { Pizza }