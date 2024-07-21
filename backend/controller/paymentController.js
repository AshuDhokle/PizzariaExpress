import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentSession = async (req, res) => {
  const { products,address,price } = req.body;
  const lineItems = products.map((product) => {
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    };

    const imageUrl = isValidUrl(product.pizza.img) ? product.pizza.img : 'images/drinks.png';

    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.pizza.name,
          images: [imageUrl],
        },
        unit_amount: parseInt(price / product.quantity) * 100,
      },
      quantity: product.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',

      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        shipping_address: address
      },
    });
    // console.log(session);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
};
