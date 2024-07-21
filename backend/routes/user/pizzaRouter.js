import express from 'express'
import { getPizzas } from '../../controller/pizzaController.js';

const router = express.Router();

router.get('/',getPizzas);

export default router