import { Pizza } from '../database/pizza-model.js'

export const getPizzas = async(req,res) =>{
    try {
        const data = await Pizza.find();
        if(data)
          return res.status(200).json(data)  
        else
          return res.status(404).json("Data Not Found")
     } catch (error) {
          return res.status(500).json("Someting went Wrong")         
     }
}

export const getPizzaById = async(req,res) => {
     const id = req.params.id;
     try {
         const response = await Pizza.findOne({_id:id});
         if(response){
          return res.status(200).json(response);
         }
     } catch (error) {
         return res.status(400).json(error);
     }
}

export const updatePizzaById = async(req,res) => {
     const id = req.params.id;
     const newPizza = req.body
     try {
         const response = await Pizza.updateOne({_id:id},newPizza)
         if(response){
            //console.log(response);
           return res.status(200).json(response);
         }
     } catch (error) {
         return res.status(400).json(error);
     }
}

export const deletePizzaById = async(req,res)=>{
     const id = req.params.id;
      try {
         const response = await Pizza.deleteOne({_id : id});
         if(response){
            return res.status(200).json(response);
         }
      } catch (error) {
         return res.status(400).json(error);
      }
}

export const addPizzaAdmin = async(req,res)=>{
     try {
          const data = req.body;
          const newPizza = new Pizza({
             name:data.name,
             size:data.size,
             price:data.price,
             img:data.img,
             veg:data.veg,
          })
 
          const response = await newPizza.save();
          if(response){
             return res.status(200).json(response)
          }
       } catch (error) {
          return res.status(400).json('Something went Wrong');
       }
}