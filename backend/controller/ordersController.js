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
         return res.status(500).json('Something went wrong')
     }
}

export const getAllOrdersForAdmin = async(req,res) =>{
   try {
      const ordersList = await Orders.find();
      if(ordersList){
         return res.status(200).json(ordersList);
      }   
   } catch (error) {
      return res.status(500).json('Something went wrong')
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
      return res.status(500).json(error);
   }
}