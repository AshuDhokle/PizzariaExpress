import { User } from "../database/user-model.js"

export const getAllUsers = async(req,res)=>{
    try {
      const users = await User.find();
      if(users){
        return res.status(200).json(users);
      }  
    } catch (error) {
        return res.status(404).json({error:error});
    }
}

export const addAddress = async(req,res)=>{
  try {
    const {id,type,address} = req.body;
    
    const updatedUser = await User.updateOne({_id:id},{$push:{addresses:{cat:type,address:address}}})
    console.log(updatedUser);
    if(updatedUser){
      res.status(200).json({updatedUser});
    }
  } catch (error) {
    res.status(500).json({error:error});
  }
}

export const getAllAddress = async(req,res)=>{
  try {
    const id = req.query.id
    console.log(id);
    
    const response = await User.findById(id).select('addresses');
    
    if(response){
      res.status(200).json(response.addresses);
    }

  } catch (error) {
    res.status(500).json({error:error});
  }
}