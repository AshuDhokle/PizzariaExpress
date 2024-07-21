import express from 'express'
import { createPaymentSession } from '../../controller/paymentController.js';

const router = express.Router();

router.post('/create-checkout-session',createPaymentSession);

export default router