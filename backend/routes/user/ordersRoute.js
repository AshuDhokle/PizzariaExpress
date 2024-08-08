import express from 'express'
import { getOrders } from '../../controller/ordersController.js'

const router = express.Router()

router.get('/getOrders',getOrders)

export default router