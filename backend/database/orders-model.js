import Mongoose from "mongoose";

const orderItemSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const shippingAddressSchema = new Mongoose.Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    country: { type: String, required: true }
});

const orderSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    orderItems: [orderItemSchema],
    shippingAddress: {
        type:String, required:true
    },
    orderAmount: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
    transactionId: { type: String, required: true }
},{timestamps:true});

const Orders = Mongoose.model('Order', orderSchema);

export {Orders}
