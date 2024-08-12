import bcrypt from 'bcryptjs'
import {User} from "../database/user-model.js";
import { Admin } from '../database/admin-model.js';
export const Login = async(req,res) =>{
    try {
     const obj = req.body
     const existingUser = await User.findOne({phone:obj.phone})
     if(!existingUser){
        return res.status(404).json('User Not Found');
     }else{
        const checkPass = await bcrypt.compare(obj.password,existingUser.password)
        if(!checkPass){
          return res.status(401).send('wrong Password')
        }else{
          return res.status(200).json(existingUser);
        }
     }
  } catch (error) {
     return res.status(400).json('Someting Went wrong')
  }
}

export const Signup = async(req,res) =>{
    try {
        const obj = req.body
        
        const existingUser = await User.findOne({phone:obj.phone})
        if(!existingUser){
           const newUser = new User({
             name:obj.name,
             email:obj.email,
             phone:parseInt(obj.phone),
             adderess:obj.adderess,
             password: await bcrypt.hash(obj.password,8),            
           })
           const response = await newUser.save() 
           if(response){
            return res.status(200).json(response)
           }
        }else{
           return res.status(403).json('User Already exists');
        }
     } catch (error) {
        return res.status(400).send('Someting Went Wrong')
     }
}

export const adminLogin = async(req,res) =>{
   try {
      const admin = req.body;
      console.log(admin);
      
      const presentAdmin = await Admin.findOne({id:admin.id});  
      console.log(presentAdmin);
      
      if(presentAdmin) {
         if(admin.password === presentAdmin.password){
            return res.status(200).json(presentAdmin)
         }else{
            return res.status(401).json('Wrong Password')
         }
      }
   } catch (error) {
      return res.status(400).json('Something went wrong');
   }
}

export const adminSignup = async(req,res)=>{
   try {
      const admin = req.body;
      
      const hashedPass = await bcrypt.hash(admin.password,8);
      const newAdmin = new Admin({
         id:uuidv4(),
         name:admin.name,
         email:admin.email,
         phone:admin.phone,
         password:hashedPass
      })

      const response = await newAdmin.save();
      if(response){
         return res.status(200).json(response);
      }         
   } catch (error) {
      return res.status(400).json('Something went wrong')
   }
}
