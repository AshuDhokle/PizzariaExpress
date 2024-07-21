import { Orders } from "../database/orders-model.js";
export const getOrders = async(req,res) =>{
    try {
        const orders = await Orders.find({userId:req.query.id});
        if(orders){
           return res.status(200).json(orders)
        }else{
           return res.status(404).json("No orders placed yet")
        }
     } catch (error) {
           return res.status(400).json('Something went wrong')
     }
}

export const placeOrder = async(req,res)=>{
    
    try {
        const obj = req.body
        const user = JSON.parse(obj.user);
        const cartItem = JSON.parse(obj.cart);
        let ordersArr = [];
        cartItem.forEach((item) => {
         const temp = {
            name:item.pizza.name,
            size:item.size,
            quantity:item.quantity,
            price:item.price
         }
         ordersArr.push(temp);
        });
        const shipping = {
         city:obj.response.data.shipping.address.city,
         street:obj.response.data.shipping.address.line1,
         country:obj.response.data.shipping.address.country
        }
        const newOrder = new Orders({
            name : user.name,
            email : user.email,
            userId : user._id,
            orderItems : ordersArr,
            shippingAddress: shipping,
            orderAmount:obj.amount,
            isDelivered:false,
            transactionId:obj.response.data.id,
        })
        const response = await newOrder.save() 
        
        if(response){
         return res.status(200).json(response)
        }else{
         return res.status(400).json('Something went wrong')
        }
     } catch (error) {
      console.log(error);
        return res.status(400).json('Someting went wrong')           
     }
}

export const getAllOrdersForAdmin = async(req,res) =>{
   try {
      const ordersList = await Orders.find();
      if(ordersList){
         return res.status(200).json(ordersList);
      }   
   } catch (error) {
      return res.status(400).json('Something went wrong')
   }
}

export const updateOrderById = async(req,res) =>{
   const id = req.params.id;
   try {
      const response = await Orders.updateOne({_id:id},{$set:{isDelivered:true}});
      if(response){
         return res.status(200).json(response);
      }
   } catch (error) {
      return res.status(400).json(error);
   }
}