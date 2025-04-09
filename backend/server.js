import 'dotenv/config';
import Express from 'express';
import { Connection } from './database/connection.js';
import cors from 'cors';
import authRouter from './routes/user/authRouter.js';
import ordersRouter from './routes/user/ordersRoute.js';
import pizzaRouter from './routes/user/pizzaRouter.js';
import adminOrderRouter from './routes/admin/adminOrderRouter.js';
import adminAuthRouter from './routes/admin/adminAuthRouter.js';
import adminPizzaRouter from './routes/admin/adminPizzaRouter.js';
import adminUsersRouter from './routes/admin/adminUsersRouter.js';
import paymentRouter from './routes/payment/paymentRouter.js';
import updateUserRouter from './routes/user/updateUserRoutes.js';
import Stripe from 'stripe';
import { Orders } from './database/orders-model.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = Express();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/webhook', Express.raw({ type: 'application/json' }), async(request, response) => {
  const sig = request.headers['stripe-signature'].toString();
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  console.log(event.type);
  
  if (event.type === 'checkout.session.completed') {
    
    const checkoutSessionCompleted = event.data.object;
    console.log(checkoutSessionCompleted);
    
    const orderItems = JSON.parse(checkoutSessionCompleted.metadata.orderItems);
    let orderItemsArray = []
     
    orderItems.map((item)=>{
      orderItemsArray.push(
        {
          name:item.price_data.product_data.name,
          size:'small',
          quantity:item.quantity,
          price:item.price_data.unit_amount*item.quantity/100,
        }
      )
    }) 
    console.log(orderItemsArray);
    
    
    const newOrder = new Orders({
      name : checkoutSessionCompleted.customer_details.name,
      email : checkoutSessionCompleted.customer_details.email,
      userId: checkoutSessionCompleted.metadata.userId,
      orderItems:orderItemsArray,
      shippingAddress:checkoutSessionCompleted.metadata.address,
      orderAmount:checkoutSessionCompleted.amount_total,
      transactionId:checkoutSessionCompleted.id
    })
     
    await newOrder.save();
    
  }

  // Return a 200 response to acknowledge receipt of the event
  response.status(200).json({ message: 'ok' });
});
app.use(cors());
app.use(Express.json());
app.use(Express.static('public'));

const port = process.env.PORT || 3000;

// Database Connection
Connection._connection();

// Routes
app.use('/api/user/auth', authRouter);
app.use('/api/user/orders', ordersRouter);
app.use('/api/user/pizza', pizzaRouter);
app.use('/api/admin/order', adminOrderRouter);
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin/pizza', adminPizzaRouter);
app.use('/api/admin/users', adminUsersRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/user/update', updateUserRouter);


app.listen(port, () => {
  console.log(`App listening on Port: ${port}`);
});
