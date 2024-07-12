import 'dotenv/config'
import Express, { json } from 'express'
import {Pizza } from './database/pizza-model.js'
import { Connection } from './database/connection.js';
import cors from 'cors'
import { Orders } from './database/orders-model.js';
import { User } from './database/user-model.js';
import bcrypt from 'bcryptjs'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY);
import { v4 as uuidv4 } from 'uuid';
import { Admin } from './database/admin-model.js';

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static('public'));

const port = 3000 || process.env.PORT;


//Database Connection

Connection._connection()

//Routes 

app.route('/pizzas')
   .get(async(req,res)=>{      
      try {
         const data = await Pizza.find();
         if(data)
           return res.status(200).json(data)  
         else
           return res.status(404).json("Data Not Found")
      } catch (error) {
           return res.status(400).json("Someting went Wrong")         
      }
 })

app.route('/pizza/:id')
   .get(async(req,res)=>{
      const id = req.params.id;
      try {
         //console.log(id);
         const response = await Pizza.findOne({_id:id});
         if(response){
            return res.status(200).json(response);
         }
      } catch (error) {
         return res.status(400).json(error);
      }
   })
   .put(async(req,res)=>{
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
      
   })
   .delete(async(req,res)=>{
      const id = req.params.id;
      console.log(id);
      try {
         const response = await Pizza.deleteOne({_id : id});
         if(response){
            return res.status(200).json(response);
         }
      } catch (error) {
         return res.status(400).json(error);
      }
   })



app.route('/pizzaList')
   .get(async(req,res)=>{
      try {
         const list = await Pizza.find();
         if(list){
            return res.status(200).json(list);
         }
      } catch (error) {
         return res.status(400).json('Something went wrong');
      }
   })
   .post(async(req,res)=>{
      try {
         const data = req.body;
        // console.log(data);
         const newPizza = new Pizza({
            name:data.name,
            size:data.size,
            price:data.price,
            img:data.img,
            veg:data.veg,
         })

         const response = await newPizza.save();
        // console.log(response);
         if(response){
            return res.status(200).json(response)
         }
      } catch (error) {
         return res.status(400).json('Something went Wrong');
      }
   })   

//order route later I need to change this part as there will be some alteration in the route as there will be authentication part   

app.route('/orders')
   .get(async(req,res)=>{
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
   })
   .post(async(req,res)=>{
        
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

   })   

app.route('/order/:id')
   .put(async(req,res)=>{
      const id = req.params.id;
      try {
         const response = await Orders.updateOne({_id:id},{$set:{isDelivered:true}});
         if(response){
            return res.status(200).json(response);
         }
      } catch (error) {
         return res.status(400).json(error);
      }

   })

app.route('/ordersList')
   .get(async(req,res)=>{
      try {
         const ordersList = await Orders.find();
         if(ordersList){
            return res.status(200).json(ordersList);
         }   
      } catch (error) {
         return res.status(400).json('Something went wrong')
      }
   })

app.route('/signup')
   .post(async(req,res)=>{
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
            }else{
               return res.status(404).json('Someting went wrong')
            }
         }else{
            return res.status(403).json('User Already exists');
         }
      } catch (error) {
         return res.status(400).send('Someting Went Wrong')
      }  
      
      
      

   })

app.route('/login')
   .post(async(req,res)=>{
      
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

   })

app.route('/payment')
   .post( async (req,res)=>{
      const token = req.body.token;
      const cart = JSON.parse(req.body.cart);
      const idempotencyKey = uuidv4();
      const customer = await stripe.customers.create({
         email : token.email,
         source:token.id
      })
      const response = await stripe.paymentIntents.create({
         amount:req.body.amount*100,
         currency:'inr',
         customer:customer.id,
         receipt_email:token.email,
         description:`Puchased : ${cart.length} pizzas`,
         shipping:{
            name:token.card.name,
            address:{
               city:token.card.address_city,
               country:token.card.address_country,
               line1:token.card.address_line1,
               postal_code:token.card.address_zip,
            }
         }
      },{idempotencyKey})
      //console.log(response);
      res.send(response)
   }) 

app.route('/addAdmin') 
   .post(async(req,res)=>{
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
   })

app.route('/adminLogin')
   .post(async(req,res)=>{
      
      try {
         const admin = req.body;
         const presentAdmin = await Admin.find({id:admin.id});  
   
         if(presentAdmin) {
            const matchPass = await bcrypt.compare(admin.password,presentAdmin[0].password)
            if(matchPass){
               return res.status(200).json(presentAdmin)
            }else{
               return res.status(401).json('Wrong Password')
            }
         }
      } catch (error) {
         return res.status(400).json('Something went wrong');
      }

   })   


app.route('/users')
   .get(async(req,res)=>{
      try {
         const userList = await User.find();
          
          if(userList){
            return res.status(200).json(userList)
          }
      } catch (error) {
         return res.status(400).json('Someting Went Wrong')
      } 
   })   

app.route('/:phone')
   .get(async(req,res)=>{
     const phone = parseInt(req.params.phone)
     console.log(phone);
     const user = await User.find({phone:phone})
     console.log(user);
     res.json(user)
   })   

app.listen(port,(req,res)=>{
    console.log(`App listening on Port : ${port}`);
})