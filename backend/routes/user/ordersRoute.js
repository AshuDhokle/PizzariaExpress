import express from 'express'
import { getOrders, placeOrder } from '../../controller/ordersController.js'

const router = express.Router()

router.get('/getOrders',getOrders)
router.post('/placeOrder',placeOrder)

export default router