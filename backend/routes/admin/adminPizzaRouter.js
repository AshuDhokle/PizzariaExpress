import express from 'express'
import { addPizzaAdmin, deletePizzaById, getPizzaById, getPizzas, updatePizzaById } from '../../controller/pizzaController.js';

const router = express.Router();

router.get('/',getPizzas)
router.get('/:id',getPizzaById);
router.put('/:id',updatePizzaById)
router.delete('/:id',deletePizzaById);
router.post('/addPizza',addPizzaAdmin);
export default router