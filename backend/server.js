import 'dotenv/config'
import Express from 'express'
import { Connection } from './database/connection.js';
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import authRouter from './routes/user/authRouter.js'
import ordersRouter from './routes/user/ordersRoute.js'
import pizzaRouter from './routes/user/pizzaRouter.js'
import adminOrderRouter from './routes/admin/adminOrderRouter.js'
import adminAuthRouter from './routes/admin/adminAuthRouter.js'
import adminPizzaRouter from './routes/admin/adminPizzaRouter.js'
import adminUsersRouter from './routes/admin/adminUsersRouter.js'
import paymentRouter from './routes/payment/paymentRouter.js'
import updateUserRouter from './routes/user/updateUserRoutes.js'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.static('public'));

const port = 3000 || process.env.PORT;

//Database Connection

Connection._connection()

//Routes 

app.use('/api/user/auth',authRouter);
app.use('/api/user/orders',ordersRouter)
app.use('/api/user/pizza',pizzaRouter)
app.use('/api/admin/order',adminOrderRouter);
app.use('/api/admin/auth',adminAuthRouter);
app.use('/api/admin/pizza',adminPizzaRouter);
app.use('/api/admin/users',adminUsersRouter);
app.use('/api/payment',paymentRouter);
app.use('/api/user/update',updateUserRouter);

const endpointSecret = "whsec_744727900012d356f75ad64fa8547aeca7208da19a73c8022a224d38f051fb94";

app.post('/webhook', Express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
   console.log(sig);
  let event;

  try {
    event = stripe.webhooks.constructEvent(JSON.stringify(request.body),sig, 'whsec_Hm9AcVymgav74TrOEnyrJ5xFgLTh4kcT');
    console.log(event);
   } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log(checkoutSessionAsyncPaymentSucceeded);
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



app.listen(port,()=>{
    console.log(`App listening on Port : ${port}`);
})